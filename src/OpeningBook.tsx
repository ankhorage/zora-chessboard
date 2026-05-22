import { useZoraTheme } from '@ankhorage/zora';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { OpeningBookColorOverrides } from './OpeningBookColors';
import { createOpeningBookColorScheme } from './OpeningBookColors';

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

export interface OpeningBookProps {
  readonly moves?: readonly OpeningBookMove[];
  readonly title?: string;
  readonly loading?: boolean;
  readonly errorText?: string;
  readonly emptyText?: string;
  readonly selectedMove?: string | null;
  readonly colorScheme?: OpeningBookColorOverrides;
  readonly onMovePress?: (move: OpeningBookMove) => void;
  readonly testID?: string;
}

export function OpeningBook({
  moves = [],
  title = 'Opening book',
  loading = false,
  errorText,
  emptyText = 'No book moves for this position.',
  selectedMove = null,
  colorScheme: colorOverrides,
  onMovePress,
  testID,
}: OpeningBookProps) {
  const { theme } = useZoraTheme();
  const colors = React.useMemo(
    () => createOpeningBookColorScheme(theme, colorOverrides),
    [colorOverrides, theme],
  );
  const stateText = loading ? 'Loading opening moves…' : (errorText ?? emptyText);
  const showState = loading || errorText !== undefined || moves.length === 0;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
      testID={testID}
    >
      <Text selectable={false} style={[styles.title, { color: colors.titleText }]}>
        {title}
      </Text>
      {showState ? (
        <Text selectable={false} style={[styles.stateText, { color: colors.secondaryText }]}>
          {stateText}
        </Text>
      ) : (
        <View style={styles.moves}>
          {moves.map((move) => {
            const selected = isSelectedOpeningBookMove(move, selectedMove);
            const disabled = onMovePress === undefined;
            const stats = formatOpeningBookMoveStats(move);

            return (
              <Pressable
                accessibilityRole="button"
                disabled={disabled}
                key={createOpeningBookMoveKey(move)}
                onPress={() => onMovePress?.(move)}
                style={[
                  styles.moveRow,
                  {
                    backgroundColor: selected ? colors.selectedSurface : colors.surfaceHover,
                    borderColor: colors.border,
                  },
                ]}
                testID={testID ? `${testID}-move-${move.san}` : undefined}
              >
                <View style={styles.moveMain}>
                  <Text selectable={false} style={[styles.moveSan, { color: colors.primaryText }]}>
                    {move.san}
                  </Text>
                  <Text
                    selectable={false}
                    style={[styles.moveMeta, { color: colors.secondaryText }]}
                  >
                    {formatOpeningBookMoveMeta(move)}
                  </Text>
                </View>
                {stats ? (
                  <View style={[styles.metricBadge, { backgroundColor: colors.metricSurface }]}>
                    <Text
                      selectable={false}
                      style={[styles.metricText, { color: colors.secondaryText }]}
                    >
                      {stats}
                    </Text>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

function createOpeningBookMoveKey(move: OpeningBookMove): string {
  return move.uci ?? move.fen ?? move.san;
}

function isSelectedOpeningBookMove(move: OpeningBookMove, selectedMove: string | null): boolean {
  if (selectedMove === null) return false;
  return move.san === selectedMove || move.uci === selectedMove || move.fen === selectedMove;
}

function formatOpeningBookMoveMeta(move: OpeningBookMove): string {
  const details = [
    move.eco,
    move.name,
    move.games === undefined ? undefined : `${move.games} games`,
  ];
  const formatted = details.filter(isString);

  return formatted.length > 0 ? formatted.join(' · ') : 'Book move';
}

function formatOpeningBookMoveStats(move: OpeningBookMove): string | null {
  const stats = [
    formatOpeningBookRate('W', move.whiteWinRate),
    formatOpeningBookRate('D', move.drawRate),
    formatOpeningBookRate('B', move.blackWinRate),
  ].filter(isString);

  return stats.length > 0 ? stats.join(' ') : null;
}

function formatOpeningBookRate(label: string, value: number | undefined): string | undefined {
  if (value === undefined || !Number.isFinite(value)) return undefined;
  const percentage = value <= 1 ? value * 100 : value;
  return `${label} ${Math.round(percentage)}%`;
}

function isString(value: string | undefined): value is string {
  return typeof value === 'string' && value.length > 0;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 10,
    padding: 12,
  },
  metricBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  metricText: {
    fontSize: 11,
    fontWeight: '600',
  },
  moveMain: {
    flex: 1,
    gap: 2,
  },
  moveMeta: {
    fontSize: 12,
    lineHeight: 16,
  },
  moveRow: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  moveSan: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  moves: {
    gap: 8,
  },
  stateText: {
    fontSize: 13,
    lineHeight: 18,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
});
