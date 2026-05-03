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
    subtitle: {
      fontSize: normalize(14),
      color: COLORS.textSecondary,
      textAlign: 'center',
      lineHeight: normalize(20),
    },
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    text: {
      color: COLORS.primaryGray,
      paddingHorizontal: normalize(10),
    },
    item: {
      width: '48%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: normalize(12),
      marginBottom: normalize(10),
      borderRadius: normalize(20),
      borderWidth: 1,
      borderColor: COLORS.border,
    },
    button: {
      marginTop: normalize(60),
    },
  });
};

export { Styles };
