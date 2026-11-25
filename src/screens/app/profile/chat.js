import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { ANNA, THREAD } from './data';
import {
  BellOffIcon,
  BlockIcon,
  DotsIcon,
  ShareIcon,
  TrashIcon,
} from './icons';
import { BottomSheet, SheetAction } from './parts';
import { ChatComposer, VoiceBubble } from './voice';
import styles from './styles';

const ChatScreen = ({ navigation, route }) => {
  const user = route.params?.user || ANNA;
  const [menu, setMenu] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState(THREAD);

  const send = () => {
    const value = text.trim();
    if (!value) {
      return;
    }
    setMessages(list => [...list, { id: `local-${Date.now()}`, type: 'out', text: value }]);
    setText('');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.pageHeader}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MIcon name={ICON_NAMES.ARROWS.BACK} width={normalize(20)} height={normalize(20)} />
          </TouchableOpacity>
          <View style={styles.chatHeaderUser}>
            {user.avatar ? <Image source={user.avatar} style={styles.chatHeaderAvatar} /> : <View style={styles.chatHeaderAvatar} />}
            <Text style={styles.chatHeaderName} numberOfLines={1}>
              {user.name}
            </Text>
          </View>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setMenu(true)}>
            <DotsIcon />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {messages.map(item => {
            if (item.type === 'date') {
              return (
                <Text key={item.id} style={styles.dateLabel}>
                  {item.text}
                </Text>
              );
            }
            if (item.type === 'voice') {
              return (
                <VoiceBubble
                  key={item.id}
                  id={item.id}
                  mine={item.mine}
                  duration={item.duration}
                  uri={item.uri}
                  bars={item.bars}
                />
              );
            }
            if (item.type === 'image') {
              return (
                <View key={item.id} style={[styles.imageBubble, styles.imageMine]} />
              );
            }
            const mine = item.type === 'out';
            return (
              <View key={item.id} style={[styles.bubbleWrap, mine ? styles.bubbleOut : styles.bubbleIn]}>
                <Text style={mine ? styles.bubbleTextOut : styles.bubbleTextIn}>{item.text}</Text>
              </View>
            );
          })}
        </ScrollView>
        <ChatComposer value={text} onChangeText={setText} onSend={send} />
      </KeyboardAvoidingView>
      <BottomSheet visible={menu} onClose={() => setMenu(false)}>
        <SheetAction icon={<ShareIcon />} label="Կիսվել" onPress={() => setMenu(false)} />
        <SheetAction icon={<BellOffIcon />} label="Անջատել ծանուցումները" onPress={() => setMenu(false)} />
        <SheetAction icon={<BlockIcon />} label="Բլոկավորել" onPress={() => setMenu(false)} />
        <SheetAction icon={<TrashIcon />} label="Ջնջել" danger onPress={() => setMenu(false)} />
      </BottomSheet>
    </SafeAreaView>
  );
};

export default ChatScreen;
