import { StyleSheet } from 'react-native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { COLORS } from '../../../assets/rootStyles';

const styles = StyleSheet.create({
    title: {
      fontSize: normalize(16),
      fontWeight: '700',
      color: COLORS.black[50],
      marginBottom: normalize(32),
    },
    field: {
      height: normalize(56),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: normalize(16),
      borderWidth: 1,
      borderColor: '#898989',
      borderRadius: normalize(16),
      backgroundColor: COLORS.background,
    },
    fieldValue: {
      fontSize: normalize(14),
      fontWeight: '500',
      color: COLORS.black[50],
    },
    fieldPlaceholder: {
      fontSize: normalize(14),
      fontWeight: '500',
      color: '#7B7B7B',
    },
    chevronOpen: {
      transform: [{ rotate: '180deg' }],
    },
    menu: {
      marginTop: normalize(8),
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: normalize(16),
      backgroundColor: COLORS.background,
      overflow: 'hidden',
    },
    option: {
      paddingVertical: normalize(14),
      paddingHorizontal: normalize(16),
    },
    optionSelected: {
      backgroundColor: '#FFF5E9',
    },
    optionDivider: {
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    optionLabel: {
      fontSize: normalize(14),
      fontWeight: '500',
      color: COLORS.black[50],
    },
    optionLabelSelected: {
      color: COLORS.primary,
    },
    button: {
      marginTop: normalize(48),
    },
  });

export default styles;
