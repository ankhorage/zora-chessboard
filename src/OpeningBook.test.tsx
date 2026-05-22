import { describe, expect, it } from 'bun:test';

import type { ChessColorThemeShape } from './colors';
import { createOpeningBookColorScheme } from './OpeningBookColors';

const theme = {
  semantics: {
    action: {
      primary: {
        softBg: '#eef2ff',
      },
    },
    content: {
      default: '#111827',
      muted: '#6b7280',
    },
    neutral: {
      divider: '#e5e7eb',
      surface: '#ffffff',
      surfaceHover: '#f9fafb',
    },
    success: {
      softBg: '#ecfdf5',
    },
    warning: {
      softBg: '#fffbeb',
    },
  },
} satisfies ChessColorThemeShape;

describe('createOpeningBookColorScheme', () => {
  it('maps ZORA semantic colors into an opening-book color scheme', () => {
    expect(createOpeningBookColorScheme(theme)).toEqual({
      border: '#e5e7eb',
      metricSurface: '#ffffff',
      primaryText: '#111827',
      secondaryText: '#6b7280',
      selectedSurface: '#eef2ff',
      surface: '#ffffff',
      surfaceHover: '#f9fafb',
      titleText: '#111827',
    });
  });

  it('applies explicit overrides last', () => {
    expect(
      createOpeningBookColorScheme(theme, { selectedSurface: '#123456' }).selectedSurface,
    ).toBe('#123456');
  });
});
