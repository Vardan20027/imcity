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

const CHIPS = EMOTIONS.map(c => ({
  ...c,
  label: c.title.replace('-\n', '').replace('\n', ''),
  iconSize: chipIconSize(c.icon),
}));

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
      selected ? { backgroundColor: chip.backgroundColor } : styles.chipIdle,
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
        style={styles.likeBtn}
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

      <TouchableOpacity style={styles.volumeBtn} activeOpacity={0.8} delayPressIn={0}>
        <VolumeIcon />
      </TouchableOpacity>

      <Reactions reactors={item.reactors} />
    </>
  );
};

const CountChip = ({ label, count }) => (
  <View style={styles.countChip}>
    <View style={styles.countChipInner}>
      <View style={styles.countChipLeft}>
        <JoinIcon dark />
        <Text style={styles.countChipLabel}>{label}</Text>
        <View style={styles.countChipDivider} />
      </View>
      <Text style={styles.countChipValue}>{count}</Text>
    </View>
  </View>
);

const ActionsRow = ({ item }) => (
  <View style={styles.actionsRow}>
    <View style={styles.emotionIcons}>
      <LeafIcon />
      <FireIcon />
      <HeartFillIcon />
    </View>
    <View style={styles.actionsRight}>
      {item.showShare ? <ShareIcon /> : <PeopleIcon />}
      <CountChip label={item.actionLabel} count={item.count} />
    </View>
  </View>
);

const PostCard = memo(({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.authorRow}>
        {item.type === 'attraction' ? (
          <View style={styles.landmarkBadge}>
            <LandmarkIcon />
          </View>
        ) : (
          <Image source={item.logo} style={styles.authorAvatar} />
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
));

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
