import { Dimensions } from 'react-native';

const BASE_WIDTH = 360;
const BASE_HEIGHT = 800;

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = BASE_WIDTH || 360;
const guidelineBaseHeight = BASE_HEIGHT || 800;

export const scale = size => (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = size =>
  (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export const normalize = (size, forHeight) => {
  return forHeight ? moderateVerticalScale(size) : moderateScale(size);
};
