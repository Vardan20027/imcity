import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { normalize } from '../../../assets/deviceInfo/normalize';
import {
  FavoriteIcon,
  FireIcon,
  HeartFillIcon,
  JoinIcon,
  LeafIcon,
  LocationIcon,
  PeopleIcon,
  PlayIcon,
} from '../home/icons';
import { EVENTS } from './data';
import { PageHeader } from './parts';
import styles from './styles';

const EventCard = ({ item }) => {
  const [liked, setLiked] = useState(false);
  return (
    <View style={styles.eventCard}>
      <View style={styles.eventHead}>
        <View style={styles.eventAuthor}>
          <Image source={item.logo} style={styles.eventLogo} />
          <Text style={styles.eventAuthorName}>{item.author}</Text>
        </View>
      </View>
      <View style={styles.eventMedia}>
        <Image source={item.media} style={styles.eventMediaImage} />
        <View style={styles.pills}>
          <View style={styles.pill}>
            <Text style={styles.pillLabel}>{item.date}</Text>
            <Text style={styles.pillLabel}>{item.time}</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillLabel}>{item.countdown}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.likeSlot} onPress={() => setLiked(v => !v)}>
          {liked ? <HeartFillIcon /> : <FavoriteIcon />}
        </TouchableOpacity>
        <View style={styles.playSlot}>
          <PlayIcon />
        </View>
      </View>
      <View style={styles.eventBody}>
        <View style={styles.eventActions}>
          <View style={styles.emotionRow}>
            <LeafIcon width={normalize(20)} height={normalize(20)} />
            <FireIcon width={normalize(20)} height={normalize(20)} />
            <HeartFillIcon width={normalize(20)} height={normalize(18)} />
          </View>
          <View style={styles.eventRight}>
            <PeopleIcon />
            <View style={styles.joinChip}>
              <JoinIcon dark width={normalize(14)} height={normalize(14)} />
              <Text style={styles.joinText}>Միանում եմ</Text>
              <Text style={styles.joinText}>{item.count}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.eventDesc}>
          {item.description} <Text style={styles.moreLink}>more</Text>
        </Text>
        <View style={styles.cityRow}>
          <LocationIcon />
          <Text style={styles.eventAuthorName}>{item.location}</Text>
        </View>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );
};

const EventsScreen = ({ navigation }) => (
  <SafeAreaView style={styles.screen} edges={['top']}>
    <PageHeader title="Միջոցառումներ" onBack={() => navigation.goBack()} />
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {EVENTS.map(item => (
        <EventCard key={item.id} item={item} />
      ))}
    </ScrollView>
  </SafeAreaView>
);

export default EventsScreen;
