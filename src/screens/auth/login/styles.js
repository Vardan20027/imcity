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
      marginBottom: normalize(16),
    },
    input: {
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: normalize(10),
      paddingHorizontal: normalize(16),
      paddingVertical: normalize(13),
      fontSize: normalize(15),
      color: COLORS.textPrimary,
    },
    button: {
      marginBottom: normalize(40),
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: normalize(10),
      marginTop: normalize(80),
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: COLORS.border,
    },
    dividerLabel: {
      fontSize: normalize(13),
      color: COLORS.textSecondary,
    },
    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: normalize(10),
      paddingVertical: normalize(13),
      gap: normalize(10),
    },
    googleIconText: {
      fontSize: normalize(12),
      fontWeight: '700',
      color: COLORS.white,
    },
    googleLabel: {
      fontSize: normalize(15),
      fontWeight: '500',
      color: COLORS.textPrimary,
    },
  });
};

export { Styles };
