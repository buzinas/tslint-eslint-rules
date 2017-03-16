import * as ts from 'typescript';
import * as Lint from 'tslint';
import * as doctrine from 'doctrine';

const RULE_NAME = 'valid-jsdoc';
let OPTIONS: any;

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = {
    missingBrace: 'JSDoc type missing brace',
    syntaxError: 'JSDoc syntax error',
    missingParameterType: (name: string) => `missing JSDoc parameter type for '${name}'`,
    missingParameterDescription: (name: string) => `missing JSDoc parameter description for '${name}'`,
    duplicateParameter: (name: string) => `duplicate JSDoc parameter '${name}'`,
    unexpectedTag: (title: string) => `unexpected @${title} tag; function has no return statement`,
    missingReturnType: 'missing JSDoc return type',
    missingReturnDescription: 'missing JSDoc return description',
    prefer: (name: string) => `use @${name} instead`,
    missingReturn: (param: string) => `missing JSDoc @${param || 'returns'} for function`,
    wrongParam: (expected: string, actual: string) => `expected JSDoc for '${expected}' but found '${actual}'`,
    missingParam: (name: string) => `missing JSDoc for parameter '${name}'`,
    wrongDescription: 'JSDoc description does not satisfy the regex pattern',
    invalidRegexDescription: (error: string) => `configured matchDescription is an invalid RegExp. Error: ${error}`
  };

  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: false,
    description: 'enforce valid JSDoc comments',
    rationale: Lint.Utils.dedent`
      [JSDoc](http://usejsdoc.org/) generates application programming interface (API) documentation
      from specially-formatted comments in JavaScript code. So does [typedoc](http://typedoc.org/).

      If comments are invalid because of typing mistakes, then documentation will be incomplete.

      If comments are inconsistent because they are not updated when function definitions are
      modified, then readers might become confused.
      `,
    optionsDescription: Lint.Utils.dedent`
      This rule has an object option:

      * \`"prefer"\` enforces consistent documentation tags specified by an object whose properties
                     mean instead of key use value (for example, \`"return": "returns"\` means
                     instead of \`@return\` use \`@returns\`)
      * \`"preferType"\` enforces consistent type strings specified by an object whose properties
                         mean instead of key use value (for example, \`"object": "Object"\` means
                         instead of \`object\` use \`Object\`)
      * \`"requireReturn"\` requires a return tag:
        * \`true\` (default) *even if* the function or method does not have a return statement
                   (this option value does not apply to constructors)
        * \`false\` *if and only if* the function or method has a return statement (this option
                    value does apply to constructors)
      * \`"requireParamType"\`: \`false\` allows missing type in param tags
      * \`"requireReturnType"\`: \`false\` allows missing type in return tags
      * \`"matchDescription"\` specifies (as a string) a regular expression to match the description
                               in each JSDoc comment (for example, \`".+"\` requires a description;
                               this option does not apply to descriptions in parameter or return
                               tags)
      * \`"requireParamDescription"\`: \`false\` allows missing description in parameter tags
      * \`"requireReturnDescription"\`: \`false\` allows missing description in return tags
      `,
    options: {
      type: 'object',
      properties: {
        prefer: {
          type: 'object',
          additionalProperties: {
            type: 'string'
          }
        },
        preferType: {
          type: 'object',
          additionalProperties: {
            type: 'string'
          }
        },
        requireReturn: {
          type: 'boolean'
        },
        requireParamDescription: {
          type: 'boolean'
        },
        requireReturnDescription: {
          type: 'boolean'
        },
        matchDescription: {
          type: 'string'
        },
        requireParamType: {
          type: 'boolean'
        },
        requireReturnType: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, {
          "prefer": {
            "return": "returns"
          },
          "requireReturn": false,
          "requireParamDescription": true,
          "requireReturnDescription": true,
          "matchDescription": "^[A-Z][A-Za-z0-9\\\\s]*[.]$"
        }]
        `
    ],
    typescriptOnly: false,
    type: 'maintainability'
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    let opts = this.getOptions().ruleArguments;
    OPTIONS = {
      prefer: {},
      requireReturn: true,
      requireParamType: true,
      requireReturnType: true,
      requireParamDescription: true,
      requireReturnDescription: true,
      matchDescription: ''
    };

    if (opts && opts.length > 0) {
      if (opts[0].prefer) {
        OPTIONS.prefer = opts[0].prefer;
      }

      OPTIONS.requireReturn = opts[0].requireReturn !== false;
      OPTIONS.requireParamType = opts[0].requireParamType !== false;
      OPTIONS.requireReturnType = opts[0].requireReturnType !== false;
      OPTIONS.requireParamDescription = opts[0].requireParamDescription !== false;
      OPTIONS.requireReturnDescription = opts[0].requireReturnDescription !== false;
      OPTIONS.matchDescription = opts[0].matchDescription;
    }

    const walker = new ValidJsdocWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

declare interface IReturnPresent {
  node: ts.Node;
  returnPresent: boolean;
}

class ValidJsdocWalker extends Lint.SkippableTokenAwareRuleWalker {
  private fns: Array<IReturnPresent> = [];

  protected visitSourceFile(node: ts.SourceFile) {
    super.visitSourceFile(node);
  }

  protected visitNode(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.ClassExpression) {
      this.visitClassExpression(node as ts.ClassExpression);
    }
    else {
      super.visitNode(node);
    }
  }

  protected visitArrowFunction(node: ts.ArrowFunction) {
    this.startFunction(node);
    super.visitArrowFunction(node);
    this.checkJSDoc(node);
  }

  protected visitFunctionExpression(node: ts.FunctionExpression) {
    this.startFunction(node);
    super.visitFunctionExpression(node);
    this.checkJSDoc(node);
  }

  protected visitFunctionDeclaration(node: ts.FunctionDeclaration) {
    this.startFunction(node);
    super.visitFunctionDeclaration(node);
    this.checkJSDoc(node);
  }

  protected visitClassExpression(node: ts.ClassExpression) {
    this.startFunction(node);
    super.visitClassExpression(node);
    this.checkJSDoc(node);
  }

  protected visitClassDeclaration(node: ts.ClassDeclaration) {
    this.startFunction(node);
    super.visitClassDeclaration(node);
    this.checkJSDoc(node);
  }

  protected visitMethodDeclaration(node: ts.MethodDeclaration) {
    this.startFunction(node);
    super.visitMethodDeclaration(node);
    this.checkJSDoc(node);
  }

  protected visitConstructorDeclaration(node: ts.ConstructorDeclaration) {
    this.startFunction(node);
    super.visitConstructorDeclaration(node);
    this.checkJSDoc(node);
  }

  protected visitReturnStatement(node: ts.ReturnStatement) {
    this.addReturn(node);
    super.visitReturnStatement(node);
  }

  private startFunction(node: ts.Node) {
    let returnPresent = false;

    if (node.kind === ts.SyntaxKind.ArrowFunction && (node as ts.ArrowFunction).body.kind !== ts.SyntaxKind.Block)
      returnPresent = true;

    if (this.isTypeClass(node))
      returnPresent = true;

    this.fns.push({ node, returnPresent });
  }

  private addReturn(node: ts.ReturnStatement) {
    let parent: ts.Node = node;
    let nodes = this.fns.map(fn => fn.node);

    while (parent && nodes.indexOf(parent) === -1)
      parent = parent.parent;

    if (parent && node.expression) {
      this.fns[nodes.indexOf(parent)].returnPresent = true;
    }
  }

  private isTypeClass(node: ts.Node) {
    return node.kind === ts.SyntaxKind.ClassExpression || node.kind === ts.SyntaxKind.ClassDeclaration;
  }

  private isValidReturnType(tag: doctrine.IJSDocTag) {
    return tag.type && (tag.type.name === 'void' || tag.type.type === 'UndefinedLiteral');
  }

  private getJSDocComment(node: ts.Node) {
    const ALLOWED_PARENTS = [
      ts.SyntaxKind.BinaryExpression,
      ts.SyntaxKind.VariableDeclaration,
      ts.SyntaxKind.VariableDeclarationList,
      ts.SyntaxKind.VariableStatement
    ];

    if (!/^\/\*\*/.test(node.getFullText().trim())) {
      if (ALLOWED_PARENTS.indexOf(node.parent.kind) !== -1) {
        return this.getJSDocComment(node.parent);
      }
      return {};
    }

    let comments = node.getFullText();
    comments = comments.substring(comments.indexOf('/**'));
    comments = comments.substring(0, comments.indexOf('*/') + 2);

    let start = node.pos;
    let width = comments.length;

    if (!/^\/\*\*/.test(comments) || !/\*\/$/.test(comments)) {
      return {};
    }

    return { comments, start, width };
  }

  private checkJSDoc(node: ts.Node) {
    const { comments, start, width } = this.getJSDocComment(node);

    if (!comments)
      return;

    let jsdoc: doctrine.IJSDocComment;

    try {
      jsdoc = doctrine.parse(comments, {
        strict: true,
        unwrap: true,
        sloppy: true
      });
    }
    catch (e) {
      if (/braces/i.test(e.message)) {
        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingBrace));
      }
      else {
        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.syntaxError));
      }
      return;
    }

    let fn = this.fns.filter(f => node === f.node)[0];
    let params = {};
    let hasReturns = false;
    let hasConstructor = false;
    let isOverride = false;

    for (let tag of jsdoc.tags) {
      switch (tag.title) {
        case 'param':
        case 'arg':
        case 'argument':
          if (!tag.type && OPTIONS.requireParamType) {
            this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingParameterType(tag.name)));
          }

          if (!tag.description && OPTIONS.requireParamDescription) {
            this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingParameterDescription(tag.name)));
          }

          if (params[tag.name]) {
            this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.duplicateParameter(tag.name)));
          }
          else if (tag.name.indexOf('.') === -1) {
            params[tag.name] = true;
          }
          break;
        case 'return':
        case 'returns':
          hasReturns = true;

          if (!OPTIONS.requireReturn && !fn.returnPresent && tag.type.name !== 'void' && tag.type.name !== 'undefined') {
            this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.unexpectedTag(tag.title)));
          }
          else {
            if (!tag.type && OPTIONS.requireReturnType) {
              this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingReturnType));
            }

            if (!this.isValidReturnType(tag) && !tag.description && OPTIONS.requireReturnDescription) {
              this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingReturnDescription));
            }
          }
          break;
        case 'constructor':
        case 'class':
          hasConstructor = true;
          break;
        case 'override':
        case 'inheritdoc':
          isOverride = true;
          break;
      }

      // check prefer (we need to ensure it has the property and not inherit from Object - e.g: constructor)
      let title = OPTIONS.prefer[tag.title];
      if (OPTIONS.prefer.hasOwnProperty(tag.title) && tag.title !== title) {
        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.prefer(title)));
      }
    }

    // check for functions missing @returns
    if (!isOverride && !hasReturns && !hasConstructor && node.parent.kind !== ts.SyntaxKind.GetKeyword && !this.isTypeClass(node)) {
      if (OPTIONS.requireReturn || fn.returnPresent) {
        this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingReturn(OPTIONS.prefer['returns'])));
      }
    }

    // check the parameters
    const jsdocParams = Object.keys(params);
    const parameters = (node as ts.SignatureDeclaration).parameters;

    if (parameters) {
      parameters.forEach((param, i) => {
        if (param.name.kind === ts.SyntaxKind.Identifier) {
          let name = (param.name as ts.Identifier).text;
          if (jsdocParams[i] && name !== jsdocParams[i]) {
            this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.wrongParam(name, jsdocParams[i])));
          }
          else if (!params[name] && !isOverride) {
            this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.missingParam(name)));
          }
        }
      });
    }

    if (OPTIONS.matchDescription) {
      try {
        const regex = new RegExp(OPTIONS.matchDescription);
        if (!regex.test(jsdoc.description)) {
          this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING.wrongDescription));
        }
      }
      catch (e) {
        this.addFailure(this.createFailure(start, width, e.message));
      }
    }
  }
}
