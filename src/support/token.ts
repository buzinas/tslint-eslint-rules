import * as ts from 'typescript';

export function isAssignmentToken(token: ts.Node) {
  return token.kind >= ts.SyntaxKind.FirstAssignment && token.kind <= ts.SyntaxKind.LastAssignment;
}
