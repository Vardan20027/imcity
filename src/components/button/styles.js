import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/rootStyles';

const styles = StyleSheet.create({
    button: {
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      paddingVertical: 15,
      alignItems: 'center',
    },
    buttonDisabled: {
      backgroundColor: COLORS.buttonDisabled,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.white,
    },
    labelDisabled: {
      color: COLORS.buttonDisabledText,
    },
  });

export default styles;
