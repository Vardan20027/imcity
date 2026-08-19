import { StyleSheet } from 'react-native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { COLORS } from '../../../assets/rootStyles';

const Styles = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: normalize(10),
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: normalize(16),
    },
    back: {
      position: 'absolute',
      left: 0,
    },
    title: {
      fontSize: normalize(16),
      color: COLORS.black,
      fontWeight: '600',
    },
    image: {
      maxWidth: normalize(48),
      maxHeight: normalize(48),
      borderRadius: normalize(24),
    },
    friend_container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: normalize(24),
    },
    friend_info_container: {
      flexDirection: 'row',
    },
    emotions: {
      flexDirection: 'row',
      marginBottom: normalize(8),
    },
    plus_container: {
      width: normalize(32),
      height: normalize(32),
      backgroundColor: COLORS.buttonDisabled,
      borderRadius: normalize(4),
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      fontSize: normalize(14),
      fontWeight: '500',
    },
  });
}

export {Styles};
