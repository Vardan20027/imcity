import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Styles } from './styles';

const styles = Styles();

const LanguageOption = ({ label, selected, onPress, isLast = false }) => (
  <TouchableOpacity
    style={[styles.button, isLast && styles.buttonLast]}
    onPress={onPress}
    activeOpacity={0.6}
    accessibilityRole="radio"
    accessibilityState={{ selected }}
    accessibilityLabel={label}
  >
    <Text style={[styles.label, selected && styles.labelSelected]}>
      {label}
    </Text>
    {selected && <Text style={styles.checkmark}>✓</Text>}
  </TouchableOpacity>
);

export default LanguageOption;
