import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { CHATS, INVITES } from './data';
import { PageHeader, SearchField, SegmentTabs } from './parts';
import { P } from './routes';
import styles from './styles';

const MessagesScreen = ({ navigation }) => {
  const [tab, setTab] = useState('letters');
  const [query, setQuery] = useState('');
  const [invites, setInvites] = useState(INVITES);
  const q = query.trim().toLowerCase();
  const chats = CHATS.filter(item => !q || item.user.name.toLowerCase().includes(q));
  const visibleInvites = invites.filter(item => !q || item.name.toLowerCase().includes(q));

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader title="Նամակներ" onBack={() => navigation.goBack()} />
      <SearchField value={query} onChangeText={setQuery} />
      <SegmentTabs
        tabs={[
          { key: 'letters', label: 'Նամակներ' },
          { key: 'invites', label: 'Հրավերներ', badge: visibleInvites.length || null },
        ]}
        active={tab}
        onChange={setTab}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      >
        {tab === 'letters'
          ? chats.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.chatRow}
                activeOpacity={0.75}
                onPress={() => navigation.navigate(P.CHAT, { user: item.user })}
              >
                <View style={styles.chatAvatarWrap}>
                  <Image source={item.avatar} style={styles.chatAvatar} />
                  <View style={styles.chatEmotion}>
                    <MIcon
                      name={ICON_NAMES.EMOTIONS.FUN}
                      width={normalize(14)}
                      height={normalize(14)}
                      color="#FFCC00"
                    />
                  </View>
                </View>
                <View style={styles.chatBody}>
                  <Text style={styles.chatName}>{item.user.name}</Text>
                  <Text style={styles.chatPreview}>{item.preview}</Text>
                </View>
                <View style={styles.chatMeta}>
                  <Text style={styles.chatTime}>{item.time}</Text>
                  <View style={styles.unread}>
                    <Text style={styles.unreadText}>{item.unread}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : visibleInvites.map(item => (
              <View key={item.id} style={styles.inviteCard}>
                <Image source={item.cover} style={styles.inviteCover} />
                <View style={styles.inviteBody}>
                  <View style={styles.inviteTop}>
                    <Image source={item.avatar} style={styles.inviteAvatar} />
                    <Text style={styles.inviteName}>{item.name}</Text>
                  </View>
                  <Text style={styles.inviteText}>{item.text}</Text>
                  <View style={styles.inviteActions}>
                    <TouchableOpacity
                      style={styles.acceptBtn}
                      onPress={() => setInvites(list => list.filter(row => row.id !== item.id))}
                    >
                      <Text style={styles.acceptText}>Ընդունել</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rejectBtn}
                      onPress={() => setInvites(list => list.filter(row => row.id !== item.id))}
                    >
                      <Text style={styles.rejectText}>Մերժել</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.inviteTime}>{item.time}</Text>
                </View>
              </View>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessagesScreen;
