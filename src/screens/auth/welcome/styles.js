import { StyleSheet } from 'react-native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { COLORS } from '../../../assets/rootStyles';

const styles = StyleSheet.create({

    titleSection: {
      alignItems: 'center',
      gap: normalize(8),
      paddingTop: normalize(24),
    },
    title: {
      fontSize: normalize(20),
      fontWeight: '600',
      color: COLORS.textPrimary,
      textAlign: 'center',
    },
    titleBrand: {
      color: COLORS.primary,
      fontWeight: '700',
    },
    subtitle: {
      marginTop: normalize(20),
      fontSize: normalize(14),
      color: COLORS.textSecondary,
      textAlign: 'center',
      lineHeight: normalize(20),
    },

    languageList: {
      marginBottom: normalize(40),
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: normalize(14),
      paddingHorizontal: normalize(20),
      borderRadius: normalize(10),
      borderWidth: normalize(1),
      borderColor: COLORS.border,
      marginBottom: normalize(12),
    },
    buttonSelected: {
      borderColor: COLORS.accentBorder,
      backgroundColor: COLORS.accentLight,
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

export default styles;
