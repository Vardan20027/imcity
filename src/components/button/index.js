import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { useT } from '../../locales/useT';


const Button = ({ label, onPress, disabled = false, style, labelStyle }) => {
  const t = useT();
  return (
  <TouchableOpacity
    style={[styles.button, disabled && styles.buttonDisabled, style]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.85}
  >
    <Text style={[styles.label, disabled && styles.labelDisabled, labelStyle]}>
      {t(label)}
    </Text>
  </TouchableOpacity>
  );
};

export default Button;
