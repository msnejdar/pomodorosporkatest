import { COLORS, DARK_COLORS } from './constants';

export function getColors(darkMode: boolean) {
  return darkMode ? DARK_COLORS : COLORS;
}

export type ColorPalette = typeof COLORS;
