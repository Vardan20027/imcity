import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
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
  MicIcon,
  PlaySmallIcon,
  SendIcon,
  ShareIcon,
  TrashIcon,
} from './icons';
import { BottomSheet, SheetAction } from './parts';
import styles from './styles';

const bars = [8, 14, 10, 18, 12, 20, 9, 16, 11, 18, 8, 15, 12, 19, 10];

const waveStyle = (height, mine) => [
  styles.waveBar,
  mine && styles.waveBarMine,
  { height: normalize(height) },
];

const Voice = ({ mine, duration }) => (
  <View style={[styles.bubbleWrap, mine ? styles.bubbleOut : styles.bubbleIn, styles.voice]}>
    <PlaySmallIcon />
    <View style={styles.wave}>
      {bars.map((height, index) => (
        <View key={`${height}-${index}`} style={waveStyle(height, mine)} />
      ))}
    </View>
    <Text style={[styles.voiceTime, mine && styles.voiceTimeMine]}>{duration}</Text>
  </View>
);

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
              return <Voice key={item.id} mine={item.mine} duration={item.duration} />;
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
        <View style={styles.composer}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={styles.composerInput}
            placeholder="Հաղորդագրություն"
            placeholderTextColor="#B2B2B2"
          />
          <TouchableOpacity onPress={send}>
            {text.trim() ? <SendIcon /> : <MicIcon />}
          </TouchableOpacity>
        </View>
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
