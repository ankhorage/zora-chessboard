import {
  AppBar,
  AppShell,
  Screen,
  ScreenSection,
  ZoraProvider,
  type ZoraTheme,
} from '@ankhorage/zora';
import { ChessBoard, OpeningBook, type OpeningBookMove } from '@ankhorage/zora-chess';

const chessTheme: ZoraTheme = {
  id: 'basic-chess',
  name: 'Basic chess',
  appCategory: 'games',
  primaryColor: '#2563eb',
  harmony: 'analogous',
};

const openingMoves: readonly OpeningBookMove[] = [
  {
    san: 'Nf3',
    uci: 'g1f3',
    eco: 'A04',
    name: 'Reti Opening',
    games: 12400,
    whiteWinRate: 0.38,
    drawRate: 0.34,
    blackWinRate: 0.28,
  },
  {
    san: 'c4',
    uci: 'c2c4',
    eco: 'A10',
    name: 'English Opening',
    games: 9800,
    whiteWinRate: 0.37,
    drawRate: 0.35,
    blackWinRate: 0.28,
  },
];

/***
 * Minimal chess app root.
 *
 * Use `ChessBoard` for the board surface and `OpeningBook` for binding-ready
 * move suggestions or trainer data alongside the current position.
 *
 * @usage
 * @readme
 */
export default function BasicChessApp() {
  return (
    <ZoraProvider initialMode="light" theme={chessTheme}>
      <AppShell header={<AppBar title="Chess" subtitle="Board and opening book UI" />}>
        <Screen>
          <ScreenSection title="Position" description="Render a FEN position with coordinates.">
            <ChessBoard
              fen="rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1"
              selectedSquare="g1"
              legalTargets={['f3', 'h3']}
              showCoordinates
            />
          </ScreenSection>
          <ScreenSection title="Book moves" description="Present engine or database suggestions.">
            <OpeningBook moves={openingMoves} selectedMove="Nf3" />
          </ScreenSection>
        </Screen>
      </AppShell>
    </ZoraProvider>
  );
}
