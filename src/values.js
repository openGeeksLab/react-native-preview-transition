import {
  Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('screen');

export const cardHeigth = height / 3.3;
export const cardWidth = width;
export const screenHeight = height;
export const inputRange = [0, 1];

export const fullCardOutputRange = [height, screenHeight];
export const fullCardHeightInterpolation = { inputRange, outputRange: fullCardOutputRange };
