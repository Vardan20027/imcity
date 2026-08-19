import { StyleSheet } from 'react-native';
import { normalize} from "../../assets/deviceInfo/normalize";

const Styles = theme => {
  return StyleSheet.create({
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
      fontSize: normalize(15),
      color: '#000',
    },
    progressRow: {
      flexDirection: 'row',
    },
    segment: {
      flex: 1,
      height: normalize(6),
      borderRadius: normalize(3),
    },
    segmentActive: {
      backgroundColor: '#FF7A02',
    },
    segmentInactive: {
      backgroundColor: '#E5E5EA',
    },
    segmentSpacing: {
      marginRight: normalize(6),
    },
  });
}

export { Styles };