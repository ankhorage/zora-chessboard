<!-- markdownlint-disable MD013 MD033 -->

# @ankhorage/zora-chess

Chess UI components for React Native and React Native Web apps built on ZORA.

The package starts with `ChessBoard` and is intended to grow into a small set of reusable chess UI components such as `OpeningBook`, `MoveList`, `VariationLine`, `CapturedPieces`, and board controls.

## Install

```bash
bun add @ankhorage/zora-chess chess.js @ankhorage/zora
```

Peer dependencies:

- `react`
- `react-native`
- `@ankhorage/zora`

Direct dependency:

- `chess.js`

## Boundary

`@ankhorage/zora-chess` provides chess-specific UI components. It does not own your chess app, persistence, Supabase queries, opening database, training mode, or engine evaluation.

`chess.js` is used for chess rules, FEN parsing, legal move generation, and move validation.

## Basic board

```tsx
import { ChessBoard } from '@ankhorage/zora-chess';

export function BoardExample() {
  return (
    <ChessBoard
      fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      orientation="white"
      showCoordinates
    />
  );
}
```

## Interactive board

```tsx
import { ChessBoard, type ChessSquareId } from '@ankhorage/zora-chess';
import React from 'react';

export function InteractiveBoard({ fen }: { fen: string }) {
  const [selectedSquare, setSelectedSquare] = React.useState<ChessSquareId | null>(null);

  return (
    <ChessBoard
      fen={fen}
      selectedSquare={selectedSquare}
      onSquarePress={(square) => setSelectedSquare(square)}
      onLegalMove={(move) => {
        console.log(move.san, move.fen);
        setSelectedSquare(null);
      }}
      onInvalidMove={() => setSelectedSquare(null)}
    />
  );
}
```

## Theme integration

`ChessBoard` reads the active ZORA theme and derives its default board colors from that theme. It does not create a separate theme provider.

```tsx
import { ZoraProvider } from '@ankhorage/zora';
import { ChessBoard } from '@ankhorage/zora-chess';

export function ThemedBoard({ fen }: { fen: string }) {
  return (
    <ZoraProvider>
      <ChessBoard fen={fen} />
    </ZoraProvider>
  );
}
```

Chess-specific colors can be overridden without replacing the full ZORA theme:

```tsx
<ChessBoard
  fen={fen}
  colorScheme={{
    lightSquare: '#f0d9b5',
    darkSquare: '#b58863',
    selectedSquare: '#f6f669',
  }}
/>
```

## Custom piece renderer

```tsx
<ChessBoard
  fen={fen}
  renderPiece={({ piece }) => <MyPieceAsset piece={piece} />}
/>
```

## Metadata

The package exports extension metadata for tooling:

```ts
import { ZORA_CHESS_COMPONENT_META, chessBoardMeta } from '@ankhorage/zora-chess';
```

The registry name is intentionally package-specific. Core `@ankhorage/zora` owns `ZORA_COMPONENT_META`.

## Out of scope

- Supabase integration
- opening database queries
- Stockfish / engine evaluation
- PGN viewer UI
- move list UI
- drag/drop v1
- arrows and annotations v1
- native piece assets

## Verification

```bash
bun install
bun run knip
bun run lint
bun run build
bun run test
```
