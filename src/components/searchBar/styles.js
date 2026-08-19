import { StyleSheet } from 'react-native';
import { normalize } from '../../assets/deviceInfo/normalize';

const Styles = theme => {
  return StyleSheet.create({
    container: {
      paddingVertical: normalize(16),
      backgroundColor: '#FFFFFF',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F9F9F9',
      borderWidth: normalize(1),
      borderColor: '#E5E5E5',
      height: normalize(48),
      borderRadius: normalize(16),
      paddingHorizontal: normalize(16),
    },
    search: {
      marginRight: normalize(10),
    },
    input: {
      flex: 1,
      height: '100%',
      color: '#000000',
      fontSize: 16,
    },
  });
}

export {Styles};