import React, { useMemo, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { LocationIcon } from '../home/icons';
import { EmotionButton, EmotionMarks, PageHeader, SearchField } from '../services/parts';
import { DREAM_GOAL, DREAM_VALUE, FAVORITES } from './data';
import styles from './styles';

const HEART_PATH =
  'M19.7927 0.934538C22.3067 2.35904 24.0755 5.2512 23.9975 8.62519C23.8319 15.75 13.8 21 12 21C10.2 21 0.16688 15.75 0.00248122 8.62519C-0.0755183 5.2512 1.69327 2.3602 4.20725 0.934538C6.55924 -0.396626 9.51362 -0.404793 12 1.56104C14.4864 -0.404793 17.4408 -0.397793 19.7927 0.934538Z';

const OrangeHeart = ({ size = 16 }) => (
  <Svg
    width={normalize(size)}
    height={normalize((size * 21) / 24)}
    viewBox="0 0 24 21"
    fill="none"
  >
    <Path d={HEART_PATH} fill="#FF8700" />
  </Svg>
);

const fillStyle = ratio => [styles.dreamFill, { width: `${ratio * 100}%` }];

const FavoriteCard = ({ item, onOpen, onRemove }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onOpen}>
    <View style={styles.photo}>
      {item.image ? (
        <Image source={item.image} style={styles.photoImage} resizeMode="cover" />
      ) : null}
    </View>
    <View style={styles.body}>
      <View style={styles.marksRow}>
        <EmotionMarks size={16} />
        <TouchableOpacity
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.8}
          onPress={onRemove}
        >
          <OrangeHeart />
        </TouchableOpacity>
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <View style={styles.actions}>
        <EmotionButton count={item.score} />
        <TouchableOpacity activeOpacity={0.8} onPress={onOpen}>
          <LocationIcon />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

const FavoritesScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(FAVORITES);
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return items;
    }
    return items.filter(item =>
      `${item.title} ${item.description}`.toLowerCase().includes(needle),
    );
  }, [items, query]);

  const openPlace = item => {
    navigation.navigate('Services', {
      screen: 'AttractionDetail',
      params: {
        place: {
          ...item,
          full: item.description,
        },
      },
    });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader title="Նախընտրածներ" onBack={() => navigation.goBack()} />
      {items.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyArt} />
        </View>
      ) : (
        <>
          <SearchField value={query} onChangeText={setQuery} style={styles.search} />
          <View style={styles.dream}>
            <View style={styles.dreamTrack}>
              <View style={fillStyle(DREAM_VALUE / DREAM_GOAL)} />
            </View>
            <View style={styles.dreamHeart}>
              <OrangeHeart size={24} />
            </View>
            <Text style={styles.dreamCount}>
              <Text style={styles.dreamCurrent}>{`${DREAM_VALUE} `}</Text>
              <Text style={styles.dreamRest}>{`/ ${DREAM_GOAL}`}</Text>
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.list}
          >
            {visible.length === 0 ? (
              <View style={styles.emptyInList}>
                <View style={styles.emptyArt} />
              </View>
            ) : (
              visible.map(item => (
                <FavoriteCard
                  key={item.id}
                  item={item}
                  onOpen={() => openPlace(item)}
                  onRemove={() => setItems(list => list.filter(row => row.id !== item.id))}
                />
              ))
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default FavoritesScreen;
