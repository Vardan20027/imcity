import { StyleSheet } from 'react-native';
import { normalize } from '../../assets/deviceInfo/normalize';
import { COLORS } from '../../assets/rootStyles';

const Styles = theme => {
  return StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: normalize(14),
      paddingHorizontal: normalize(20),
      backgroundColor: 'transparent',
      borderColor: COLORS.border,
      borderRadius: normalize(16),
      borderWidth: normalize(1),
      marginVertical: normalize(10),
    },
    buttonSelected: {
      backgroundColor: COLORS.accentLight,
      borderColor: COLORS.accent,
    },
    label: {
      flex: 1,
      textAlign: 'center',
      fontSize: normalize(16),
      fontWeight: '400',
      color: COLORS.textPrimary,
    },
    labelSelected: {
      color: COLORS.accent,
      fontWeight: '500',
    },
    checkmark: {
      position: 'absolute',
      right: normalize(80),
    },
  });
};

export { Styles };
