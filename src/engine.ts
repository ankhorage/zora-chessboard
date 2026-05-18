import { Chess, type Move, type Square } from 'chess.js';

import type {
  ChessMoveAttempt,
  ChessMoveResult,
  ChessPieceCode,
  ChessSquareId,
} from './types';

export interface ChessPieceState {
  color: 'black' | 'white';
  piece: ChessPieceCode;
  square: ChessSquareId;
}

function createChess(fen: string): Chess | null {
  try {
    return new Chess(fen);
  } catch {
    return null;
  }
}

function toPieceCode(piece: { color: 'b' | 'w'; type: string }): ChessPieceCode {
  return piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase();
}

function toMoveResult(move: Move, fen: string): ChessMoveResult {
  return {
    fen,
    from: move.from,
    lan: move.lan,
    promotion: move.promotion,
    san: move.san,
    to: move.to,
  };
}

export function readChessPieces(fen: string): ReadonlyMap<ChessSquareId, ChessPieceState> {
  const chess = createChess(fen);
  const pieces = new Map<ChessSquareId, ChessPieceState>();

  if (!chess) {
    return pieces;
  }

  chess.board().forEach((rank) => {
    rank.forEach((piece) => {
      if (!piece) {
        return;
      }

      const square = piece.square as ChessSquareId;
      pieces.set(square, {
        color: piece.color === 'w' ? 'white' : 'black',
        piece: toPieceCode(piece),
        square,
      });
    });
  });

  return pieces;
}

export function getLegalTargets(fen: string, from: ChessSquareId): readonly ChessSquareId[] {
  const chess = createChess(fen);
  if (!chess) {
    return [];
  }

  return chess
    .moves({ square: from as Square, verbose: true })
    .map((move) => move.to as ChessSquareId);
}

export function tryMove(fen: string, attempt: ChessMoveAttempt): ChessMoveResult | null {
  const chess = createChess(fen);
  if (!chess) {
    return null;
  }

  try {
    const move = chess.move({
      from: attempt.from,
      promotion: attempt.promotion,
      to: attempt.to,
    });

    return toMoveResult(move, chess.fen());
  } catch {
    return null;
  }
}
