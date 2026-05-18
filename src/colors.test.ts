import { describe, expect, it } from 'bun:test';

import { createChessBoardColorScheme, type ChessColorThemeShape } from './colors';

const theme = {
  semantics: {
    action: {
      primary: {
        softBg: 'primary-soft',
      },
    },
    content: {
      default: 'content-default',
      muted: 'content-muted',
    },
    neutral: {
      divider: 'neutral-divider',
      surface: 'neutral-surface',
      surfaceHover: 'neutral-surface-hover',
    },
    success: {
      softBg: 'success-soft',
    },
    warning: {
      softBg: 'warning-soft',
    },
  },
} satisfies ChessColorThemeShape;

describe('createChessBoardColorScheme', () => {
  it('maps ZORA theme semantics to chessboard states', () => {
    expect(createChessBoardColorScheme(theme)).toEqual({
      border: 'neutral-divider',
      coordinateText: 'content-muted',
      darkPiece: 'content-default',
      darkSquare: 'neutral-surface-hover',
      darkSquareText: 'content-muted',
      lastMoveFrom: 'warning-soft',
      lastMoveTo: 'warning-soft',
      legalTarget: 'success-soft',
      lightPiece: 'content-default',
      lightSquare: 'neutral-surface',
      lightSquareText: 'content-muted',
      selectedSquare: 'primary-soft',
    });
  });

  it('applies chess-specific overrides last', () => {
    expect(
      createChessBoardColorScheme(theme, {
        darkSquare: 'custom-dark',
        selectedSquare: 'custom-selected',
      }),
    ).toMatchObject({
      darkSquare: 'custom-dark',
      selectedSquare: 'custom-selected',
    });
  });
});
