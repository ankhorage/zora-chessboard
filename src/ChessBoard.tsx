import { useZoraTheme } from '@ankhorage/zora';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { createChessBoardColorScheme } from './colors';
import { getLegalTargets, readChessPieces, tryMove } from './engine';
import { createBoardSquares, getSquareFile, getSquareRank, isLightSquare } from './squares';
import type {
  ChessBoardProps,
  ChessMoveAttempt,
  ChessPieceCode,
  ChessPieceRenderContext,
  ChessSquareId,
} from './types';

const unicodePieces: Readonly<Record<string, string>> = {
  B: '♗',
  K: '♔',
  N: '♘',
  P: '♙',
  Q: '♕',
  R: '♖',
  b: '♝',
  k: '♚',
  n: '♞',
  p: '♟',
  q: '♛',
  r: '♜',
};

function isDarkPiece(piece: ChessPieceCode): boolean {
  return piece === piece.toLowerCase();
}

function DefaultPiece({ color, piece }: ChessPieceRenderContext) {
  return (
    <Text selectable={false} style={[styles.piece, { color }]}>
      {unicodePieces[piece] ?? piece}
    </Text>
  );
}

/***
 * Theme-aware chessboard surface for FEN-backed positions and move attempts.
 *
 * Use `ChessBoard` to render a position, highlight selected/legal/last-move
 * squares, and wire square presses into trainer or game-state logic.
 *
 * @readme
 * @example Interactive board
 * ```tsx
 * <ChessBoard
 *   fen="rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1"
 *   selectedSquare="g1"
 *   legalTargets={["f3", "h3"]}
 *   showCoordinates
 * />
 * ```
 */
export function ChessBoard({
  fen,
  orientation = 'white',
  selectedSquare = null,
  legalTargets,
  lastMove = null,
  disabled = false,
  showCoordinates = false,
  validateMoves = true,
  colorScheme: colorOverrides,
  onSquarePress,
  onMoveAttempt,
  onLegalMove,
  onInvalidMove,
  renderPiece,
  testID,
}: ChessBoardProps) {
  const { theme } = useZoraTheme();
  const colors = React.useMemo(
    () => createChessBoardColorScheme(theme, colorOverrides),
    [colorOverrides, theme],
  );
  const squares = React.useMemo(() => createBoardSquares(orientation), [orientation]);
  const pieces = React.useMemo(() => readChessPieces(fen), [fen]);
  const resolvedLegalTargets = React.useMemo(() => {
    if (legalTargets !== undefined) {
      return new Set(legalTargets);
    }

    if (!selectedSquare) {
      return new Set<ChessSquareId>();
    }

    return new Set(getLegalTargets(fen, selectedSquare));
  }, [fen, legalTargets, selectedSquare]);

  const handleSquarePress = (square: ChessSquareId) => {
    if (disabled) {
      return;
    }

    onSquarePress?.(square);

    if (!selectedSquare || selectedSquare === square) {
      return;
    }

    const attempt: ChessMoveAttempt = {
      from: selectedSquare,
      to: square,
    };

    onMoveAttempt?.(attempt);

    if (!validateMoves) {
      return;
    }

    const result = tryMove(fen, attempt);
    if (result) {
      onLegalMove?.(result);
      return;
    }

    onInvalidMove?.(attempt);
  };

  return (
    <View
      style={[
        styles.board,
        {
          borderColor: colors.border,
          opacity: disabled ? 0.56 : 1,
        },
      ]}
      testID={testID}
    >
      {squares.map((square) => {
        const piece = pieces.get(square);
        const light = isLightSquare(square);
        const selected = selectedSquare === square;
        const legalTarget = resolvedLegalTargets.has(square);
        const lastMoveFrom = lastMove?.from === square;
        const lastMoveTo = lastMove?.to === square;
        const backgroundColor = selected
          ? colors.selectedSquare
          : legalTarget
            ? colors.legalTarget
            : lastMoveFrom
              ? colors.lastMoveFrom
              : lastMoveTo
                ? colors.lastMoveTo
                : light
                  ? colors.lightSquare
                  : colors.darkSquare;
        const labelColor = light ? colors.lightSquareText : colors.darkSquareText;
        const pieceColor = piece
          ? isDarkPiece(piece.piece)
            ? colors.darkPiece
            : colors.lightPiece
          : colors.lightPiece;

        return (
          <Pressable
            accessibilityRole="button"
            disabled={disabled}
            key={square}
            onPress={() => handleSquarePress(square)}
            style={[styles.square, { backgroundColor }]}
            testID={testID ? `${testID}-square-${square}` : undefined}
          >
            {showCoordinates ? (
              <Text selectable={false} style={[styles.coordinate, { color: labelColor }]}>
                {getSquareFile(square)}
                {getSquareRank(square)}
              </Text>
            ) : null}
            {piece ? (
              <View pointerEvents="none" style={styles.pieceContainer}>
                {renderPiece ? (
                  renderPiece({ color: pieceColor, piece: piece.piece, square })
                ) : (
                  <DefaultPiece color={pieceColor} piece={piece.piece} square={square} />
                )}
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    width: '100%',
  },
  coordinate: {
    fontSize: 9,
    fontWeight: '600',
    left: 3,
    opacity: 0.72,
    position: 'absolute',
    top: 2,
    zIndex: 2,
  },
  piece: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 38,
  },
  pieceContainer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  square: {
    aspectRatio: 1,
    position: 'relative',
    width: '12.5%',
  },
});
