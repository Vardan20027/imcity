import { StyleSheet } from 'react-native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { COLORS } from '../../../assets/rootStyles';

const styles = StyleSheet.create({
  title: {
    fontSize: normalize(16),
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: normalize(8),
  },
  hint: {
    fontSize: normalize(14),
    color: COLORS.textSecondary,
    marginBottom: normalize(20),
  },
  label: {
    fontSize: normalize(14),
    color: COLORS.textPrimary,
    marginBottom: normalize(8),
    marginTop: normalize(12),
  },
  input: {
    fontSize: normalize(14),
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: normalize(16),
    padding: normalize(16),
    color: COLORS.textPrimary,
  },
  button: {
    marginTop: normalize(30),
  },
});

export default styles;
