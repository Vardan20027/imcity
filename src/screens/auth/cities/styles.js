import { StyleSheet } from 'react-native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { COLORS } from '../../../assets/rootStyles';

const Styles = theme => {
  return StyleSheet.create({
    title: {
      textAlign: 'center',
      fontSize: normalize(22),
      fontWeight: '600',
      color: COLORS.textPrimary,
    },
    cityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: normalize(14),
      paddingHorizontal: normalize(20),
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: normalize(12),
    },
    cityRowSelected: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: normalize(14),
      paddingHorizontal: normalize(20),
      borderWidth: 2,
      borderColor: COLORS.primary,
      backgroundColor: '#FFF5E9',
      borderRadius: normalize(12),
    },
    cityLabel: {
      fontSize: normalize(16),
      fontWeight: '400',
      color: COLORS.textPrimary,
      textAlign: 'center',
    },
    cityLabelSelected: {
      color: COLORS.accent,
      fontWeight: '500',
    },
    checkmark: {
      position: 'absolute',
      left: normalize(20),
      fontSize: normalize(16),
      color: COLORS.accent,
      fontWeight: '600',
    },
    button: {
      marginTop: normalize(30),
    },
  });
};

export { Styles };
