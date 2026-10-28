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

const progressWidth = value => [styles.progressFill, { width: `${value * 100}%` }];

const Pill = ({ style, onPress, children }) => (
  <TouchableOpacity style={[styles.floatPill, style]} activeOpacity={0.85} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

const ProfileBody = ({ user, isOwn, navigation, onMenu, onAdd, added }) => {
  const [emotions, setEmotions] = useState(false);

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
            <Text style={styles.pillText}>{user.score}</Text>
          </Pill>
          <Pill
            style={styles.pillChat}
            onPress={() => navigation.navigate(isOwn ? P.MESSAGES : P.CHAT, { user })}
          >
            <ChatBubbleIcon />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{user.unreadChats}</Text>
            </View>
          </Pill>
          <Pill style={styles.pillPeople} onPress={() => navigation.navigate(P.CONTACTS)}>
            <PeopleIcon />
            <Text style={styles.pillText}>{user.contacts}</Text>
          </Pill>
          {!isOwn ? (
            <Pill style={styles.pillAdd} onPress={onAdd}>
              <PersonAddIcon />
            </Pill>
          ) : null}
        </View>
        {!isOwn ? (
          <View style={styles.cityRow}>
            <PinIcon size={14} color="#8E8C8C" />
            <Text style={styles.cityText}>{user.city}</Text>
          </View>
        ) : null}
        {isOwn ? (
          <TouchableOpacity
            style={styles.progressCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(P.ACTIVITY)}
          >
            <Text style={styles.progressLabel}>Շաբաթական ակտիվություն</Text>
            <View style={styles.progressTrack}>
              <View style={progressWidth(user.weekly)}>
                <Text style={styles.progressValue}>{Math.round(user.weekly * 100)}%</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>

      <StatRow fire={user.fire} leaf={user.leaf} heart={user.heart} />
      <MemoryGrid
        items={MEMORIES}
        onPress={item => navigation.navigate(P.MEMORY, { memory: item, user })}
      />
      <EmotionSheet
        visible={emotions}
        score={String(user.score).replace(',', '')}
        onClose={() => setEmotions(false)}
      />
      {added}
    </Screen>
  );
};

export default ProfileBody;
