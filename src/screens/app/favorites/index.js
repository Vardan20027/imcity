import React, { useMemo, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { LocationIcon } from '../home/icons';
import { EmotionButton, EmotionMarks, PageHeader, SearchField } from '../services/parts';
import { DREAM_GOAL } from './data';
import { removeFavorite, useFavorites } from './store';
import { useT } from '../../../locales/useT';
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

const EmptyMark = () => (
  <Svg width={normalize(78)} height={normalize(72)} viewBox="0 0 78 72" fill="none">
    <Path
      d="M28 8.5c.4 1.6-.2 2.4-1.2 2.8M22.5 12.2c1.3.2 2 .9 1.8 2"
      stroke="#C5C5C5"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <Path
      d="M39.2 22.2c-1.7-3.6-5-5.7-8.8-5.7-5.6 0-9.6 4.3-9.6 9.6 0 8.4 11.2 14.8 18.4 18.4 7.2-3.6 18.4-10 18.4-18.4 0-5.3-4-9.6-9.6-9.6-3.8 0-7.1 2.1-8.8 5.7Z"
      stroke="#C5C5C5"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Path
      d="M44.5 41.5c1.8 2.2 4.8 5.4 9.2 7.2 3.2 1.3 5.6 3.4 6.8 6.2.6 1.4.4 2.6-.6 3.4-1.6 1.3-4.2.6-6.4-1.2-2.4-2-3.2-4.2-3.4-5.6"
      stroke="#C5C5C5"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M49.2 48.2c2.4 1.2 6.6 2.2 10.4 1.2M46.8 52.4c2.8.8 6.8.8 10.2-.6"
      stroke="#C5C5C5"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

const EmptyFavorites = () => {
  const t = useT();
  return (
    <View style={styles.empty}>
      <EmptyMark />
      <Text style={styles.emptyTitle}>{t('Նախընտրածներ դեռ չկան')}</Text>
      <Text style={styles.emptyText}>
        {t('Պահպանեք ձեր սիրելի վայրերը, որպեսզի հետո գտնեք դրանք')}
      </Text>
    </View>
  );
};

const FavoriteCard = ({ item, onOpen, onRemove }) => {
  const t = useT();
  return (
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
        <Text style={styles.title}>{t(item.title)}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {t(item.description)}
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
};

const FavoritesScreen = ({ navigation }) => {
  const t = useT();
  const [query, setQuery] = useState('');
  const [trackWidth, setTrackWidth] = useState(0);
  const [markerWidth, setMarkerWidth] = useState(0);
  const items = useFavorites();
  const progress = Math.min(items.length, DREAM_GOAL) / DREAM_GOAL;
  const markerLeft = Math.min(
    Math.max(trackWidth * progress - markerWidth / 2, 0),
    Math.max(trackWidth - markerWidth, 0),
  );
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return items;
    }
    return items.filter(item =>
      `${t(item.title)} ${t(item.description)}`.toLowerCase().includes(needle),
    );
  }, [items, query, t]);

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
        <EmptyFavorites />
      ) : (
        <>
          <SearchField value={query} onChangeText={setQuery} style={styles.search} />
          <View
            style={styles.dream}
            onLayout={event => setTrackWidth(event.nativeEvent.layout.width)}
          >
            <View style={styles.dreamTrack}>
              <View style={fillStyle(progress)} />
            </View>
            <View
              style={[styles.dreamMarker, { left: markerLeft }]}
              onLayout={event => setMarkerWidth(event.nativeEvent.layout.width)}
            >
              <OrangeHeart size={24} />
              <Text style={styles.dreamCount}>
                <Text style={styles.dreamCurrent}>{`${items.length} `}</Text>
                <Text style={styles.dreamRest}>{`/ ${DREAM_GOAL}`}</Text>
              </Text>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.list}
          >
            {visible.length === 0 ? (
              <EmptyFavorites />
            ) : (
              visible.map(item => (
                <FavoriteCard
                  key={item.id}
                  item={item}
                  onOpen={() => openPlace(item)}
                  onRemove={() => removeFavorite(item.id)}
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
