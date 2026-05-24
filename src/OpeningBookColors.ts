import type { ChessColorThemeShape } from './colors';

export interface OpeningBookColorScheme {
  readonly border: string;
  readonly surface: string;
  readonly surfaceHover: string;
  readonly selectedSurface: string;
  readonly titleText: string;
  readonly primaryText: string;
  readonly secondaryText: string;
  readonly metricSurface: string;
}

export type OpeningBookColorOverrides = Partial<OpeningBookColorScheme>;

/***
 * Creates the theme-derived palette used by `OpeningBook`.
 *
 * Use `createOpeningBookColorScheme` when custom opening-list rows, badges, or
 * trainer panels should match the built-in book surface and selected-move states.
 *
 * @readme
 * @example Custom opening book colors
 * ```ts
 * const colors = createOpeningBookColorScheme(theme, { selectedSurface: '#dbeafe' });
 * ```
 */
export function createOpeningBookColorScheme(
  theme: ChessColorThemeShape,
  overrides?: OpeningBookColorOverrides,
): OpeningBookColorScheme {
  return {
    border: theme.semantics.neutral.divider,
    metricSurface: theme.semantics.neutral.surface,
    primaryText: theme.semantics.content.default,
    secondaryText: theme.semantics.content.muted,
    selectedSurface: theme.semantics.action.primary.softBg,
    surface: theme.semantics.neutral.surface,
    surfaceHover: theme.semantics.neutral.surfaceHover,
    titleText: theme.semantics.content.default,
    ...overrides,
  };
}
