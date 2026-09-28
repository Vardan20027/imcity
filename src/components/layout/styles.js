import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/rootStyles';
import { normalize } from '../../assets/deviceInfo/normalize';

const styles = StyleSheet.create({
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
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: normalize(180),
    },
    logo: {
      width: normalize(184),
      height: normalize(211),
      resizeMode: 'contain',
    },
    body: {
      flexGrow: 1,
      paddingHorizontal: normalize(24),
      paddingTop: normalize(32),
      paddingBottom: normalize(24),
      justifyContent: 'space-between',
    },
  });

export default styles;
