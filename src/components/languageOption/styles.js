import { StyleSheet } from 'react-native';
import { normalize } from '../../assets/deviceInfo/normalize';
import { COLORS } from '../../assets/rootStyles';

const Styles = theme => {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: normalize(14),
      paddingHorizontal: normalize(20),
      borderBottomWidth: normalize(1),
      borderBottomColor: COLORS.border,
    },
    buttonLast: {
      borderBottomWidth: normalize(0),
    },
    label: {
      fontSize: normalize(16),
      fontWeight: '400',
      color: COLORS.textPrimary,
      textAlign: 'center',
    },
    labelSelected: {
      color: COLORS.accent,
      fontWeight: '500',
    },
    checkmark: {
      position: 'absolute',
      right: normalize(20),
      fontSize: normalize(16),
      color: COLORS.accent,
      fontWeight: '600',
    },
  });
};

export { Styles };
