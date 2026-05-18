# Components

## ChessBoard

Source: `src/ChessBoard.tsx:43:1`

Export paths: `src/index.ts`

| Prop            | Type                                            | Required | Default   | Description |
| --------------- | ----------------------------------------------- | -------- | --------- | ----------- |
| colorScheme     | `ChessBoardColorOverrides \| undefined`         | no       | —         |             |
| disabled        | `boolean \| undefined`                          | no       | `false`   |             |
| fen             | `string`                                        | yes      | —         |             |
| lastMove        | `ChessMoveAttempt \| null \| undefined`         | no       | `null`    |             |
| legalTargets    | `readonly ChessSquareId[] \| undefined`         | no       | —         |             |
| onInvalidMove   | `(move: ChessMoveAttempt) => void \| undefined` | no       | —         |             |
| onLegalMove     | `(move: ChessMoveResult) => void \| undefined`  | no       | —         |             |
| onMoveAttempt   | `(move: ChessMoveAttempt) => void \| undefined` | no       | —         |             |
| onSquarePress   | `(square: ChessSquareId) => void \| undefined`  | no       | —         |             |
| orientation     | `ChessBoardOrientation \| undefined`            | no       | `'white'` |             |
| renderPiece     | `ChessPieceRenderer \| undefined`               | no       | —         |             |
| selectedSquare  | `ChessSquareId \| null \| undefined`            | no       | `null`    |             |
| showCoordinates | `boolean \| undefined`                          | no       | `false`   |             |
| testID          | `string \| undefined`                           | no       | —         |             |
| validateMoves   | `boolean \| undefined`                          | no       | `true`    |             |
