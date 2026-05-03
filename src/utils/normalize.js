import { Dimensions, PixelRatio } from 'react-native';

// ─── Base Design Dimensions ───────────────────────────────────────────────────
// Based on standard 390x844 design (iPhone 14 / most common Figma base)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const widthRatio = SCREEN_WIDTH / BASE_WIDTH;
const heightRatio = SCREEN_HEIGHT / BASE_HEIGHT;

// ─── Horizontal scale ─────────────────────────────────────────────────────────
// Use for: width, paddingHorizontal, marginHorizontal, borderRadius
export const w = (size) => Math.round(PixelRatio.roundToNearestPixel(size * widthRatio));

// ─── Vertical scale ───────────────────────────────────────────────────────────
// Use for: height, paddingVertical, marginVertical, top, bottom
export const h = (size) => Math.round(PixelRatio.roundToNearestPixel(size * heightRatio));

// ─── Font scale ───────────────────────────────────────────────────────────────
// Use for: fontSize, lineHeight
// Moderate factor (0.5) prevents fonts from becoming too large on tablets
export const f = (size) => {
  const scale = Math.min(widthRatio, heightRatio);
  const newSize = size + (size * scale - size) * 0.5;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// ─── Uniform scale ────────────────────────────────────────────────────────────
// Use for: icons, avatar sizes, anything that must stay square
export const s = (size) => Math.round(PixelRatio.roundToNearestPixel(size * widthRatio));

// ─── Screen dimensions (raw) ─────────────────────────────────────────────────
export const SCREEN = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};
