export const chessBoardMeta = {
  name: 'ChessBoard',
  category: 'component',
  directManifestNode: false,
  allowedChildren: [],
  note: 'Code-facing chessboard component from @ankhorage/zora-chess, backed by chess.js and styled from the active ZORA theme; not represented as a manifest node in v1.',
  props: {},
} as const;

export const openingBookMeta = {
  name: 'OpeningBook',
  category: 'component',
  directManifestNode: false,
  allowedChildren: [],
  note: 'Code-facing opening-book component from @ankhorage/zora-chess. It is presentational only; Studio or runtime bindings should provide moves from a data-source operation.',
  props: {
    moves: {
      kind: 'array',
      note: 'Candidate opening-book moves, typically bound from an operation result.',
    },
    selectedMove: {
      kind: 'string',
      note: 'Selected SAN, UCI, or FEN identifier.',
    },
  },
} as const;
