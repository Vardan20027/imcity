import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Styles } from './styles';
import AuthLayout from '../../../components/layout/AuthLayout';
import SearchBar from '../../../components/searchBar';
import { FRIENDS } from './data';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import { normalize } from '../../../assets/deviceInfo/normalize';
import Button from '../../../components/button';


const AddFriend = ({navigation}) => {
  const [search, setSearch] = useState('');
  const handleContinue = () => {

  };
  const styles = Styles();
  return (
    <AuthLayout showLogo={false}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <MIcon
            name={ICON_NAMES.ARROWS.BACK}
            onPress={() => navigation.goBack()}
            style={styles.back}
          />
          <Text style={styles.title}>Ծանուցումներ</Text>
        </View>
        <SearchBar value={search} onChange={text => setSearch(text)} />
        {FRIENDS.map((friend, index) => {
          return (
            <View key={friend.id} style={styles.friend_container}>
              <View style={styles.friend_info_container}>
                <Image source={friend.image} style={styles.image} />
                <View style={{ marginLeft: normalize(10) }}>
                  <View style={styles.emotions}>
                    <MIcon
                      name={friend.emotions[0]}
                      style={{ paddingRight: normalize(5) }}
                      color={'#6EAA4E'}
                    />
                    <MIcon
                      name={friend.emotions[1]}
                      style={{ paddingRight: normalize(5) }}
                      color={'#FF8700'}
                    />
                    <MIcon name={friend.emotions[2]} color={'#F4466E'} />
                  </View>
                  <Text style={styles.name}>{friend.name}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.plus_container}>
                <MIcon name={ICON_NAMES.PLUS} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <Button
        label="Շարունակել"
        onPress={handleContinue}
        style={styles.button}
      />
    </AuthLayout>
  );
}

export default AddFriend;