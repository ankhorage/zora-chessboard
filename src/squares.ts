import type { ChessBoardOrientation, ChessSquareId } from './types';

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;

function toSquare(file: (typeof files)[number], rank: (typeof ranks)[number]): ChessSquareId {
  return `${file}${rank}` as ChessSquareId;
}

export const chessSquares = ranks.flatMap((rank) => files.map((file) => toSquare(file, rank)));

export function createBoardSquares(orientation: ChessBoardOrientation): readonly ChessSquareId[] {
  const displayedRanks = orientation === 'white' ? [...ranks].reverse() : [...ranks];
  const displayedFiles = orientation === 'white' ? [...files] : [...files].reverse();

  return displayedRanks.flatMap((rank) => displayedFiles.map((file) => toSquare(file, rank)));
}

export function isLightSquare(square: ChessSquareId): boolean {
  const file = files.indexOf(square[0] as (typeof files)[number]);
  const rank = ranks.indexOf(square[1] as (typeof ranks)[number]);

  return (file + rank) % 2 === 1;
}

export function getSquareFile(square: ChessSquareId): string {
  return square[0] ?? '';
}

export function getSquareRank(square: ChessSquareId): string {
  return square[1] ?? '';
}
