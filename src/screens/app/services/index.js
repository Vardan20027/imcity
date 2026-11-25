import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { normalize } from '../../../assets/deviceInfo/normalize';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import { COLORS } from '../../../assets/rootStyles';
import { ROUT_NAMES } from '../../../constants/rout';
import { EmotionMarks, SearchField, ServiceIcon } from './parts';
import { SERVICE_CATEGORIES, SHOPS } from './data';
import { CITY_NAMES, pickCities } from '../../../constants/cities';
import { AttractionsScreen, AttractionDetailScreen } from './attractions';
import { CategoryListScreen, PlaceGridScreen } from './lists';
import { useApiList } from '../../../state/reads/useList';
import { getCategories, getCities } from '../../../state/reads/operations';
import { nameOf } from '../../../state/reads/shape';
import { toPhrase } from '../../../locales/catalog';
import { useT } from '../../../locales/useT';
import styles from './styles';

const Stack = createNativeStackNavigator();

const CATEGORIES = [
  { key: 'restaurants', title: 'Ռեստորաններ', icon: 'restaurant', screen: 'grid', count: '112' },
  { key: 'hotels', title: 'Հյուրանոցներ', icon: 'hotel', screen: 'grid', count: '112' },
  { key: 'cafes', title: 'Սրճարաններ', icon: 'cafe', screen: 'grid', count: '112' },
  { key: 'entertainment', title: 'Ժամանց', icon: 'entertainment', screen: 'grid', count: '112' },
  { key: 'tourism', title: 'Տուրիզմ', icon: 'tourism', screen: 'grid', count: '112' },
  { key: 'rest', title: 'Հանգստի վայրեր', icon: 'rest', screen: 'grid', count: '112' },
  { key: 'shops', title: 'Խանութներ', icon: 'shops', screen: 'shops', chevron: true, count: '112' },
  { key: 'transport', title: 'Տրանսպորտ', icon: 'transport', screen: 'grid', count: '112' },
  { key: 'charging', title: 'Լիցքավորում', icon: 'charging', screen: 'grid', count: '112' },
  { key: 'services', title: 'Ծառայութ-ներ', icon: 'services', screen: 'services', chevron: true, count: '112' },
  { key: 'production', title: 'Արտադրություն', icon: 'production', screen: 'grid', count: '112' },
  { key: 'medicine', title: 'Բժշկություն', icon: 'medicine', screen: 'grid', count: '112' },
];

const BY_SLUG = {
  attractions: { key: 'attraction', title: 'Տեսարժան վայրեր', icon: 'attraction', screen: 'attractions' },
  hotels: { key: 'hotels', title: 'Հյուրանոցներ', icon: 'hotel', screen: 'grid' },
  eat: { key: 'restaurants', title: 'Ռեստորաններ', icon: 'restaurant', screen: 'grid' },
  tourism: { key: 'tourism', title: 'Տուրիզմ', icon: 'tourism', screen: 'grid' },
  'vacation-spots': { key: 'rest', title: 'Հանգստի վայրեր', icon: 'rest', screen: 'grid' },
  entertainment: { key: 'entertainment', title: 'Ժամանց', icon: 'entertainment', screen: 'grid' },
  transport: { key: 'transport', title: 'Տրանսպորտ', icon: 'transport', screen: 'grid' },
  refills: { key: 'charging', title: 'Լիցքավորում', icon: 'charging', screen: 'grid' },
  store: { key: 'shops', title: 'Խանութներ', icon: 'shops', screen: 'shops', chevron: true },
  services: { key: 'services', title: 'Ծառայութ-ներ', icon: 'services', screen: 'services', chevron: true },
  production: { key: 'production', title: 'Արտադրություն', icon: 'production', screen: 'grid' },
  medicine: { key: 'medicine', title: 'Բժշկություն', icon: 'medicine', screen: 'grid' },
};

const placeCount = item => {
  const value = item?.places_count ?? item?.count ?? item?.total ?? item?.places;
  if (value == null || value === '') return '';
  return String(value);
};

const ServicesHome = ({ navigation }) => {
  const t = useT();
  const [city, setCity] = useState('Երևան');
  const [cityOpen, setCityOpen] = useState(false);
  const [query, setQuery] = useState('');
  const remoteCategories = useApiList(getCategories);
  const remoteCities = useApiList(getCities);
  const categories = remoteCategories
    ? remoteCategories
        .filter(item => item?.slug !== 'attractions')
        .map((item, index) => {
          const known =
            BY_SLUG[item?.slug] ||
            CATEGORIES.find(category => category.title === toPhrase(nameOf(item)));
          const fallback = known || CATEGORIES[index % CATEGORIES.length];
          return {
            key: known?.key || String(item?.id ?? item?.slug ?? index),
            title: known?.title || toPhrase(nameOf(item)) || fallback.title,
            icon: known?.icon || fallback.icon,
            screen: known?.screen || 'grid',
            chevron: known?.chevron,
            count: placeCount(item) || '112',
          };
        })
        .filter(item => item.title)
    : CATEGORIES;
  const featuredCount =
    placeCount(
      (remoteCategories || []).find(item => /տեսարժան|attraction/i.test(nameOf(item))),
    ) || '148';
  const cityNames = pickCities(remoteCities ? remoteCities.map(nameOf) : CITY_NAMES).map(toPhrase);

  const onNotifications = useCallback(() => {
    navigation.navigate(ROUT_NAMES.NOTIFICATIONS);
  }, [navigation]);

  const openCategory = item => {
    if (item.screen === 'attractions') {
      navigation.navigate('Attractions');
      return;
    }
    if (item.screen === 'shops') {
      navigation.navigate('CategoryList', { title: 'Խանութներ', items: SHOPS });
      return;
    }
    if (item.screen === 'services') {
      navigation.navigate('CategoryList', {
        title: 'Ծառայություներ',
        items: SERVICE_CATEGORIES,
      });
      return;
    }
    navigation.navigate('PlaceGrid', { title: item.title, key: item.key });
  };

  const needle = query.trim().toLowerCase();
  const visible = categories.filter(item => t(item.title).toLowerCase().includes(needle));
  const showFeatured = 'տեսարժան վայրեր'.includes(query.trim().toLowerCase()) || !query.trim();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.citySelector}
          activeOpacity={0.8}
          onPress={() => setCityOpen(v => !v)}
        >
          <MIcon name={ICON_NAMES.APP_LOGO} width={normalize(32)} height={normalize(32)} />
          <Text style={styles.cityName}>{t(city)}</Text>
          <MIcon
            name={ICON_NAMES.ARROWS.DOWN}
            width={normalize(16)}
            height={normalize(16)}
          />
        </TouchableOpacity>
        <MIcon
          name={ICON_NAMES.NOTIFICATION}
          width={normalize(24)}
          height={normalize(24)}
          onPress={onNotifications}
          activeOpacity={0.7}
        />
      </View>
      <SearchField value={query} onChangeText={setQuery} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.hubBody}
        keyboardShouldPersistTaps="handled"
      >
        {showFeatured ? (
          <TouchableOpacity
            style={styles.featured}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Attractions')}
          >
            <View style={styles.featuredIcon}>
              <ServiceIcon name="attraction" size={24} />
            </View>
            <View style={styles.featuredText}>
              <Text style={styles.featuredTitle}>{t('Տեսարժան վայրեր')}</Text>
              <EmotionMarks size={16} />
            </View>
            <Text style={styles.featuredCount}>{featuredCount}</Text>
          </TouchableOpacity>
        ) : null}
        <View style={styles.grid}>
          {visible.map(item => (
            <TouchableOpacity
              key={item.key}
              style={styles.categoryCard}
              activeOpacity={0.85}
              onPress={() => openCategory(item)}
            >
              <View style={styles.categoryIcon}>
                <ServiceIcon name={item.icon} size={18} />
              </View>
              <View style={styles.categoryBody}>
                <View style={styles.categoryCopy}>
                  <View style={styles.categoryTitleRow}>
                    <Text style={styles.categoryTitle} numberOfLines={1}>
                      {t(item.title)}
                    </Text>
                    {item.chevron ? <ServiceIcon name="chevron" size={16} /> : null}
                  </View>
                  <EmotionMarks size={12} />
                </View>
                <Text style={styles.categoryCount}>{item.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {cityOpen ? (
        <>
          <Pressable style={styles.cityMenuBackdrop} onPress={() => setCityOpen(false)} />
          <View style={styles.cityMenu}>
            {cityNames.map(name => (
              <TouchableOpacity
                key={name}
                style={[styles.cityOption, name === city && styles.cityOptionSelected]}
                onPress={() => {
                  setCity(name);
                  setCityOpen(false);
                }}
              >
                <Text style={styles.cityOptionText}>{t(name)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : null}
    </SafeAreaView>
  );
};

const ServicesNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
      contentStyle: { backgroundColor: COLORS.white },
    }}
  >
    <Stack.Screen name="ServicesHome" component={ServicesHome} />
    <Stack.Screen name="Attractions" component={AttractionsScreen} />
    <Stack.Screen name="AttractionDetail" component={AttractionDetailScreen} />
    <Stack.Screen name="PlaceGrid" component={PlaceGridScreen} />
    <Stack.Screen name="CategoryList" component={CategoryListScreen} />
  </Stack.Navigator>
);

export default ServicesNavigator;
