import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MIcon from '../../../components/svgs';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { EMOTIONS } from '../../../constants/emotions/data';
import { PageHeader, PrimaryButton, SuccessModal, ToggleRow } from '../profile/parts';
import { GALLERY, cycleAsset } from './register/data';
import styles from './owner/styles';

const hotel = require('../../../assets/images/home/hotel.png');

const emotionStyle = (on, color) => [
  styles.emotion,
  on && { backgroundColor: color, borderColor: color },
];

const ShareEmotionsScreen = ({ navigation, route }) => {
  const name = route.params?.name || 'Բիզնես';
  const photo = route.params?.cover || hotel;
  const [extra, setExtra] = useState(null);
  const [picked, setPicked] = useState(() => new Set());
  const [note, setNote] = useState('');
  const [pub, setPub] = useState(true);
  const [done, setDone] = useState(false);

  const toggle = id => {
    setPicked(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader title={name} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.pad} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Կիսվել էմոցիաներով</Text>
        <View style={styles.sharePhotos}>
          <View style={styles.sharePhoto}>
            {photo ? <Image source={photo} style={styles.shareFill} /> : null}
          </View>
          <TouchableOpacity
            style={styles.sharePhoto}
            onPress={() => setExtra(cycleAsset(extra, GALLERY))}
          >
            {extra ? <Image source={extra} style={styles.shareFill} /> : <Text style={styles.plus}>+</Text>}
          </TouchableOpacity>
        </View>
        <Text style={styles.section}>Ի՞նչ զգացիք այստեղ</Text>
        <View style={styles.emotions}>
          {EMOTIONS.map(item => {
            const on = picked.has(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={emotionStyle(on, item.backgroundColor)}
                onPress={() => toggle(item.id)}
              >
                <MIcon
                  name={item.icon}
                  width={normalize(20)}
                  height={normalize(20)}
                  color={on ? item.color : '#7B7B7B'}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.area}>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Գրեք մի քանի բառ"
            placeholderTextColor="#B5B5B5"
            multiline
            style={styles.areaInput}
          />
        </View>
        <ToggleRow label="Հրապարակային" value={pub} onValueChange={setPub} />
        <View style={styles.gap} />
        <PrimaryButton
          label="Կիսվել"
          disabled={!picked.size}
          onPress={() => setDone(true)}
        />
      </ScrollView>
      <SuccessModal
        visible={done}
        title="Հիանալի է"
        message="Դուք կիսվեցիք ձեր զգացողություններով, շարունակեք նման տեմպով"
        onClose={() => {
          setDone(false);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default ShareEmotionsScreen;
