import { StyleSheet } from 'react-native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { COLORS } from '../../../assets/rootStyles';

const styles = StyleSheet.create({
    title: {
      fontSize: normalize(16),
      fontWeight: '600',
      color: COLORS.textPrimary,
    },
    subtitle: {
      fontSize: normalize(14),
      color: COLORS.textSecondary,
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
      minHeight: normalize(50),
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

export default styles;
