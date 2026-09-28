import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import AlertsIcon from '../../../components/svgs/alerts';
import { normalize } from '../../../assets/deviceInfo/normalize';

const ITEMS = [
  {
    id: 'invite-1',
    type: 'invite',
    name: 'Ալեքս Սահակյան',
    avatar: require('../../../assets/images/notifications/alex.png'),
    cover: require('../../../assets/images/notifications/invite.jpg'),
    line: 'Ձեզ հրավիրել է միջոցառման',
    event: '«Scorpions համերգ»',
    time: '20 րոպե առաջ',
  },
  {
    id: 'event-1',
    type: 'event',
    title: 'Scorpions համերգ',
    logo: require('../../../assets/images/notifications/event-logo.png'),
    cover: require('../../../assets/images/notifications/event-thumb.jpg'),
    description: 'Խումբը կներկայացնի իր հայտնի հիթերը կենդանի կատարմամբ:',
    time: '20 րոպե առաջ',
  },
  {
    id: 'event-2',
    type: 'event',
    title: 'SMM դասընթաց',
    logo: require('../../../assets/images/notifications/event-logo.png'),
    cover: require('../../../assets/images/notifications/event-thumb.jpg'),
    description: 'Սկսվում է նոր դասընթաց SMM թեմայով:',
    time: '20 րոպե առաջ',
  },
  {
    id: 'user-1',
    type: 'user',
    name: 'Լիլիթ Այվազյան',
    avatar: require('../../../assets/images/notifications/lilit.png'),
    line: 'Ընդունեց ձեր հրավերը',
    time: '20 րոպե առաջ',
  },
];

const InviteCard = ({ item }) => (
  <View style={styles.inviteRow}>
    <Image source={item.cover} style={styles.inviteCover} resizeMode="cover" />
    <View style={styles.inviteBody}>
      <View style={styles.inviteHeader}>
        <Image source={item.avatar} style={styles.inviteAvatar} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.inviteCopy}>
        <Text style={styles.inviteLine}>{item.line}</Text>
        <Text style={styles.inviteEvent}>{item.event}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.accept} activeOpacity={0.85}>
          <Text style={styles.acceptLabel}>Ընդունել</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.decline} activeOpacity={0.85}>
          <Text style={styles.declineLabel}>Մերժել</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  </View>
);

const EventCard = ({ item }) => (
  <View style={styles.eventRow}>
    <Image source={item.cover} style={styles.eventCover} resizeMode="cover" />
    <View style={styles.eventBody}>
      <View style={styles.eventHeader}>
        <Image source={item.logo} style={styles.eventLogo} />
        <Text style={styles.name} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  </View>
);

const UserCard = ({ item }) => (
  <View style={styles.userRow}>
    <Image source={item.avatar} style={styles.userAvatar} />
    <View style={styles.userBody}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.userLine}>{item.line}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  </View>
);

const NotificationsScreen = ({ navigation }) => {
  const [items] = useState(ITEMS);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <MIcon
          name={ICON_NAMES.ARROWS.BACK}
          width={normalize(20)}
          height={normalize(20)}
          onPress={() => navigation.goBack()}
          style={styles.back}
          activeOpacity={0.7}
        />
        <Text style={styles.title}>Ծանուցումներ</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <AlertsIcon />
          <View style={styles.emptyCopy}>
            <Text style={styles.emptyTitle}>Առայժմ ծանուցումներ չկան</Text>
            <Text style={styles.emptyText}>
              Երբ նոր ծանուցումներ ստանաք, դրանք կհայտնվեն այստեղ
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {items.map((item, index) => (
            <View key={item.id}>
              {item.type === 'invite' ? <InviteCard item={item} /> : null}
              {item.type === 'event' ? <EventCard item={item} /> : null}
              {item.type === 'user' ? <UserCard item={item} /> : null}
              {index === 0 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default NotificationsScreen;
