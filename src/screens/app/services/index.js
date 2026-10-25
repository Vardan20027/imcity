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
import { CITIES, SERVICE_CATEGORIES, SHOPS } from './data';
import { AttractionsScreen, AttractionDetailScreen } from './attractions';
import { CategoryListScreen, PlaceGridScreen } from './lists';
import styles from './styles';

const Stack = createNativeStackNavigator();

const CATEGORIES = [
  { key: 'restaurants', title: 'Ռեստորաններ', icon: 'restaurant', screen: 'grid' },
  { key: 'hotels', title: 'Հյուրանոցներ', icon: 'hotel', screen: 'grid' },
  { key: 'cafes', title: 'Սրճարաններ', icon: 'cafe', screen: 'grid' },
  { key: 'entertainment', title: 'Ժամանց', icon: 'entertainment', screen: 'grid' },
  { key: 'tourism', title: 'Տուրիզմ', icon: 'tourism', screen: 'grid' },
  { key: 'rest', title: 'Հանգստի վայրեր', icon: 'rest', screen: 'grid' },
  { key: 'shops', title: 'Խանութներ', icon: 'shops', screen: 'shops', chevron: true },
  { key: 'transport', title: 'Տրանսպորտ', icon: 'transport', screen: 'grid' },
  { key: 'charging', title: 'Լիցքավորում', icon: 'charging', screen: 'grid' },
  { key: 'services', title: 'Ծառայութ-ներ', icon: 'services', screen: 'services', chevron: true },
  { key: 'production', title: 'Արտադրություն', icon: 'production', screen: 'grid' },
  { key: 'medicine', title: 'Բժշկություն', icon: 'medicine', screen: 'grid' },
];

const ServicesHome = ({ navigation }) => {
  const [city, setCity] = useState('Երևան');
  const [cityOpen, setCityOpen] = useState(false);
  const [query, setQuery] = useState('');

  const onNotifications = useCallback(() => {
    navigation.navigate(ROUT_NAMES.NOTIFICATIONS);
  }, [navigation]);

  const openCategory = item => {
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

  const visible = CATEGORIES.filter(item =>
    item.title.toLowerCase().includes(query.trim().toLowerCase()),
  );
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
          <Text style={styles.cityName}>{city}</Text>
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
              <Text style={styles.featuredTitle}>Տեսարժան վայրեր</Text>
              <EmotionMarks size={16} />
            </View>
            <Text style={styles.featuredCount}>148</Text>
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
                <View style={styles.categoryTitleRow}>
                  <Text style={styles.categoryTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  {item.chevron ? <ServiceIcon name="chevron" size={16} /> : null}
                </View>
                <EmotionMarks size={12} />
              </View>
              <Text style={styles.categoryCount}>112</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {cityOpen ? (
        <>
          <Pressable style={styles.cityMenuBackdrop} onPress={() => setCityOpen(false)} />
          <View style={styles.cityMenu}>
            {CITIES.map(name => (
              <TouchableOpacity
                key={name}
                style={[styles.cityOption, name === city && styles.cityOptionSelected]}
                onPress={() => {
                  setCity(name);
                  setCityOpen(false);
                }}
              >
                <Text style={styles.cityOptionText}>{name}</Text>
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
