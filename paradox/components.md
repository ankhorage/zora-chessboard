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

## OpeningBook

Source: `src/OpeningBook.tsx:32:1`

Export paths: `src/index.ts`

| Prop         | Type                                           | Required | Default                              | Description |
| ------------ | ---------------------------------------------- | -------- | ------------------------------------ | ----------- |
| colorScheme  | `OpeningBookColorOverrides \| undefined`       | no       | —                                    |             |
| emptyText    | `string \| undefined`                          | no       | `'No book moves for this position.'` |             |
| errorText    | `string \| undefined`                          | no       | —                                    |             |
| loading      | `boolean \| undefined`                         | no       | `false`                              |             |
| moves        | `readonly OpeningBookMove[] \| undefined`      | no       | `[]`                                 |             |
| onMovePress  | `(move: OpeningBookMove) => void \| undefined` | no       | —                                    |             |
| selectedMove | `string \| null \| undefined`                  | no       | `null`                               |             |
| testID       | `string \| undefined`                          | no       | —                                    |             |
| title        | `string \| undefined`                          | no       | `'Opening book'`                     |             |
