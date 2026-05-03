import React from 'react';
import { ICONS } from './hook';
import { TouchableOpacity } from 'react-native';

const MIcon = ({
  name,
  size,
  width,
  height,
  color,
  backgroundColor,
  onPress,
  disabled,
  activeOpacity,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={style}
    >
      {ICONS?.[name]
        ? ICONS?.[name]({ size, width, height, color, backgroundColor })
        : null}
    </TouchableOpacity>
  );
};

export default MIcon;
