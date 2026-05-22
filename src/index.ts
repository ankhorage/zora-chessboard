export { ChessBoard } from './ChessBoard';
export { OpeningBook, createOpeningBookColorScheme } from './OpeningBook';
export type { ChessColorThemeShape } from './colors';
export { createChessBoardColorScheme } from './colors';
export type { ChessPieceState } from './engine';
export { getLegalTargets, readChessPieces, tryMove } from './engine';
export { chessBoardMeta, openingBookMeta } from './meta';
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
export type {
  OpeningBookColorOverrides,
  OpeningBookColorScheme,
  OpeningBookMove,
  OpeningBookProps,
} from './OpeningBook';