import type { SurfaceTheme } from '@ankhorage/surface';

import type { ChessBoardColorOverrides, ChessBoardColorScheme } from './types';

export function createChessBoardColorScheme(
  theme: SurfaceTheme,
  overrides?: ChessBoardColorOverrides,
): ChessBoardColorScheme {
  return {
    border: theme.semantics.neutral.divider,
    coordinateText: theme.semantics.content.muted,
    darkPiece: theme.semantics.content.default,
    darkSquare: theme.semantics.neutral.surfaceHover,
    darkSquareText: theme.semantics.content.muted,
    lastMoveFrom: theme.semantics.warning.softBg,
    lastMoveTo: theme.semantics.warning.softBg,
    legalTarget: theme.semantics.success.softBg,
    lightPiece: theme.semantics.content.default,
    lightSquare: theme.semantics.neutral.surface,
    lightSquareText: theme.semantics.content.muted,
    selectedSquare: theme.semantics.action.primary.softBg,
    ...overrides,
  };
}
