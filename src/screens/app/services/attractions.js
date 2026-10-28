import React, { useMemo, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FavoriteIcon, LocationIcon } from '../home/icons';
import { ROUT_NAMES } from '../../../constants/rout';
import {
  EmotionButton,
  EmotionFilters,
  EmotionMarks,
  PageHeader,
  SearchField,
  ShareButton,
  useEmotionFilter,
} from './parts';
import { ATTRACTIONS, MEMORIES } from './data';
import styles from './styles';

const AttractionCard = ({ item, onPress, expanded }) => {
  const [saved, setSaved] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.92} onPress={onPress} disabled={!onPress}>
      <View style={styles.attractionImage}>
        {item.image ? (
          <Image source={item.image} style={styles.attractionImageFill} resizeMode="cover" />
        ) : null}
        <TouchableOpacity
          style={[styles.favorite, saved && styles.chipPressed]}
          activeOpacity={0.8}
          onPress={() => setSaved(v => !v)}
        >
          <FavoriteIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.actionRow}>
        <EmotionMarks size={expanded ? 16 : 16} />
        <View style={styles.actionRight}>
          <ShareButton />
          <EmotionButton />
        </View>
      </View>
      <Text style={styles.placeTitle}>{item.title}</Text>
      <View style={styles.descRow}>
        <Text style={styles.desc} numberOfLines={expanded ? undefined : 2}>
          {expanded ? item.full : item.description}
        </Text>
        <Text style={styles.more}>more</Text>
      </View>
      {expanded ? (
        <View style={styles.locationRow}>
          <LocationIcon />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export const AttractionsScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const { selectedIds, toggle } = useEmotionFilter();
  const items = useMemo(
    () =>
      ATTRACTIONS.filter(item =>
        item.title.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader title="Տեսարժան վայրեր" onBack={() => navigation.goBack()} />
      <SearchField value={query} onChangeText={setQuery} />
      <EmotionFilters selectedIds={selectedIds} onToggle={toggle} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.attractionList}
        keyboardShouldPersistTaps="handled"
      >
        {items.map(item => (
          <AttractionCard
            key={item.id}
            item={item}
            onPress={() => navigation.navigate('AttractionDetail', { id: item.id })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export const AttractionDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const item =
    route.params?.place ||
    ATTRACTIONS.find(a => a.id === route.params?.id) ||
    ATTRACTIONS[0];

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <PageHeader title="Տեսարժան վայրեր" onBack={() => navigation.goBack()} />
        <View style={styles.attractionList}>
          <AttractionCard item={item} expanded />
        </View>
        <View style={styles.memoryGrid}>
          {MEMORIES.map(memory => (
            <View key={memory.id} style={styles.memoryCard}>
              <Image source={memory.image} style={styles.memoryImage} resizeMode="cover" />
              <View style={styles.memoryMeta}>
                <Image source={memory.avatar} style={styles.memoryAvatar} />
                <View>
                  <EmotionMarks size={10} />
                  <Text style={styles.memoryName} numberOfLines={1}>
                    {memory.name}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const openBusiness = (navigation, item) => {
  navigation.navigate(ROUT_NAMES.BUSINESS, {
    name: item.name,
    handle: `@${item.name.toLowerCase()}`,
    logo: item.logo,
    description:
      'Բացահայտեք բարձրակարգ խոհանոցը մեզ հետ: Վայելեք յուրահատուկ համեր և հարմարավետ միջավայր',
    location: 'Երևան, Աբովյան 14',
    initialTab: 'gallery',
  });
};
