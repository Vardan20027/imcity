import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/rootStyles';
import { normalize } from '../../assets/deviceInfo/normalize';

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    sheet: {
      backgroundColor: COLORS.background || '#FFFFFF',
      borderTopLeftRadius: normalize(20),
      borderTopRightRadius: normalize(20),
      paddingHorizontal: normalize(20),
      paddingTop: normalize(10),
      paddingBottom: normalize(24),
    },
    handle: {
      alignSelf: 'center',
      width: normalize(40),
      height: normalize(4),
      borderRadius: normalize(2),
      backgroundColor: COLORS.border || '#D9D9D9',
      marginBottom: normalize(16),
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: normalize(12),
      marginBottom: normalize(12),
    },
    dropdown: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: normalize(8),
      paddingHorizontal: normalize(14),
      borderRadius: normalize(10),
      borderWidth: 1,
      borderColor: COLORS.border || '#E0E0E0',
    },
    dropdownText: {
      fontSize: normalize(14),
      fontWeight: '600',
      color: COLORS.textPrimary,
      marginRight: normalize(10),
    },
    pickerList: {
      maxHeight: normalize(220),
      marginBottom: normalize(12),
    },
    pickerItem: {
      paddingVertical: normalize(12),
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border || '#F0F0F0',
    },
    pickerItemText: {
      fontSize: normalize(15),
      color: COLORS.textPrimary,
      textAlign: 'center',
    },
    weekRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: normalize(8),
    },
    weekdayText: {
      width: normalize(32),
      textAlign: 'center',
      fontSize: normalize(12),
      color: COLORS.textSecondary,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dayCell: {
      width: `${100 / 7}%`,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: normalize(4),
    },
    dayCellSelected: {
      backgroundColor: COLORS.primary,
      borderRadius: normalize(16),
    },
    dayText: {
      fontSize: normalize(14),
      color: COLORS.textPrimary,
    },
    dayTextMuted: {
      color: COLORS.textSecondary,
      opacity: 0.4,
    },
    dayTextSelected: {
      color: COLORS.white || '#FFFFFF',
      fontWeight: '600',
    },
    footerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: normalize(16),
    },
    footerActionText: {
      fontSize: normalize(14),
      color: COLORS.textSecondary,
    },
    footerConfirmText: {
      fontSize: normalize(14),
      fontWeight: '700',
      color: COLORS.primary,
    },
    footerConfirmDisabled: {
      opacity: 0.4,
    },
  });

export default styles;