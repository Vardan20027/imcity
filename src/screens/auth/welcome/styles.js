import { StyleSheet } from 'react-native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { COLORS } from '../../../assets/rootStyles';

const Styles = theme => {
  return StyleSheet.create({
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
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: normalize(12),
      overflow: 'hidden',
    },
  });
};

export { Styles };
