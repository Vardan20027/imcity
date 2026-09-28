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
    input: {
      fontSize: normalize(14),
      borderColor: COLORS.border,
      borderWidth: 1,
      borderRadius: normalize(16),
      padding: normalize(20),
    },
    birthdate: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: normalize(14),
      borderColor: COLORS.border,
      borderWidth: 1,
      borderRadius: normalize(16),
      padding: normalize(16),
    },
    genderOptions: {
      borderColor: COLORS.border,
      borderWidth: 1,
      borderRadius: normalize(16),
      paddingHorizontal: normalize(14),
      paddingBottom: normalize(14),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: normalize(14),
    },
    label: {
      fontSize: normalize(14),
    },
    circle: {
      height: normalize(22),
      width: normalize(22),
      borderRadius: normalize(11),
      borderWidth: normalize(2),
      borderColor: COLORS.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: normalize(14),
    },
    circleChecked: { borderColor: COLORS.primary },
    innerDot: {
      height: normalize(10),
      width: normalize(10),
      borderRadius: normalize(5),
      backgroundColor: COLORS.primary,
    },
    birthdateText: {
      color: COLORS.textPrimary,
    },
    button: {
      marginTop: normalize(30),
    },
  });

export default styles;
