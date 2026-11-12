import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { ROUT_NAMES } from '../../../constants/rout';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import styles from './styles';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import {
  FavoriteIcon,
  FireIcon,
  HeartFillIcon,
  JoinIcon,
  LeafIcon,
  MoreIcon,
  PlayIcon,
} from '../home/icons';
import {
  TabGridIcon,
  TabInfoIcon,
  TabCalIcon,
  TabListIcon,
  SparkleIcon,
  CoinIcon,
  ChatIcon,
  HeartOutlineIcon,
  PinIcon,
  PhoneIcon,
  WebIcon,
  ClockIcon,
  WarnIcon,
  EyeIcon,
  CommentIcon,
} from './icons';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { useApiItem, useApiList } from '../../../state/reads/useList';
import { getGallery, getPlaceById } from '../../../state/reads/operations';
import { imageSource, mapGalleryPhoto, mapPlace, numericId } from '../../../state/reads/shape';

const TABS = [
  { id: 'gallery', Icon: TabGridIcon },
  { id: 'info', Icon: TabInfoIcon },
  { id: 'event', Icon: TabCalIcon },
  { id: 'list', Icon: TabListIcon },
];

const GALLERY = [
  { image: require('../../../assets/images/home/concert.png'), avatar: require('../../../assets/images/home/avatar-1.png') },
  { image: require('../../../assets/images/home/hotel.png'), avatar: require('../../../assets/images/home/avatar-2.png') },
  { image: require('../../../assets/images/home/memory.png'), avatar: require('../../../assets/images/home/avatar-3.png') },
  { image: require('../../../assets/images/home/attraction.png'), avatar: require('../../../assets/images/home/avatar-4.png') },
  { image: require('../../../assets/images/home/hotel.png'), avatar: require('../../../assets/images/home/avatar-5.png') },
  { image: require('../../../assets/images/home/concert.png') },
  { image: require('../../../assets/images/home/memory.png'), avatar: require('../../../assets/images/home/avatar-ani.png') },
  { image: require('../../../assets/images/home/attraction.png') },
  { image: require('../../../assets/images/home/hotel.png') },
];

const BUNGALOWS = [
  require('../../../assets/images/home/attraction.png'),
  require('../../../assets/images/home/hotel.png'),
  require('../../../assets/images/home/memory.png'),
  require('../../../assets/images/home/attraction.png'),
  require('../../../assets/images/home/hotel.png'),
  require('../../../assets/images/home/concert.png'),
];

const REACTORS = [
  { id: '1', image: require('../../../assets/images/home/avatar-5.png'), left: 0, top: 28 },
  { id: '2', image: require('../../../assets/images/home/avatar-1.png'), left: 32, top: 0 },
  { id: '3', image: require('../../../assets/images/home/avatar-3.png'), left: 50, top: 40 },
];

const LISTINGS = [
  {
    id: 'lux',
    title: 'LUX',
    image: require('../../../assets/images/home/memory.png'),
    description:
      'Նախատեսված է երկուսի համար, ունի էլեկտրական WIFI, սառնարան, 120 սմ լայնությամբ երկտեղանոց մահճակալ և պատշգամբ',
    price: '48 $',
    views: '15,862',
    comments: '27',
  },
];

const DEFAULTS = {
  name: 'Արմենիա հյուրանոց',
  handle: '@armenia hotel',
  logo: require('../../../assets/images/home/hotel-logo.png'),
  coins: '2,500',
  caption: 'Էներգիաներով լիցքավորված',
  description:
    'Բացահայտեք բարձրակարգ խոհանոցը մեզ հետ: Վայելեք յուրահատուկ համեր և հարմարավետ միջավայր',
  location: 'Event Hub',
  phone: '+37477543321',
  website: 'www.armenia.hotel',
  hours: '09:00 - 23:00',
};

const HeroGlow = () => (
  <Svg style={styles.heroBg} width="100%" height="100%">
    <Defs>
      <RadialGradient id="leftGlow" cx="18%" cy="42%" r="58%">
        <Stop offset="0" stopColor="#FFB7D5" stopOpacity="0.85" />
        <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </RadialGradient>
      <RadialGradient id="rightGlow" cx="82%" cy="46%" r="55%">
        <Stop offset="0" stopColor="#FFD0C2" stopOpacity="0.75" />
        <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </RadialGradient>
    </Defs>
    <Rect width="100%" height="100%" fill="url(#leftGlow)" />
    <Rect width="100%" height="100%" fill="url(#rightGlow)" />
  </Svg>
);

const pick = (params, key, fallback) =>
  Object.prototype.hasOwnProperty.call(params, key) ? params[key] : fallback;

const BusinessScreen = ({ navigation }) => {
  const route = useRoute();
  const params = route.params || {};
  const remote = useApiItem(getPlaceById, numericId(params.id));
  const gallery = useApiList(getGallery, numericId(params.id));
  const galleryShots = (gallery || []).map(mapGalleryPhoto).filter(Boolean);
  const business = {
    ...DEFAULTS,
    name: pick(params, 'name', DEFAULTS.name) || DEFAULTS.name,
    handle: pick(params, 'handle', DEFAULTS.handle) || DEFAULTS.handle,
    logo: pick(params, 'logo', DEFAULTS.logo),
    description: pick(params, 'description', DEFAULTS.description),
    caption: pick(params, 'caption', DEFAULTS.caption),
    location: pick(params, 'location', DEFAULTS.location),
    phone: pick(params, 'phone', DEFAULTS.phone),
    website: pick(params, 'website', DEFAULTS.website),
    hours: pick(params, 'hours', DEFAULTS.hours),
    ...mapPlace(remote),
  };
  const [tab, setTab] = useState(params.initialTab || 'gallery');
  const energiesOn = tab !== 'gallery';

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.headerSide, styles.headerLeft]}
          delayPressIn={0}
          onPress={() => navigation.goBack()}
        >
          <MIcon
            name={ICON_NAMES.ARROWS.BACK}
            width={normalize(24)}
            height={normalize(24)}
          />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>{business.name}</Text>
          <Text style={styles.headerHandle}>{business.handle}</Text>
        </View>
        <TouchableOpacity
          style={[styles.headerSide, styles.headerRight]}
          onPress={() =>
            Share.share({ message: [business.name, business.website].filter(Boolean).join('\n') }).catch(() => {})
          }
        >
          <MoreIcon />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.hero}>
          <HeroGlow />
          <View style={styles.coinPill}>
            <CoinIcon />
            <Text style={styles.coinText}>{business.coins}</Text>
          </View>
          <View style={styles.heartBtn}>
            <HeartOutlineIcon />
          </View>
          <View style={styles.logoWrap}>
            {business.logo ? (
              <Image source={business.logo} style={styles.logo} />
            ) : (
              <View style={[styles.logo, styles.logoEmpty]} />
            )}
            <View style={styles.chatBtn}>
              <ChatIcon />
            </View>
          </View>
          <Text style={styles.heroCaption}>{business.caption}</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <FireIcon />
            <Text style={styles.statValue}>1500</Text>
          </View>
          <View style={styles.stat}>
            <LeafIcon />
            <Text style={styles.statValue}>720</Text>
          </View>
          <View style={styles.stat}>
            <HeartFillIcon />
            <Text style={styles.statValue}>500</Text>
          </View>
        </View>

        <TouchableOpacity
          delayPressIn={0}
          activeOpacity={0.85}
          style={[
            styles.energyBtn,
            energiesOn ? styles.energyBtnActive : styles.energyBtnIdle,
          ]}
          onPress={() =>
            navigation.navigate(ROUT_NAMES.SHARE_EMOTIONS, {
              name: business.name,
              cover: business.logo,
            })
          }
        >
          <SparkleIcon dark={!energiesOn} />
          <Text
            style={[
              styles.energyLabel,
              energiesOn ? styles.energyLabelActive : styles.energyLabelIdle,
            ]}
          >
            Կիսվել էմոցիաներով
          </Text>
        </TouchableOpacity>

        <View style={styles.tabs}>
          {TABS.map(item => (
            <TouchableOpacity
              key={item.id}
              delayPressIn={0}
              style={styles.tabBtn}
              onPress={() => setTab(item.id)}
            >
              <item.Icon active={tab === item.id} />
            </TouchableOpacity>
          ))}
        </View>

        {tab === 'gallery' ? (
          <View style={styles.gallery}>
            {(galleryShots.length ? galleryShots : GALLERY).map((item, index) => (
              <View key={item.id || index} style={styles.galleryItem}>
                <Image source={imageSource(item.image || item)} style={styles.galleryImage} fadeDuration={0} />
                {item.avatar ? (
                  <Image source={item.avatar} style={styles.galleryAvatar} />
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {tab === 'info' ? (
          <>
            <View style={styles.infoFeature}>
              <Image
                source={require('../../../assets/images/home/hotel.png')}
                style={styles.infoFeatureImage}
                resizeMode="cover"
                fadeDuration={0}
              />
              <View style={styles.playCenter} pointerEvents="none">
                <PlayIcon />
              </View>
            </View>
            <View style={styles.infoCopy}>
              <Text style={styles.infoText}>{business.description}</Text>
              <Text style={styles.more}>more</Text>
            </View>
            <View style={styles.infoRows}>
              {[
                business.location ? { key: 'location', icon: <PinIcon />, text: business.location } : null,
                business.phone ? { key: 'phone', icon: <PhoneIcon />, text: business.phone } : null,
                business.website ? { key: 'web', icon: <WebIcon />, text: business.website } : null,
                business.hours ? { key: 'hours', icon: <ClockIcon />, text: business.hours } : null,
              ]
                .filter(Boolean)
                .map(row => (
                  <TouchableOpacity
                    key={row.key}
                    style={styles.infoRow}
                    disabled={row.key !== 'location'}
                    onPress={() => navigation.navigate(ROUT_NAMES.MAP, { address: row.text })}
                  >
                    {row.icon}
                    <Text style={styles.infoRowText}>{row.text}</Text>
                  </TouchableOpacity>
                ))}
            </View>
            <View style={styles.bungalows}>
              {BUNGALOWS.map((image, index) => (
                <View key={index} style={styles.bungalow}>
                  <Image source={image} style={styles.bungalowImage} fadeDuration={0} />
                </View>
              ))}
            </View>
          </>
        ) : null}

        {tab === 'event' ? (
          <>
            <View style={styles.eventHead}>
              <WarnIcon />
              <Text style={styles.eventName}>Scorpions</Text>
            </View>
            <View style={styles.eventMedia}>
              <Image
                source={require('../../../assets/images/home/concert.png')}
                style={styles.eventMediaFill}
                resizeMode="cover"
                fadeDuration={0}
              />
              <View style={styles.pillsRow}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>Մայիս 25</Text>
                  <Text style={styles.pillText}>19:00</Text>
                </View>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>2 օրից</Text>
                </View>
              </View>
              <View style={styles.likeBtn}>
                <FavoriteIcon />
              </View>
              <View style={styles.playCenter} pointerEvents="none">
                <PlayIcon />
              </View>
              <View style={styles.reactions}>
                {REACTORS.map(r => (
                  <View
                    key={r.id}
                    style={[
                      styles.reactor,
                      { left: normalize(r.left), top: normalize(r.top) },
                    ]}
                  >
                    <Image source={r.image} style={styles.reactorImage} />
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.eventActions}>
              <View style={styles.eventEmotions}>
                <LeafIcon />
                <FireIcon />
                <HeartFillIcon />
              </View>
              <View style={styles.countChip}>
                <JoinIcon dark />
                <Text style={styles.countLabel}>Միանում եմ</Text>
                <Text style={styles.countValue}>2640</Text>
              </View>
            </View>
            <View style={styles.eventBody}>
              <Text style={styles.infoText}>
                Scorpions-ը գալիս է Երևան: Լեգենդար Scorpions ռոք խումբը պատրաստվում է ...
              </Text>
              <Text style={styles.more}>more</Text>
              <View style={styles.infoRow}>
                <PinIcon />
                <Text style={styles.infoRowText}>Event Hub</Text>
              </View>
              <Text style={styles.price}>35 $</Text>
            </View>
          </>
        ) : null}

        {tab === 'list' ? (
          LISTINGS.map(item => (
            <View key={item.id} style={styles.listingCard}>
              <Image
                source={item.image}
                style={styles.listingImage}
                resizeMode="cover"
                fadeDuration={0}
              />
              <Text style={styles.listingTitle}>{item.title}</Text>
              <Text style={styles.listingText}>{item.description}</Text>
              <View style={styles.listingFooter}>
                <Text style={styles.price}>{item.price}</Text>
                <View style={styles.listingMeta}>
                  <View style={styles.listingMetaItem}>
                    <EyeIcon />
                    <Text style={styles.listingMetaText}>{item.views}</Text>
                  </View>
                  <View style={styles.listingMetaItem}>
                    <CommentIcon />
                    <Text style={styles.listingMetaText}>{item.comments}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessScreen;
