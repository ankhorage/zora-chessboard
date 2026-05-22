import { describe, expect, it } from 'bun:test';

import { chessBoardMeta, openingBookMeta } from './meta';
import { ZORA_CHESS_COMPONENT_META } from './registry';

describe('ZORA chess component metadata', () => {
  it('registers ChessBoard and OpeningBook metadata entries', () => {
    expect(ZORA_CHESS_COMPONENT_META.ChessBoard).toBe(chessBoardMeta);
    expect(ZORA_CHESS_COMPONENT_META.OpeningBook).toBe(openingBookMeta);
  });

  it('describes OpeningBook props that runtime bindings can provide', () => {
    expect(Object.keys(openingBookMeta.props)).toEqual([
      'moves',
      'loading',
      'errorText',
      'emptyText',
      'selectedMove',
    ]);

    expect(openingBookMeta.props.moves).toMatchObject({
      bindable: true,
      itemKind: 'object',
      kind: 'array',
    });
    expect(openingBookMeta.props.loading).toMatchObject({
      bindable: true,
      kind: 'boolean',
    });
    expect(openingBookMeta.props.errorText).toMatchObject({
      bindable: true,
      kind: 'string',
    });
    expect(openingBookMeta.props.emptyText).toMatchObject({
      bindable: true,
      kind: 'string',
    });
    expect(openingBookMeta.props.selectedMove).toMatchObject({
      bindable: true,
      kind: 'string',
      nullable: true,
    });
  });

  it('describes ChessBoard onLegalMove payload fields for operation input binding', () => {
    expect(chessBoardMeta.events.onLegalMove.payload).toMatchObject({
      fen: {
        kind: 'string',
      },
      from: {
        kind: 'string',
      },
      lan: {
        kind: 'string',
      },
      san: {
        kind: 'string',
      },
      to: {
        kind: 'string',
      },
    });
  });
});
