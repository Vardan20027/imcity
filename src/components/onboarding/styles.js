import { StyleSheet } from 'react-native';
import { normalize} from "../../assets/deviceInfo/normalize";
import { COLORS } from '../../assets/rootStyles';

const styles = StyleSheet.create({
    container: {
      paddingBottom: normalize(32),
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: normalize(16),
    },
    back: {
      paddingHorizontal: normalize(5),
      position: 'absolute',
      left: 0
    },
    stepText: {
      fontSize: normalize(16),
      fontWeight: '700',
      color: '#686868',
    },
    progressRow: {
      flexDirection: 'row',
      gap: normalize(8),
    },
    segment: {
      flex: 1,
      height: normalize(6),
      borderRadius: normalize(999),
    },
    segmentActive: {
      backgroundColor: '#FF9721',
    },
    segmentInactive: {
      backgroundColor: COLORS.gray,
    },
  });

export default styles;