import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Styles } from './styles';
import MIcon from "../svgs";
import {ICON_NAMES} from "../svgs/icon_names";

const styles = Styles();

const LanguageOption = ({ label, selected, onPress, isLast = false }) => (
  <TouchableOpacity
    style={[
      styles.button,
      selected && styles.buttonSelected,
    ]}
    onPress={onPress}
    activeOpacity={0.6}
    accessibilityRole="radio"
    accessibilityState={{ selected }}
    accessibilityLabel={label}
  >
    <Text style={[styles.label, selected && styles.labelSelected]}>
      {label}
    </Text>
    {selected && <MIcon name={ICON_NAMES.CHECKMARK} style={styles.checkmark}/>}
  </TouchableOpacity>
);
export default LanguageOption;
