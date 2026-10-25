import React, { useMemo, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FavoriteIcon } from '../home/icons';
import {
  EmotionButton,
  EmotionFilters,
  EmotionMarks,
  PageHeader,
  SearchField,
  ServiceIcon,
  useEmotionFilter,
} from './parts';
import { GRID_BY_KEY, HOTELS } from './data';
import { openBusiness } from './attractions';
import styles from './styles';

const PlaceCard = ({ item, onPress }) => {
  const [saved, setSaved] = useState(false);
  return (
    <TouchableOpacity style={styles.placeCard} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.placeImage}>
        <Image source={item.image} style={styles.attractionImageFill} resizeMode="cover" />
        <TouchableOpacity
          style={[styles.favorite, saved && styles.chipPressed]}
          activeOpacity={0.8}
          onPress={() => setSaved(v => !v)}
        >
          <FavoriteIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.placeMeta}>
        <EmotionMarks size={12} />
        <EmotionButton compact />
      </View>
      <View style={styles.placeAuthor}>
        <Image source={item.logo} style={styles.placeLogo} />
        <Text style={styles.placeName} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const PlaceGridScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const title = route.params?.title || 'Հյուրանոցներ';
  const itemsSource = GRID_BY_KEY[route.params?.key] || HOTELS;
  const [query, setQuery] = useState('');
  const { selectedIds, toggle } = useEmotionFilter();
  const items = useMemo(
    () =>
      itemsSource.filter(item =>
        item.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [itemsSource, query],
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader title={title} onBack={() => navigation.goBack()} />
      <SearchField value={query} onChangeText={setQuery} />
      <EmotionFilters selectedIds={selectedIds} onToggle={toggle} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.placeGrid}
        keyboardShouldPersistTaps="handled"
      >
        {items.map(item => (
          <PlaceCard
            key={item.id}
            item={item}
            onPress={() => openBusiness(navigation, item)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export const CategoryListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const title = route.params?.title || '';
  const source = route.params?.items;
  const [query, setQuery] = useState('');
  const items = useMemo(() => {
    const list = source || [];
    return list.filter(item =>
      item.title.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [source, query]);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader title={title} bold onBack={() => navigation.goBack()} />
      <SearchField value={query} onChangeText={setQuery} style={styles.searchSpaced} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      >
        {items.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.listItem}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('PlaceGrid', {
                title: item.title,
                key: 'hotels',
              })
            }
          >
            <ServiceIcon name={item.icon} size={20} />
            <Text style={styles.listLabel}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
