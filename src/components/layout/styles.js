import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/rootStyles';
import { normalize } from '../../assets/deviceInfo/normalize';

const Styles = theme => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    flex: {
      flex: 1,
    },
    container: {
      flex: 1,
    },

    heroCard: {
      width: '100%',
      backgroundColor: COLORS.primary,
      borderBottomLeftRadius: normalize(32),
      borderBottomRightRadius: normalize(32),
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: normalize(80),
    },
    logoBox: {
      width: normalize(72),
      height: normalize(72),
      borderRadius: normalize(18),
      backgroundColor: 'rgba(255,255,255,0.25)',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: normalize(8),
    },
    logoI: {
      fontSize: normalize(28),
      fontWeight: '700',
      color: COLORS.white,
      marginRight: normalize(4),
    },
    logoDotsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: normalize(22),
      gap: normalize(4),
    },
    logoDot: {
      width: normalize(8),
      height: normalize(8),
      borderRadius: normalize(4),
      backgroundColor: COLORS.white,
    },

    body: {
      flexGrow: 1,
      paddingHorizontal: normalize(24),
      paddingTop: normalize(32),
      paddingBottom: normalize(24),
      justifyContent: 'space-between',
    },
  });
};

export { Styles };
