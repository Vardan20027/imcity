import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { PlaySmallIcon, SendIcon } from './icons';
import styles from './styles';

const DEFAULT_BARS = [8, 14, 10, 18, 12, 20, 9, 16, 11, 18, 8, 15, 12, 19, 10];

export const VoiceBubble = ({ id, mine, duration, bars }) => {
  const wave = bars && bars.length ? bars : DEFAULT_BARS;
  return (
    <View style={[styles.bubbleWrap, mine ? styles.bubbleOut : styles.bubbleIn, styles.voice]}>
      <PlaySmallIcon />
      <View style={styles.wave}>
        {wave.map((height, index) => (
          <View
            key={`${id}-${index}`}
            style={[styles.waveBar, mine && styles.waveBarMine, { height: normalize(height) }]}
          />
        ))}
      </View>
      {duration ? (
        <Text style={[styles.voiceTime, mine && styles.voiceTimeMine]}>{duration}</Text>
      ) : null}
    </View>
  );
};

export const ChatComposer = ({
  value,
  onChangeText,
  onSend,
  placeholder = 'Հաղորդագրություն',
}) => (
  <View style={styles.composer}>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={styles.composerInput}
      placeholder={placeholder}
      placeholderTextColor="#B2B2B2"
    />
    <TouchableOpacity style={styles.composerSide} onPress={onSend}>
      <SendIcon />
    </TouchableOpacity>
  </View>
);
