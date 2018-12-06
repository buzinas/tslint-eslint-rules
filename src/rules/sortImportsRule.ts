import * as Lint from 'tslint';
import * as ts from 'typescript';

const RULE_NAME = 'sort-imports';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: 'enforce sorting import declarations within module',
    rationale: Lint.Utils.dedent`
      When declaring multiple imports, a sorted list of import declarations make it easier for developers to
      read the code and find necessary imports later. This rule is purely a matter of style.

      This rule checks all import declarations and verifies that all imports are first sorted by the used member
      syntax and then alphabetically by the first member or alias name.
      `,
    optionsDescription: Lint.Utils.dedent`
      - \`"ignore-case"\` does case-insensitive comparisons (default: \`false\`)
      - \`"ignore-member-sort"\` allows members in multiple type imports to occur in any order (default: \`false\`)
      - \`"member-syntax-sort-order"\` (default: \`["none", "all", "multiple", "single", "alias"]\`); all 5 items must be
      present in the array, but you can change the order:
        - \`none\` = import module without exported bindings.
        - \`all\` = import all members provided by exported bindings.
        - \`multiple\` = import multiple members.
        - \`single\` = import a single member.
        - \`alias\` = creates an alias for a member. This is unique to TER and not in ESLint's \`sort-imports\`.
      `,
    options: {
      type: 'object',
      properties: {
        'member-syntax-sort-order': {
          type: 'array',
          items: {
            type: 'string',
            enum: ['none', 'all', 'multiple', 'single', 'alias']
          },
          minLength: 5,
          maxLength: 5
        },
        'ignore-case': {
          type: 'boolean'
        },
        'ignore-member-sort': {
          type: 'boolean'
        }
      }
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, { "ignore-case" }]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, { "ignore-member-sort" }]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, { "member-syntax-sort-order": ["all", "single", "multiple", "none", "alias"] }]
        `
    ],
    typescriptOnly: false,
    type: 'style'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new RuleWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

enum MemberSyntaxType {
  None,
  All,
  Multiple,
  Single,
  Alias
}

interface ImportMetadata {
  memberSyntaxType: MemberSyntaxType;
  sortValue: string;
}

class RuleWalker extends Lint.RuleWalker {
  private ignoreCase: boolean;
  private ignoreMemberSort: boolean;
  private expectedOrder: MemberSyntaxType[];

  private currentImportIndex = 0;
  private currentSortValue: { sortValue: string, originalValue: string };
  private caseConverter: (s: string) => string;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);

    const optionSet = this.getOptions()[0] || {};

    this.ignoreCase = this.hasOption('ignore-case');
    this.ignoreMemberSort = this.hasOption('ignore-member-sort');
    this.expectedOrder = RuleWalker._processMemberSyntaxSortOrder(optionSet['member-syntax-sort-order']);
    this.currentSortValue = { sortValue: '', originalValue: '' };

    if (this.ignoreCase) {
      this.caseConverter = s => s.toUpperCase();
    } else {
      this.caseConverter = s => s;
    }
  }

  public visitNode(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.ImportDeclaration ||
      node.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
      this._validateOrder(<ts.ImportDeclaration | ts.ImportEqualsDeclaration>node);
    }
    super.visitNode(node);
  }

  public visitNamedImports(node: ts.NamedImports) {
    if (!this.ignoreMemberSort) {
      this._validateMemberSort(node);
    }
    super.visitNamedImports(node);
  }

  private _validateMemberSort(node: ts.NamedImports) {
    // Cheesing array compare
    const imports: string[] = node.elements.map(e => this.caseConverter(e.getText()));
    const importReduction = imports.reduce((prev, current) => prev + current);
    const sortedImports = imports.sort();
    const sortedReduction = sortedImports.reduce((prev, current) => prev + current);

    if (importReduction !== sortedReduction) {
      this.addFailureAtNode(
        node,
        'Member imports must be sorted alphabetically.');
    }
  }

  private _validateOrder(node: ts.ImportDeclaration | ts.ImportEqualsDeclaration) {
    const importData = this._determineImportType(node);
    if (importData) {
      const importName = importData.sortValue.trim();
      // See if the import type is still available
      const index = this.expectedOrder.indexOf(importData.memberSyntaxType, this.currentImportIndex);
      if (index !== -1) {
        if (this.expectedOrder[this.currentImportIndex] !== importData.memberSyntaxType) {
          this.currentImportIndex = index;
          this.currentSortValue = {
            sortValue: this.caseConverter(importName),
            originalValue: importName
          };
        } else if (this.currentSortValue.sortValue > this.caseConverter(importName)) {
          this.addFailureAtNode(
            node,
            `All imports of the same type must be sorted alphabetically. "${importName}" must come before "${this.currentSortValue.originalValue}"`);
        } else {
          this.currentSortValue = {
            sortValue: this.caseConverter(importName),
            originalValue: importName
          };
        }
      } else {
        const currentSyntaxType = MemberSyntaxType[importData.memberSyntaxType];
        const previousSyntaxType = MemberSyntaxType[this.expectedOrder[this.currentImportIndex]];
        this.addFailureAtNode(
          node,
          `All imports of type "${currentSyntaxType}" must occur before all imports of type "${previousSyntaxType}"`);
      }
    } else {
      this.addFailureAtNode(node, 'Could not determine import type');
    }
  }

  private _determineImportType(node: ts.ImportDeclaration | ts.ImportEqualsDeclaration): ImportMetadata {
    const nodeText = node.getFullText();

    if (node.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
      const aliasMatch = /\bimport\s+(\w+)\s*=.+/g.exec(nodeText)!;
      return {
        memberSyntaxType: MemberSyntaxType.Alias,
        sortValue: aliasMatch[1]
      };
    } else {
      const singleMatch = /\bimport\s+(?:{?([^,{}\*]+?)}?)\s*from\s+[\'"](?:[^"\']+)["\']/g.exec(nodeText);
      const multipleMatch = /\bimport\s*{?\s*([^{}\'",]+?)\s*,(?:\s*.+\s*,\s*)*\s*.+\s*}?\s*from\s+[\'"](?:[^"\']+)["\']/g.exec(nodeText);
      const noneMatch = /\bimport\s+[\'"]([^"\']+)["\']/g.exec(nodeText);
      const allMatch = /\bimport\s+\*\s+as\s+(.+)\s+from\s+[\'"](?:[^"\']+)["\']/g.exec(nodeText);

      let result;
      if (singleMatch !== null) {
        result = {
          memberSyntaxType: MemberSyntaxType.Single,
          sortValue: singleMatch[1]
        };
      } else if (multipleMatch !== null) {
        result = {
          memberSyntaxType: MemberSyntaxType.Multiple,
          sortValue: multipleMatch[1]
        };
      } else if (noneMatch !== null) {
        result = {
          memberSyntaxType: MemberSyntaxType.None,
          sortValue: noneMatch[1]
        };
      } else if (allMatch !== null) {
        result = {
          memberSyntaxType: MemberSyntaxType.All,
          sortValue: allMatch[1]
        };
      } else {
        // TODO: Made up value, are we guaranteed to always hit one of the if statements?
        result = {
          memberSyntaxType: MemberSyntaxType.None,
          sortValue: ''
        };
      }

      return result;
    }
  }

  private static _processMemberSyntaxSortOrder(sortOption: string[]): MemberSyntaxType[] {
    const defaultOrder = [MemberSyntaxType.None, MemberSyntaxType.All, MemberSyntaxType.Multiple, MemberSyntaxType.Single, MemberSyntaxType.Alias];
    if (Array.isArray(sortOption) && typeof sortOption[0] === 'string' && sortOption.length === 5) {
      const memberSyntaxTypeMap = {
        none: MemberSyntaxType.None,
        all: MemberSyntaxType.All,
        multiple: MemberSyntaxType.Multiple,
        single: MemberSyntaxType.Single,
        alias: MemberSyntaxType.Alias
      };

      const order: MemberSyntaxType[] = [];
      const usedOptions = {};
      sortOption.forEach((t) => {
        if (usedOptions[t] !== undefined) {
          // Warning: we have seen this one already - skip
        } else {
          usedOptions[t] = t;
          if (memberSyntaxTypeMap[t] !== undefined) {
            order.push(memberSyntaxTypeMap[t]);
          }
        }
      });
      return order;
    } else {
      return defaultOrder;
    }
  }
}
