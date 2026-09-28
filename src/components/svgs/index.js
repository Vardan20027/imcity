import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ICONS } from './hook';

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
  const Icon = ICONS?.[name];
  if (!Icon) {
    return null;
  }

  const node = (
    <Icon
      size={size}
      width={width}
      height={height}
      color={color}
      backgroundColor={backgroundColor}
    />
  );

  if (!onPress) {
    if (!style) {
      return node;
    }
    return (
      <View style={style} pointerEvents="none">
        {node}
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity ?? 0.7}
      delayPressIn={0}
      style={style}
    >
      {node}
    </TouchableOpacity>
  );
};

export default MIcon;
