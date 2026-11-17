import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { ROUT_NAMES } from '../../../constants/rout';
import { MEMORIES } from './data';
import {
  ChatBubbleIcon,
  DotsIcon,
  MenuIcon,
  PeopleIcon,
  PersonAddIcon,
  PinIcon,
  SparkleIcon,
} from './icons';
import { EmotionSheet, MemoryGrid, Screen, StatRow } from './parts';
import { P } from './routes';
import styles from './styles';
import { formatBirthday } from '../../../utils/birthday';
import { useT } from '../../../locales/useT';

const progressWidth = value => [styles.progressFill, { width: `${value * 100}%` }];

const Pill = ({ style, onPress, children }) => (
  <TouchableOpacity style={[styles.floatPill, style]} activeOpacity={0.85} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

const ProfileBody = ({ user, isOwn, navigation, onMenu, onAdd, added }) => {
  const t = useT();
  const [emotions, setEmotions] = useState(false);
  const memories = isOwn ? user.memories || [] : MEMORIES;
  const hasStats = [user.fire, user.leaf, user.heart].some(value => value !== '' && value != null);

  return (
    <Screen scroll>
      <View style={styles.topBar}>
        <View style={styles.topSide}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MIcon name={ICON_NAMES.ARROWS.BACK} width={normalize(20)} height={normalize(20)} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.topCenter}
          activeOpacity={0.8}
          onPress={() => isOwn && navigation.navigate(P.SETTINGS)}
        >
          <Text style={styles.topName}>{user.name}</Text>
          <Text style={styles.topHandle}>{user.handle}</Text>
        </TouchableOpacity>
        <View style={[styles.topSide, styles.topSideRight]}>
          {isOwn ? (
            <>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => navigation.navigate(ROUT_NAMES.NOTIFICATIONS)}
              >
                <MIcon
                  name={ICON_NAMES.NOTIFICATION}
                  width={normalize(22)}
                  height={normalize(22)}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} onPress={onMenu}>
                <MenuIcon />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.iconBtn} onPress={onMenu}>
              <DotsIcon />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.hero}>
        <View style={styles.glowWrap}>
          <View style={styles.glowLeft} />
          <View style={styles.glowRight} />
          <View style={styles.avatarRing}>
            {user.avatar ? <Image source={user.avatar} style={styles.avatarImage} /> : null}
          </View>
          <Pill style={styles.pillLeft} onPress={() => setEmotions(true)}>
            <SparkleIcon size={14} />
            {user.score ? <Text style={styles.pillText}>{user.score}</Text> : null}
          </Pill>
          <Pill
            style={styles.pillChat}
            onPress={() => navigation.navigate(isOwn ? P.MESSAGES : P.CHAT, { user })}
          >
            <ChatBubbleIcon />
            {user.unreadChats ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{user.unreadChats}</Text>
              </View>
            ) : null}
          </Pill>
          <Pill style={styles.pillPeople} onPress={() => navigation.navigate(P.CONTACTS)}>
            <PeopleIcon />
            {user.contacts ? <Text style={styles.pillText}>{user.contacts}</Text> : null}
          </Pill>
          {!isOwn ? (
            <Pill style={styles.pillAdd} onPress={onAdd}>
              <PersonAddIcon />
            </Pill>
          ) : null}
        </View>
        {user.city ? (
          <View style={styles.cityRow}>
            <PinIcon size={14} color="#8E8C8C" />
            <Text style={styles.cityText}>{t(user.city)}</Text>
          </View>
        ) : null}
        {user.birthday ? <Text style={styles.birthdayText}>{formatBirthday(user.birthday)}</Text> : null}
        {isOwn && Number(user.weekly) > 0 ? (
          <TouchableOpacity
            style={styles.progressCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(P.ACTIVITY)}
          >
            <Text style={styles.progressLabel}>{t('Շաբաթական ակտիվություն')}</Text>
            <View style={styles.progressTrack}>
              <View style={progressWidth(user.weekly)}>
                <Text style={styles.progressValue}>{Math.round(user.weekly * 100)}%</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>

      {hasStats ? <StatRow fire={user.fire} leaf={user.leaf} heart={user.heart} /> : null}
      {memories.length ? (
        <MemoryGrid
          items={memories}
          onPress={item => navigation.navigate(P.MEMORY, { memory: item, user })}
        />
      ) : null}
      <EmotionSheet
        visible={emotions}
        score={String(user.score).replace(',', '')}
        emotions={user.emotions}
        onClose={() => setEmotions(false)}
      />
      {added}
    </Screen>
  );
};

export default ProfileBody;
