import { describe, expect, it } from 'bun:test';

import { getLegalTargets, readChessPieces, tryMove } from './engine';

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

describe('readChessPieces', () => {
  it('reads pieces from FEN', () => {
    const pieces = readChessPieces(START_FEN);

    expect(pieces.size).toBe(32);
    expect(pieces.get('e1')?.piece).toBe('K');
    expect(pieces.get('e8')?.piece).toBe('k');
  });

  it('returns an empty map for invalid FEN', () => {
    expect(readChessPieces('invalid').size).toBe(0);
  });
});

describe('getLegalTargets', () => {
  it('returns legal target squares', () => {
    expect(getLegalTargets(START_FEN, 'e2')).toEqual(['e3', 'e4']);
  });
});

describe('tryMove', () => {
  it('returns resulting move details for legal moves', () => {
    const result = tryMove(START_FEN, { from: 'e2', to: 'e4' });

    expect(result?.san).toBe('e4');
    expect(result?.lan).toBe('e2e4');
    expect(result?.fen).toContain(' b ');
  });

  it('returns null for invalid moves', () => {
    expect(tryMove(START_FEN, { from: 'e2', to: 'e5' })).toBeNull();
  });
});
