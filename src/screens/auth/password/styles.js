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
    marginBottom: normalize(16),
  },
  fieldBlock: {
    marginBottom: normalize(16),
  },
  label: {
    fontSize: normalize(12),
    color: COLORS.textSecondary,
    marginBottom: normalize(6),
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
});

export default styles;
