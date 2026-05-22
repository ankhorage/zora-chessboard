export { ChessBoard } from './ChessBoard';
export type { ChessColorThemeShape } from './colors';
export { createChessBoardColorScheme } from './colors';
export type { ChessPieceState } from './engine';
export { getLegalTargets, readChessPieces, tryMove } from './engine';
export { chessBoardMeta, openingBookMeta } from './meta';
export type { OpeningBookMove, OpeningBookProps } from './OpeningBook';
export { OpeningBook } from './OpeningBook';
export type { OpeningBookColorOverrides, OpeningBookColorScheme } from './OpeningBookColors';
export { createOpeningBookColorScheme } from './OpeningBookColors';
export { ZORA_CHESS_COMPONENT_META } from './registry';
export {
  chessSquares,
  createBoardSquares,
  getSquareFile,
  getSquareRank,
  isLightSquare,
} from './squares';
export type {
  ChessBoardColorOverrides,
  ChessBoardColorScheme,
  ChessBoardOrientation,
  ChessBoardProps,
  ChessMoveAttempt,
  ChessMoveResult,
  ChessPieceCode,
  ChessPieceRenderContext,
  ChessPieceRenderer,
  ChessPromotionPiece,
  ChessSquareId,
} from './types';
