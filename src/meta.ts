export const chessBoardMeta = {
  name: 'ChessBoard',
  category: 'component',
  directManifestNode: false,
  allowedChildren: [],
  note: 'Code-facing chessboard component from @ankhorage/zora-chess, backed by chess.js and styled from the active ZORA theme; not represented as a manifest node in v1.',
  props: {
    fen: {
      kind: 'string',
      required: true,
      note: 'Current board position in Forsyth-Edwards Notation.',
    },
    orientation: {
      kind: 'enum',
      values: ['white', 'black'],
      note: 'Board orientation from the active player perspective.',
    },
    selectedSquare: {
      kind: 'string',
      nullable: true,
      note: 'Currently selected square, such as e4.',
    },
    legalTargets: {
      kind: 'array',
      itemKind: 'string',
      note: 'Legal target squares for the selected square.',
    },
    lastMove: {
      kind: 'object',
      nullable: true,
      note: 'Last move marker with from/to square ids.',
    },
  },
  events: {
    onLegalMove: {
      note: 'Emitted after a locally validated legal move attempt.',
      payload: {
        from: {
          kind: 'string',
          note: 'Origin square id, such as e2.',
        },
        to: {
          kind: 'string',
          note: 'Target square id, such as e4.',
        },
        fen: {
          kind: 'string',
          note: 'Resulting board position after the legal move; suitable for operation input bindings.',
        },
        san: {
          kind: 'string',
          note: 'Move in Standard Algebraic Notation.',
        },
        lan: {
          kind: 'string',
          note: 'Move in long algebraic notation.',
        },
        promotion: {
          kind: 'string',
          optional: true,
          note: 'Promotion piece when the move promotes a pawn.',
        },
      },
    },
    onInvalidMove: {
      note: 'Emitted after a locally validated invalid move attempt.',
      payload: {
        from: {
          kind: 'string',
          note: 'Origin square id.',
        },
        to: {
          kind: 'string',
          note: 'Target square id.',
        },
        promotion: {
          kind: 'string',
          optional: true,
          note: 'Requested promotion piece when present.',
        },
      },
    },
    onMoveAttempt: {
      note: 'Emitted for a selected-square move attempt before optional local validation.',
      payload: {
        from: {
          kind: 'string',
          note: 'Origin square id.',
        },
        to: {
          kind: 'string',
          note: 'Target square id.',
        },
        promotion: {
          kind: 'string',
          optional: true,
          note: 'Requested promotion piece when present.',
        },
      },
    },
    onSquarePress: {
      note: 'Emitted when a board square is pressed.',
      payload: {
        square: {
          kind: 'string',
          note: 'Pressed square id.',
        },
      },
    },
  },
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
      itemKind: 'object',
      bindable: true,
      note: 'Candidate opening-book moves, typically bound from an operation result.',
    },
    loading: {
      kind: 'boolean',
      bindable: true,
      note: 'Whether the caller is currently loading opening-book moves.',
    },
    errorText: {
      kind: 'string',
      bindable: true,
      note: 'Error copy supplied by the caller when opening-book moves could not be loaded.',
    },
    emptyText: {
      kind: 'string',
      bindable: true,
      note: 'Empty-state copy shown when no moves are available.',
    },
    selectedMove: {
      kind: 'string',
      nullable: true,
      bindable: true,
      note: 'Selected SAN, UCI, or FEN identifier.',
    },
  },
} as const;
