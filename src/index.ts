export { ChessBoard } from './ChessBoard';
export { createChessBoardColorScheme } from './colors';
export type { ChessColorThemeShape } from './colors';
export { getLegalTargets, readChessPieces, tryMove } from './engine';
export type { ChessPieceState } from './engine';
export { chessBoardMeta } from './meta';
export { ZORA_CHESS_COMPONENT_META } from './registry';
export { chessSquares, createBoardSquares, getSquareFile, getSquareRank, isLightSquare } from './squares';
export type {
  ChessBoardColorOverrides,
  ChessBoardColorScheme,
  ChessBoardOrientation,
  ChessBoardProps,
  ChessMoveAttempt,
  ChessMoveResult,
  ChessPieceCode,
  ChessPieceRenderer,
  ChessPieceRenderContext,
  ChessPromotionPiece,
  ChessSquareId,
} from './types';
