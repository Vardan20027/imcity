import { StyleSheet } from 'react-native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { COLORS } from '../../../assets/rootStyles';

const styles = StyleSheet.create({
    title: {
      fontSize: normalize(16),
      fontWeight: '600',
      color: COLORS.textPrimary,
      marginBottom: normalize(16),
    },
    fieldBlock: {
      marginBottom: normalize(16),
    },
    errorText: {
      fontSize: normalize(13),
      color: COLORS.pink,
      marginBottom: normalize(6),
    },
    input: {
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: normalize(16),
      paddingHorizontal: normalize(16),
      paddingVertical: normalize(14),
      fontSize: normalize(15),
      color: COLORS.textPrimary,
    },
    inputInvalid: {
      borderColor: COLORS.pink,
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
    accountRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: normalize(16),
    },
    accountHint: {
      fontSize: normalize(14),
      color: COLORS.textSecondary,
    },
    signUpLabel: {
      fontSize: normalize(14),
      fontWeight: '600',
      color: COLORS.primary,
    },
    forgotButton: {
      alignSelf: 'center',
      marginTop: normalize(16),
    },
    forgotLabel: {
      fontSize: normalize(14),
      color: COLORS.primary,
    },
  });

export default styles;
