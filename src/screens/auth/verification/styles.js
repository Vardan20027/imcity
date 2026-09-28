import { StyleSheet } from 'react-native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { COLORS } from '../../../assets/rootStyles';

const styles = StyleSheet.create({
    hiddenInput: {
      position: 'absolute',
      width: 0,
      height: 0,
      opacity: 0,
    },
    title: {
      fontSize: normalize(16),
      fontWeight: '600',
      color: COLORS.textPrimary,
      marginBottom: normalize(16),
    },

    otpRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: normalize(16),
      marginBottom: normalize(24),
    },
    otpCircle: {
      width: normalize(52),
      height: normalize(52),
      borderRadius: normalize(16),
      borderWidth: 1.5,
      borderColor: COLORS.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.background,
    },
    otpCircleFocused: {
      borderColor: COLORS.primary,
    },
    otpDotFilled: {
      width: normalize(8),
      height: normalize(8),
      borderRadius: normalize(4),
      backgroundColor: COLORS.textPrimary,
    },
    otpCursor: {
      width: 2,
      height: normalize(20),
      backgroundColor: COLORS.primary,
      borderRadius: 1,
    },

    resendRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: normalize(32),
    },
    resendText: {
      fontSize: normalize(13),
      color: COLORS.textSecondary,
    },
    resendLink: {
      fontSize: normalize(13),
      color: COLORS.primary,
      fontWeight: '500',
    },
    resendLinkDisabled: {
      color: COLORS.textSecondary,
    },

    button: {
      marginTop: 'auto',
    },
  });

export default styles;
