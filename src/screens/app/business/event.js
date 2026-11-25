import React from 'react';
import { Image, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import { useT } from '../../../locales/useT';
import { toggleFavorite, useFavorites } from '../favorites/store';
import {
  FavoriteIcon,
  FireIcon,
  HeartFillIcon,
  InviteIcon,
  JoinIcon,
  LeafIcon,
  MoreIcon,
  PeopleIcon,
  PlayIcon,
} from '../home/icons';
import { PinIcon, WarnIcon } from './icons';
import styles from './styles';

const HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

const EventDetailsScreen = ({ navigation }) => {
  const t = useT();
  const post = useRoute().params?.post || {};
  const favorites = useFavorites();
  const liked = favorites.some(row => row.id === post.id);
  const reactors = post.reactors || [];
  const description =
    post.details ||
    'Scorpions-ը գալիս է Երևան: Լեգենդար Scorpions ռոք խումբը պատրաստվում է ներկայացնել իր հայտնի հիթերը կենդանի կատարմամբ:';
  const share = () => {
    Share.share({
      message: [post.author, description, post.date, post.time, post.location, post.price]
        .filter(Boolean)
        .join('\n'),
    }).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.headerSide, styles.headerLeft]}
          delayPressIn={0}
          onPress={() => navigation.goBack()}
        >
          <MIcon name={ICON_NAMES.ARROWS.BACK} width={normalize(24)} height={normalize(24)} />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>{t(post.author || 'Scorpions')}</Text>
        </View>
        <TouchableOpacity style={[styles.headerSide, styles.headerRight]} onPress={share}>
          <MoreIcon />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.eventHead}>
          <WarnIcon />
          <Text style={styles.eventName}>{t(post.author || 'Scorpions')}</Text>
        </View>
        <View style={styles.eventMedia}>
          {post.media ? (
            <Image source={post.media} style={styles.eventMediaFill} resizeMode="cover" />
          ) : null}
          <View style={styles.pillsRow}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>{t(post.date || 'Մայիս 25')}</Text>
              {post.time ? <Text style={styles.pillText}>{post.time}</Text> : null}
            </View>
            {post.countdown ? (
              <View style={styles.pill}>
                <Text style={styles.pillText}>{t(post.countdown)}</Text>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.likeBtn}
            activeOpacity={0.8}
            onPress={() => toggleFavorite(post)}
          >
            {liked ? <HeartFillIcon /> : <FavoriteIcon />}
          </TouchableOpacity>
          <View style={styles.playCenter} pointerEvents="none">
            <PlayIcon />
          </View>
          <View style={styles.reactions}>
            {reactors.map(reactor => (
              <View
                key={reactor.id}
                style={[
                  styles.reactor,
                  { left: normalize(reactor.left), top: normalize(reactor.top) },
                ]}
              >
                <Image source={reactor.image} style={styles.reactorImage} />
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
          <View style={styles.eventActionsRight}>
            <TouchableOpacity
              activeOpacity={0.7}
              delayPressIn={0}
              hitSlop={HIT_SLOP}
              onPress={share}
            >
              <PeopleIcon />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              delayPressIn={0}
              hitSlop={HIT_SLOP}
              onPress={share}
            >
              <InviteIcon />
            </TouchableOpacity>
            <View style={styles.countChip}>
              <JoinIcon dark />
              <Text style={styles.countLabel}>{t(post.actionLabel || 'Միանում եմ')}</Text>
              <Text style={styles.countValue}>{post.count || '2640'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.eventBody}>
          <Text style={styles.infoText}>{t(description)}</Text>
          {post.location ? (
            <View style={styles.infoRow}>
              <PinIcon />
              <Text style={styles.infoRowText}>{t(post.location)}</Text>
            </View>
          ) : null}
          {post.price ? <Text style={styles.price}>{post.price}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetailsScreen;
