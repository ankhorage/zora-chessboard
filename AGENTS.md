# Ankhorage Agent Guide for `@ankhorage/zora-chess`

This repository is a strict TypeScript Bun package for standalone chess UI components for React Native and React Native Web, built on `@ankhorage/zora`.

`@ankhorage/zora-chess` must remain usable outside Ankhorage-generated apps. It provides reusable chess presentation components such as boards, pieces, move targets, legal-move feedback, and opening-book displays while staying independent from app templates, Studio authoring logic, runtime interpretation, CLI generation, orchestrator workflows, and app-specific chess trainer semantics.

All coding agents must follow the rules below.

## Non-negotiables

- Do not introduce `any`, `as any`, `unknown as any`, or broad casts to silence errors.
- Do not add `@ts-ignore` / `@ts-expect-error` unless explicitly requested.
- Do not add `eslint-disable` or weaken lint rules/config to “make it pass”.
- Do not weaken tsconfig strictness or change module resolution settings.
- Do not perform large refactors unless explicitly requested.
- Do not add app state, trainer state, persistence workflows, database workflows, network workflows, or generated-app behavior.
- Do not add app manifest interpretation, runtime schema logic, CLI logic, Studio-only behavior, orchestrator logic, or deployment orchestration.
- Do not import from consumer packages such as Studio, runtime, CLI, templates, generated apps, or orchestrator modules.
- Do not introduce domain-specific app concepts such as puzzle progress, lesson progress, user accounts, ratings, saved games, manifest nodes, actions, modules, authoring layers, screen generation, or app categories.
- Do not add browser-only APIs without a React Native compatible abstraction.
- Do not add heavy UI frameworks or styling systems.
- If you cannot proceed without violating rules: STOP and propose 2–3 options with tradeoffs.

## Required verification

Before concluding any code task, run from repo root:

- `bun run build`
- `bun run lint:fix`
- `bun run test`
- `bun run knip`

For release or packaging-related work, also run:

- `npm pack --dry-run`

If any command fails: STOP and report the failure plus the minimal fix.

## Package responsibility

This package owns reusable chess presentation UI for React Native and React Native Web:

- chess-board rendering
- square and coordinate rendering helpers
- chess-piece rendering hooks and override points
- selected-square, last-move, legal-target, and invalid-move visual states
- local board interaction callbacks such as square press and move attempt events
- opening-book display primitives that render externally supplied move data
- package-level component metadata/registry entries for UI discovery
- theme-aware visuals built from ZORA and Surface semantics
- accessibility behavior for interactive chess elements
- README/examples for generic chess UI usage

This package may contain limited chess-board helper logic when it directly supports presentation, for example:

- reading a FEN into board pieces
- deriving legal targets for interactive board highlighting
- attempting a local move for board feedback

This package does not own:

- chess engines or engine analysis
- Stockfish integration
- puzzle/training workflows
- opening-book fetching
- PGN databases or persistence
- user accounts, ratings, or multiplayer sessions
- app manifest interpretation
- runtime node rendering
- Studio authoring behavior
- generated routes or generated layouts
- template category decisions
- app-specific screen content
- auth provider integrations
- Supabase or other provider logic
- CLI file generation
- orchestrator/module install logic
- deployment logic
- persistence, database, network, or domain workflows

## Dependency boundaries

Allowed dependency direction:

- `@ankhorage/zora-chess` may import from `@ankhorage/zora` as its public UI foundation.
- `@ankhorage/zora-chess` may use `react` and `react-native`.
- `@ankhorage/zora-chess` may use `chess.js` for lightweight board parsing and local move validation when the logic directly supports UI behavior.
- `@ankhorage/zora-chess` may use `@ankhorage/surface` only if a lower-level render primitive is not available through ZORA and the dependency is explicitly justified in the change.

Preferred architecture:

```txt
@ankhorage/surface    → render foundation primitives
@ankhorage/zora       → reusable UI system
@ankhorage/zora-chess → chess presentation primitives
Consumers             → apps, Studio/runtime adapters, generated projects
```

Forbidden dependencies:

- `@ankhorage/cli`
- `@ankhorage/runtime`
- `@ankhorage/studio`
- `@ankhorage/templates`
- `@ankhorage/orchestrator`
- generated app code
- Expo Router
- Next.js app code
- backend/provider SDKs
- app manifests or runtime schema packages, unless explicitly approved for a clearly UI-neutral type-only boundary

If a feature appears to require one of these dependencies, STOP and propose a boundary-safe alternative.

## Layering rules

Folder responsibilities:

```txt
src/*.tsx      → public component implementations for this small package
src/*.ts       → public types, helpers, registry, metadata, and color resolvers
src/internal/* → optional shared helpers/resolvers only
```

Rules:

- Components may depend on ZORA and package-local helpers.
- Components must not depend on consumer apps or generated app structures.
- Opening-book UI must stay presentational. Consumers provide moves, loading/error/empty state, and selected move values.
- Board interaction may emit events, but it must not execute app actions, fetch data, persist data, or know about runtime bindings.
- Internal helpers must stay generic and reusable.
- Keep domain mapping outside the package. Consumers should map app-specific puzzle, lesson, or game data into generic chess component props.

## File and export conventions

For this small package, colocated root-level modules are acceptable when they match the existing repository shape:

```txt
src/ChessBoard.tsx
src/OpeningBook.tsx
src/types.ts
src/colors.ts
src/meta.ts
src/registry.ts
src/index.ts
```

If a component grows large, prefer this shape before adding more root-level files:

```txt
src/components/element-name/
  ElementName.tsx
  types.ts
  index.ts
```

Every public element must be exported from `src/index.ts`:

```ts
export type { ElementNameProps } from './ElementName';
export { ElementName } from './ElementName';
```

Type exports must stay explicit. Do not rely on broad wildcard exports for public components unless the repo already uses that convention for a specific module.

Build outputs must go to `dist/`. Never write build artifacts into `src/`.

## Component API expectations

Public APIs should be:

- additive unless a breaking change is explicitly requested
- typed without escape hatches
- cross-platform by default
- predictable on React Native and React Native Web
- accessible for interactive elements
- generic enough for chess apps, trainers, analysis views, and generated apps without mentioning those consumers in core component props

Prefer data-driven presentational props:

```ts
fen: string;
selectedSquare: ChessSquareId | null;
legalTargets: readonly ChessSquareId[];
lastMove: ChessMoveResult | null;
onMoveAttempt: (attempt: ChessMoveAttempt) => void;
```

Avoid hidden behavior:

- no implicit global state
- no silent side effects
- no consumer-specific branching
- no runtime/schema assumptions
- no network calls
- no persistence calls

Prefer composition over huge prop surfaces, but use structured props where they protect consistency.

## Chess abstraction rules

Use generic chess UI language in public APIs:

- Prefer `fen`, `orientation`, `selectedSquare`, `legalTargets`, `lastMove`, `moves`, `selectedMove`, `loading`, `errorText`, and `emptyText`.
- Avoid trainer/app-only public prop names such as `puzzleId`, `lessonId`, `rating`, `streak`, `openingApiUrl`, `userProgress`, or `sessionId`.
- If a chess app needs those concepts, map them in the app layer into generic component props.

Opening-book components should display move data supplied by the caller:

```ts
export interface OpeningBookMove {
  readonly san: string;
  readonly uci?: string;
  readonly fen?: string;
  readonly name?: string;
  readonly eco?: string;
  readonly games?: number;
  readonly whiteWinRate?: number;
  readonly drawRate?: number;
  readonly blackWinRate?: number;
}
```

Do not fetch opening-book data inside `OpeningBook`.

## Styling and theme rules

- Use active ZORA/Surface theme semantics instead of hardcoded one-off colors.
- Prefer semantic tones over arbitrary colors.
- Prefer existing spacing, radius, typography, and color semantics.
- Do not expose arbitrary `style` props on new high-level components unless explicitly approved.
- Do not expose arbitrary raw string color APIs on new components unless explicitly approved.
- If a component needs visual variation, model it as structured props such as `tone`, `variant`, `size`, `shape`, `emphasis`, or `align`.
- Mobile and web must both be considered for layout and interaction behavior.
- Responsive behavior should use existing responsive infrastructure where possible instead of manual platform-specific hacks.

## Accessibility rules

- Interactive components must support accessible labels.
- Icon-only or symbol-only actions must require `label` or `accessibilityLabel`.
- Chess squares must expose accessible labels that include square id and piece information when relevant.
- Legal-target, selected, and last-move states must not rely on color alone.
- Opening-book move rows must expose move and metadata labels where relevant.
- Do not sacrifice accessibility to simplify styling.

## Testing rules

- Tests must be deterministic and runnable offline.
- Do not perform real network calls.
- Prefer resolver/unit tests for shared style, color, board, square, FEN, move, and metadata helpers.
- Test public helper behavior when it affects component output.
- Test edge cases for invalid FEN, empty boards, selected squares, legal targets, move attempts, and opening-book empty/error/loading states where applicable.
- Do not add screenshot or browser-only test requirements unless explicitly requested.

## README and examples

README changes should:

- describe `@ankhorage/zora-chess` as a standalone React Native / React Native Web package
- explain that it builds on ZORA
- avoid app-specific trainer language unless the example is explicitly generic
- avoid Studio/runtime/template-specific language
- show generic consumer usage
- keep examples runnable and concise
- update the component export list when a new public component is added

Example changes should:

- demonstrate generic chess UI usage
- avoid app-specific or generated-app assumptions
- work on mobile and web

## Changesets

If a completed task changes the published package API, behavior, or README in a release-relevant way, create or update a `.changeset/*.md` file before committing that work.

Repo-doc/tooling-only changes do not need a changeset unless they affect package release behavior.

Use patch changesets for additive components and documentation updates unless the task explicitly requires a minor or major release.

## Mandatory workflow

1. Plan first: list the exact files you will touch and why.
2. Keep changes micro-scoped: small PR-sized steps, one concern at a time.
3. Do not edit files during planning.
4. Apply changes only after the plan has been approved.
5. After edits: show `git diff --stat` and briefly explain changes.
6. Rollback rule: if a step goes sideways, revert to the last checkpoint instead of trial-and-error edits.
7. If a completed task changes the published package, create or update a `.changeset/*.md` file before committing that work.
8. After verification, commit the completed unit of work unless the user explicitly says not to.

## Current initiative

We are keeping `@ankhorage/zora-chess` as a small, standalone chess UI package.

Current public surface:

- `ChessBoard`
- `OpeningBook`
- chess-board color helpers
- opening-book color helpers
- square helpers
- lightweight board/move helpers
- metadata and registry exports

Keep future work presentational, theme-aware, cross-platform, and free of app/runtime/studio logic.
