'use strict';

import * as Lint from 'tslint';
import * as ts from 'typescript';

const RULE_NAME = 'sort-imports';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: 'enforce sorting import declarations within module',
    descriptionDetails: Lint.Utils.dedent`
            Enforce a consistent ordering for ES6-style imports:
            By default, the order is
            [none, all, multiple, single, alias]

            e.g.
            import 'module-without-export';
            import * as foo from 'foo';
            import * as bar from 'bar';
            import {alpha, beta} from 'alpha';
            import {delta, gamma} from 'delta';
            import {a} from 'baz';
            import {b} from 'qux';
            import c = foo.bar.baz;
            `,
    optionsDescription: Lint.Utils.dedent`
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
        "${RULE_NAME}": [true, { 'ignore-case' }]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, { 'ignore-member-sort' }]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, { 'member-syntax-sort-order': ['all', 'single', 'multiple', 'none', 'alias'] }]
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

interface ImportMetadata {
  memberSyntaxType: MemberSyntaxType;
  sortValue: string;
}

class RuleWalker extends Lint.RuleWalker {
  private ignoreCase: boolean;
  private ignoreMemberSort: boolean;
  private expectedOrder: MemberSyntaxType[];

  private currentImportIndex = 0;
  private currentSortValue: string;
  private caseConverter: (s: string) => string;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);

    const optionSet = this.getOptions()[0] || {};

    // this.ignoreCase = optionSet['ignore-case'];
    this.ignoreCase = this.hasOption('ignore-case');
    this.ignoreMemberSort = this.hasOption('ignore-member-sort');
    this.expectedOrder = this._processMemberSyntaxSortOrder(optionSet['member-syntax-sort-order']);

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
        'Member imports should be sorted.');
    }
  }

  private _validateOrder(node: ts.ImportDeclaration | ts.ImportEqualsDeclaration) {
    const importData = this._determineImportType(node);

    // See if the import type is still available
    const index = this.expectedOrder.indexOf(importData.memberSyntaxType, this.currentImportIndex);
    if (index !== -1) {
      if (this.expectedOrder[this.currentImportIndex] !== importData.memberSyntaxType) {
        this.currentImportIndex = index;
        this.currentSortValue = this.caseConverter(importData.sortValue);
      } else if (this.currentSortValue > this.caseConverter(importData.sortValue)) {
        this.addFailureAtNode(
          node,
          `All imports of the same type must be sorted alphabetically. "${importData.sortValue}" must come before "${this.currentSortValue}"`);
      } else {
        this.currentSortValue = this.caseConverter(importData.sortValue);
      }
    } else {
      const currentSyntaxType = MemberSyntaxType[MemberSyntaxType[importData.memberSyntaxType]];
      const previousSyntaxType = MemberSyntaxType[MemberSyntaxType[this.expectedOrder[this.currentImportIndex]]];
      this.addFailureAtNode(
        node,
        `All imports of type ${currentSyntaxType} must occur before all imports of type ${previousSyntaxType}`);
    }
  }

  private _determineImportType(node: ts.ImportDeclaration | ts.ImportEqualsDeclaration): ImportMetadata {
    const nodeText = node.getFullText();

    if (node.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
      const aliasMatch = /\bimport\s+(\w+)\s*=.+/g.exec(nodeText);
      return {
        memberSyntaxType: MemberSyntaxType.Alias,
        sortValue: aliasMatch[1]
      };
    } else {
      const singleMatch = /\bimport\s+({?([^,{}\*]+?)}?)\s*from\s+[\'"](?:[^"\']+)["\']/g.exec(nodeText);
      const multipleMatch = /\bimport\s*{?\s*([^{}\'",]+?)\s*,(?:\s*.+\s*,\s*)*\s*.+\s*}?\s*from\s+[\'"](?:[^"\']+)["\']/g.exec(nodeText);
      const noneMatch = /\bimport\s+[\'"]([^"\']+)["\']/g.exec(nodeText);
      const allMatch = /\bimport\s+\*\s+as\s+(.+)\s+from\s+[\'"](?:[^"\']+)["\']/g.exec(nodeText);

      if (singleMatch !== null) {
        return {
          memberSyntaxType: MemberSyntaxType.Single,
          sortValue: singleMatch[1]
        };
      } else if (multipleMatch !== null) {
        return {
          memberSyntaxType: MemberSyntaxType.Multiple,
          sortValue: multipleMatch[1]
        };
      } else if (noneMatch !== null) {
        return {
          memberSyntaxType: MemberSyntaxType.None,
          sortValue: noneMatch[1]
        };
      } else if (allMatch !== null) {
        return {
          memberSyntaxType: MemberSyntaxType.All,
          sortValue: allMatch[1]
        };
      }
      else {
        this.addFailureAtNode(node, 'Could not determine import type');
      }
    }
  }

  private _processMemberSyntaxSortOrder(sortOption: string[]): MemberSyntaxType[] {
    const defaultOrder = [MemberSyntaxType.None, MemberSyntaxType.All, MemberSyntaxType.Multiple, MemberSyntaxType.Single, MemberSyntaxType.Alias];
    if (Array.isArray(sortOption) && typeof sortOption[0] === 'string' && sortOption.length === 5) {
      const order: MemberSyntaxType[] = [];
      const usedOptions = {};
      sortOption.forEach(function (t) {
        if (usedOptions[t] !== undefined) {
          // Warning: we have seen this one already - skip
        } else {
          usedOptions[t] = t;
          switch (t) {
            case 'none':
              order.push(MemberSyntaxType.None);
              break;
            case 'all':
              order.push(MemberSyntaxType.All);
              break;
            case 'multiple':
              order.push(MemberSyntaxType.Multiple);
              break;
            case 'single':
              order.push(MemberSyntaxType.Single);
              break;
            case 'alias':
              order.push(MemberSyntaxType.Alias);
              break;
          }
        }
      });
      return order;
    } else {
      return defaultOrder;
    }
  }
}

enum MemberSyntaxType {
  None,
  All,
  Multiple,
  Single,
  Alias
}
