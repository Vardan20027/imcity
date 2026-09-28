import React from 'react';
import { TextInput, View } from 'react-native';
import MIcon from '../svgs';
import { ICON_NAMES } from '../svgs/icon_names';
import styles from './styles';

const SearchBar = ({value, onChange}) => {

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MIcon name={ICON_NAMES.SEARCH} style={styles.search} />
        <TextInput style={styles.input} value={value} onChangeText={onChange} autoCapitalize="none" autoCorrect={false} />
      </View>
    </View>
  )
}

export default SearchBar;