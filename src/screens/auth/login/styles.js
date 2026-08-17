import { StyleSheet } from 'react-native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { COLORS } from '../../../assets/rootStyles';

const Styles = theme => {
  return StyleSheet.create({
    title: {
      fontSize: normalize(16),
      fontWeight: '600',
      color: COLORS.textPrimary,
      marginBottom: normalize(16),
    },
    phoneRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: normalize(10),
      marginBottom: normalize(32),
    },
    codePrefix: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: normalize(13),
      paddingHorizontal: normalize(12),
      gap: normalize(6),
    },
    flag: {
      width: normalize(20),
      height: normalize(14),
      resizeMode: 'cover',
      borderRadius: normalize(2),
    },
    dialCode: {
      fontSize: normalize(15),
      color: COLORS.textPrimary,
    },
    separator: {
      width: 1,
      height: normalize(20),
      backgroundColor: COLORS.border,
    },
    input: {
      flex: 1,
      paddingHorizontal: normalize(16),
      paddingVertical: normalize(13),
      fontSize: normalize(15),
      color: COLORS.textPrimary,
    },
    dividerRow: {
      marginBottom: normalize(16),
      flexDirection: 'row',
      alignItems: 'center',
      gap: normalize(10),
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
    googleLabel: {
      fontSize: normalize(15),
      fontWeight: '500',
      color: COLORS.textPrimary,
    },
  });
};

export { Styles };
