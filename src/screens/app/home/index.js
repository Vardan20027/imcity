import React, { memo, useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import { EMOTIONS } from '../../../constants/emotions/data';
import { ROUT_NAMES } from '../../../constants/rout';
import styles from './styles';
import {
  FavoriteIcon,
  FireIcon,
  HeartFillIcon,
  InviteIcon,
  JoinIcon,
  LandmarkIcon,
  LeafIcon,
  LocationIcon,
  MoreIcon,
  PeopleIcon,
  PlayIcon,
  ShareIcon,
  VolumeIcon,
} from './icons';

const CITIES = ['Երևան', 'Կապան', 'Գորիս', 'Գյումրի', 'Արարատ'];
const DEFAULT_SELECTED = new Set([2, 3, 5]);
const CHIP_ICON_BOX = 16;
const CHIP_ICON_NATIVE = {
  [ICON_NAMES.EMOTIONS.CALM]: [19, 19],
  [ICON_NAMES.EMOTIONS.DRIVE]: [12, 18],
  [ICON_NAMES.EMOTIONS.ROMANCE]: [19, 18],
  [ICON_NAMES.EMOTIONS.FUN]: [16, 18],
  [ICON_NAMES.EMOTIONS.DISCOVERY]: [13, 18],
  [ICON_NAMES.EMOTIONS.WORKING]: [17, 15],
  [ICON_NAMES.EMOTIONS.INSPIRATION]: [16, 16],
};

const chipIconSize = icon => {
  const [w, h] = CHIP_ICON_NATIVE[icon] || [16, 16];
  const scale = CHIP_ICON_BOX / Math.max(w, h);
  return {
    width: normalize(w * scale),
    height: normalize(h * scale),
  };
};

const hexToRgba = (hex, alpha) => {
  const n = hex.replace('#', '');
  return `rgba(${parseInt(n.slice(0, 2), 16)},${parseInt(n.slice(2, 4), 16)},${parseInt(
    n.slice(4, 6),
    16,
  )},${alpha})`;
};

const CHIPS = EMOTIONS.map(c => ({
  ...c,
  label: c.title,
  selectedBg: hexToRgba(c.color, 0.15),
  iconSize: chipIconSize(c.icon),
}));

const LIKE_POS = {
  event: { top: normalize(35), right: normalize(40) },
  business: { top: normalize(32), right: normalize(32) },
  memory: { top: normalize(33), right: normalize(40) },
  attraction: { top: normalize(33), right: normalize(35) },
};

const VOLUME_POS = {
  event: { left: normalize(18), bottom: normalize(16) },
  business: { left: normalize(18), bottom: normalize(16) },
  memory: { left: normalize(16), bottom: normalize(14) },
  attraction: { left: normalize(16), bottom: normalize(14) },
};

const REACTIONS_BOX = {
  event: {
    position: 'absolute',
    right: normalize(16),
    bottom: normalize(16),
    width: normalize(95),
    height: normalize(87),
  },
  business: {
    position: 'absolute',
    right: normalize(16),
    bottom: normalize(16),
    width: normalize(98),
    height: normalize(107),
  },
  memory: {
    position: 'absolute',
    right: normalize(16),
    bottom: normalize(24),
    width: normalize(98),
    height: normalize(107),
  },
  attraction: {
    position: 'absolute',
    right: normalize(16),
    bottom: normalize(24),
    width: normalize(98),
    height: normalize(102),
  },
};

const HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

const FEED = [
  {
    id: 'event-1',
    type: 'event',
    author: 'Scorpions',
    logo: require('../../../assets/images/home/scorpions-logo.png'),
    media: require('../../../assets/images/home/concert.png'),
    date: 'Մայիս 25',
    time: '19:00',
    countdown: '2 օրից',
    description:
      'Scorpions-ը գալիս է Երևան: Լեգենդար Scorpions ռոք խումբը պատրաստվում է ...',
    location: 'Event Hub',
    locationBold: true,
    price: '35 $',
    actionLabel: 'Միանում եմ',
    count: '2640',
    reactors: [
      {
        id: 'r1',
        image: require('../../../assets/images/home/avatar-5.png'),
        left: 0,
        top: 30,
      },
      {
        id: 'r2',
        image: require('../../../assets/images/home/avatar-1.png'),
        left: 37,
        top: 0,
        highlighted: true,
        badge: 'hand',
      },
      {
        id: 'r3',
        image: require('../../../assets/images/home/avatar-3.png'),
        left: 55,
        top: 47,
        badge: 'hand',
      },
    ],
  },
  {
    id: 'business-1',
    type: 'business',
    author: 'Armenia hotel',
    logo: require('../../../assets/images/home/hotel-logo.png'),
    media: require('../../../assets/images/home/hotel.png'),
    description:
      'Բացահայտեք բարձրակարգ խոհանոցը մեզ հետ: Վայելեք յուրահատուկ համեր և...',
    location: 'Երևան, Աբովյան 14',
    actionLabel: 'Էմոցիա',
    count: '2640',
    showShare: true,
    reactors: [
      {
        id: 'r1',
        image: require('../../../assets/images/home/avatar-5.png'),
        left: 0,
        top: 47,
      },
      {
        id: 'r2',
        image: require('../../../assets/images/home/avatar-2.png'),
        left: 44,
        top: 0,
        highlighted: true,
        badge: 'heart',
      },
      {
        id: 'r3',
        image: require('../../../assets/images/home/avatar-4.png'),
        left: 58,
        top: 67,
        badge: 'hand',
      },
    ],
  },
  {
    id: 'memory-1',
    type: 'memory',
    author: 'Armenia hotel',
    logo: require('../../../assets/images/home/memory-logo.png'),
    media: require('../../../assets/images/home/memory.png'),
    memoryAuthor: 'Անի Եսայան',
    memoryAvatar: require('../../../assets/images/home/avatar-ani.png'),
    description:
      'Հիանալի տեղ ընկերների հետ ժամանակ անցկացնելու համար․գեղեցիկ տեսար... ',
    location: 'Երևան, Աբովյան 14',
    actionLabel: 'Էմոցիա',
    count: '2640',
    showShare: true,
    reactors: [
      {
        id: 'r1',
        image: require('../../../assets/images/home/avatar-5.png'),
        left: 0,
        top: 47,
      },
      {
        id: 'r2',
        image: require('../../../assets/images/home/avatar-2.png'),
        left: 44,
        top: 0,
        highlighted: true,
        badge: 'heart',
      },
      {
        id: 'r3',
        image: require('../../../assets/images/home/avatar-4.png'),
        left: 58,
        top: 67,
        badge: 'hand',
      },
    ],
  },
  {
    id: 'attraction-1',
    type: 'attraction',
    author: 'Խուստուփ լեռ',
    media: require('../../../assets/images/home/attraction.png'),
    description: 'Խուստուփ-Կատարա լեռնաշղթայի ամենա-բարձր գագաթը...',
    actionLabel: 'Էմոցիա',
    count: '2640',
    reactors: [
      {
        id: 'r1',
        image: require('../../../assets/images/home/avatar-5.png'),
        left: 0,
        top: 42,
      },
      {
        id: 'r2',
        image: require('../../../assets/images/home/avatar-2.png'),
        left: 47,
        top: 0,
        highlighted: true,
        badge: 'heart',
      },
      {
        id: 'r3',
        image: require('../../../assets/images/home/avatar-4.png'),
        left: 58,
        top: 62,
        badge: 'hand',
      },
    ],
  },
];

function HomeHeader({ city, onToggleCity, onNotifications }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.citySelector}
        activeOpacity={0.8}
        delayPressIn={0}
        onPress={onToggleCity}
      >
        <MIcon
          name={ICON_NAMES.APP_LOGO}
          width={normalize(32)}
          height={normalize(32)}
        />
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
  );
}

function HomeSearchBar() {
  const [query, setQuery] = useState('');
  return (
    <View style={styles.searchBox}>
      <MIcon
        name={ICON_NAMES.SEARCH}
        width={normalize(20)}
        height={normalize(20)}
        color="#B2B2B2"
      />
      <TextInput
        style={styles.searchInput}
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
      />
    </View>
  );
}

const EmotionChip = memo(({ chip, selected, onToggle }) => (
  <Pressable
    onPress={() => onToggle(chip.id)}
    unstable_pressDelay={0}
    style={({ pressed }) => [
      styles.chip,
      selected ? { backgroundColor: chip.selectedBg } : styles.chipIdle,
      pressed && styles.chipPressed,
    ]}
  >
    <View style={styles.chipIcon}>
      <MIcon
        name={chip.icon}
        width={chip.iconSize.width}
        height={chip.iconSize.height}
        color={selected ? chip.color : '#7B7B7B'}
      />
    </View>
    <Text
      style={[
        styles.chipLabel,
        selected ? { color: chip.color } : styles.chipLabelIdle,
      ]}
    >
      {chip.label}
    </Text>
  </Pressable>
));

const Categories = memo(({ selectedIds, onToggle }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
    directionalLockEnabled
    contentContainerStyle={styles.chipsContent}
  >
    {CHIPS.map(chip => (
      <EmotionChip
        key={chip.id}
        chip={chip}
        selected={selectedIds.has(chip.id)}
        onToggle={onToggle}
      />
    ))}
  </ScrollView>
));

const ReactorBadge = ({ type }) => (
  <View style={styles.reactorBadge}>
    {type === 'heart' ? (
      <HeartFillIcon width={normalize(11)} height={normalize(10)} />
    ) : (
      <JoinIcon width={normalize(13)} height={normalize(13)} />
    )}
  </View>
);

const Reactions = ({ reactors }) => (
  <View style={styles.reactions} pointerEvents="none">
    {reactors.map(r => (
      <View
        key={r.id}
        style={[
          styles.reactorWrap,
          {
            left: normalize(r.left),
            top: normalize(r.top),
          },
        ]}
      >
        <View style={[styles.reactor, r.highlighted && styles.reactorHighlight]}>
          <Image source={r.image} style={styles.reactorImage} />
        </View>
        {r.badge ? <ReactorBadge type={r.badge} /> : null}
      </View>
    ))}
  </View>
);

function MediaOverlays({ item, showPills }) {
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <>
      {showPills ? (
        <View style={styles.pillsRow}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{item.date}</Text>
            <View style={styles.pillDivider} />
            <Text style={styles.pillText}>{item.time}</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{item.countdown}</Text>
          </View>
        </View>
      ) : null}

      <TouchableOpacity
        style={[styles.likeBtn, LIKE_POS[item.type]]}
        activeOpacity={0.8}
        delayPressIn={0}
        onPress={() => setLiked(v => !v)}
      >
        {liked ? <HeartFillIcon /> : <FavoriteIcon />}
      </TouchableOpacity>

      {!playing ? (
        <TouchableOpacity
          style={styles.playBtn}
          activeOpacity={0.8}
          delayPressIn={0}
          onPress={() => setPlaying(true)}
        >
          <PlayIcon />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={[styles.volumeBtn, VOLUME_POS[item.type]]}
        activeOpacity={0.8}
        delayPressIn={0}
      >
        <VolumeIcon />
      </TouchableOpacity>

      <View style={REACTIONS_BOX[item.type]} pointerEvents="none">
        <Reactions reactors={item.reactors} />
      </View>
    </>
  );
}

const CountChip = ({ variant, label, count }) => {
  const isJoin = variant === 'join';
  return (
    <View
      style={[
        styles.countChip,
        isJoin ? styles.countChipJoin : styles.countChipEmotion,
      ]}
    >
      <View style={styles.countChipInner}>
        <View style={styles.countChipLeft}>
          {isJoin ? (
            <JoinIcon dark />
          ) : (
            <LeafIcon width={normalize(16)} height={normalize(16)} />
          )}
          <Text
            style={[
              styles.countChipLabel,
              !isJoin && styles.countChipLabelEmotion,
            ]}
          >
            {label}
          </Text>
          <View style={styles.countChipDivider} />
        </View>
        <Text
          style={[
            styles.countChipValue,
            !isJoin && styles.countChipValueEmotion,
          ]}
        >
          {count}
        </Text>
      </View>
    </View>
  );
};

const ActionsRow = ({ item }) => {
  const isEvent = item.type === 'event';
  return (
    <View style={styles.actionsRow}>
      <View style={styles.emotionIcons}>
        <LeafIcon />
        <FireIcon />
        <HeartFillIcon />
      </View>
      <View
        style={[styles.actionsRight, !isEvent && styles.actionsRightShare]}
      >
        {isEvent ? (
          <>
            <PeopleIcon />
            <InviteIcon />
          </>
        ) : (
          <ShareIcon />
        )}
        <CountChip
          variant={isEvent ? 'join' : 'emotion'}
          label={item.actionLabel}
          count={item.count}
        />
      </View>
    </View>
  );
};

const PostCard = memo(({ item }) => {
  const navigation = useNavigation();
  const openPoster = () => {
    navigation.navigate(ROUT_NAMES.BUSINESS, {
      name: item.author === 'Armenia hotel' ? 'Արմենիա հյուրանոց' : item.author,
      handle: `@${String(item.author).toLowerCase()}`,
      logo: item.logo,
      description: item.description,
      location: item.location,
      initialTab: item.type === 'event' ? 'event' : 'gallery',
    });
  };

  return (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.authorRow}>
        {item.type === 'attraction' ? (
          <View style={styles.landmarkBadge}>
            <LandmarkIcon />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            delayPressIn={0}
            onPress={openPoster}
          >
            <Image source={item.logo} style={styles.authorAvatar} />
          </TouchableOpacity>
        )}
        <Text style={styles.authorName}>{item.author}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        delayPressIn={0}
        hitSlop={HIT_SLOP}
      >
        <MoreIcon />
      </TouchableOpacity>
    </View>

    <View style={styles.media}>
      <Image
        source={item.media}
        style={styles.mediaFill}
        resizeMode="cover"
        fadeDuration={0}
      />
      <MediaOverlays item={item} showPills={item.type === 'event'} />
    </View>

    {item.type !== 'attraction' ? <ActionsRow item={item} /> : null}

    <View style={styles.cardBody}>
      {item.type === 'memory' ? (
        <View style={styles.memoryAuthor}>
          <Image source={item.memoryAvatar} style={styles.memoryAuthorAvatar} />
          <Text style={styles.memoryAuthorName}>{item.memoryAuthor}</Text>
        </View>
      ) : null}

      <View>
        <Text
          style={[
            styles.description,
            item.type === 'memory' && styles.descriptionMuted,
            item.type === 'attraction' && styles.descriptionTight,
            item.type === 'business' && styles.descriptionTight,
          ]}
        >
          {item.description}
        </Text>
        <Text style={styles.more}>more</Text>
      </View>

      {item.location ? (
        <View>
          <View style={styles.locationRow}>
            <LocationIcon />
            <Text
              style={[
                styles.locationText,
                item.locationBold && styles.locationTextBold,
              ]}
            >
              {item.location}
            </Text>
          </View>
          {item.price ? <Text style={styles.price}>{item.price}</Text> : null}
        </View>
      ) : null}
    </View>
  </View>
  );
});

const PostSeparator = () => <View style={styles.postSeparator} />;

const renderPost = ({ item }) => <PostCard item={item} />;

const HomeScreen = ({ navigation }) => {
  const [city, setCity] = useState('Երևան');
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState(() => new Set(DEFAULT_SELECTED));

  const toggleEmotion = useCallback(id => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const onToggleCity = useCallback(() => {
    setCityOpen(v => !v);
  }, []);

  const onNotifications = useCallback(() => {
    navigation.navigate(ROUT_NAMES.NOTIFICATIONS);
  }, [navigation]);

  const closeCityMenu = useCallback(() => {
    setCityOpen(false);
  }, []);

  const selectCity = useCallback(name => {
    setCity(name);
    setCityOpen(false);
  }, []);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <HomeHeader
        city={city}
        onToggleCity={onToggleCity}
        onNotifications={onNotifications}
      />
      <HomeSearchBar />
      <Categories selectedIds={selectedIds} onToggle={toggleEmotion} />
      <FlatList
        data={FEED}
        keyExtractor={p => p.id}
        renderItem={renderPost}
        ItemSeparatorComponent={PostSeparator}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={5}
        updateCellsBatchingPeriod={50}
      />
      {cityOpen ? (
        <>
          <Pressable
            style={styles.cityMenuBackdrop}
            onPress={closeCityMenu}
          />
          <View style={styles.cityMenu}>
            {CITIES.map(name => (
              <TouchableOpacity
                key={name}
                delayPressIn={0}
                style={[
                  styles.cityOption,
                  name === city && styles.cityOptionSelected,
                ]}
                onPress={() => selectCity(name)}
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

export default HomeScreen;
