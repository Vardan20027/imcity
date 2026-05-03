import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Styles } from './styles';

const styles = Styles();

const Button = ({ label, onPress, disabled = false, style, labelStyle }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.buttonDisabled, style]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.85}
  >
    <Text style={[styles.label, disabled && styles.labelDisabled, labelStyle]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default Button;
