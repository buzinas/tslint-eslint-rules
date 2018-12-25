import * as ts from 'typescript';
import { isTokenKind } from 'tsutils';

export function isAssignmentToken(token: ts.Node) {
  return token.kind >= ts.SyntaxKind.FirstAssignment && token.kind <= ts.SyntaxKind.LastAssignment;
}

export function isNullOrUndefined(node: ts.Node) {
  return node.kind === ts.SyntaxKind.NullKeyword ||
    (node.kind === ts.SyntaxKind.Identifier && (node as ts.Identifier).text === 'undefined') ||
    node.kind === ts.SyntaxKind.VoidExpression;
}

export function listTokens(node: ts.Node): ts.Node[] {
  if (isTokenKind(node.kind)) {
    return [node];
  }

  if (node.kind !== ts.SyntaxKind.JSDocComment) {
    return node
      .getChildren(node.getSourceFile())
      .filter(child => child.kind !== ts.SyntaxKind.OpenBracketToken && child.kind !== ts.SyntaxKind.CloseBracketToken);
  }

  return [];
}

export function equalTokens(leftNode: ts.Node, rightNode: ts.Node) {
  const tokensL = listTokens(leftNode);
  const tokensR = listTokens(rightNode);

  if (tokensL.length !== tokensR.length) {
    return false;
  }

  for (let i = 0; i < tokensL.length; ++i) {
    if (tokensL[i].getText() !== tokensR[i].getText()) {
      return false;
    }
  }

  return true;
}
