import React, { useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Sound from 'react-native-nitro-sound';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { MicIcon, PauseSmallIcon, PlaySmallIcon, SendIcon, TrashIcon } from './icons';
import styles from './styles';

const DEFAULT_BARS = [8, 14, 10, 18, 12, 20, 9, 16, 11, 18, 8, 15, 12, 19, 10];
const MIN_MS = 400;

const listeners = new Set();
let playback = { id: null, position: 0, duration: 0, playing: false };
let activeId = null;
let recordingNow = false;

const publish = next => {
  playback = next;
  listeners.forEach(listener => listener(playback));
};

const quiet = fn => {
  try {
    return fn();
  } catch (error) {
    return error;
  }
};

const formatClock = ms => {
  const total = Math.max(0, Math.round((ms || 0) / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const levelHeight = metering => {
  const db = typeof metering === 'number' ? metering : -45;
  const level = Math.min(1, Math.max(0, (db + 45) / 45));
  return Math.round(6 + level * 14);
};

const usePlayback = () => {
  const [state, setState] = useState(playback);
  useEffect(() => {
    listeners.add(setState);
    return () => listeners.delete(setState);
  }, []);
  return state;
};

const clearPlaybackListeners = () => {
  quiet(() => Sound.removePlayBackListener());
  quiet(() => Sound.removePlaybackEndListener());
};

export const stopVoice = async () => {
  activeId = null;
  clearPlaybackListeners();
  try {
    await Sound.stopPlayer();
  } catch (error) {
    quiet(() => error);
  }
  publish({ id: null, position: 0, duration: 0, playing: false });
};

const listen = id => {
  activeId = id;
  clearPlaybackListeners();
  Sound.addPlayBackListener(event => {
    if (activeId !== id) {
      return;
    }
    const duration = event.duration || 0;
    const position = event.currentPosition || 0;
    publish({
      id,
      position,
      duration,
      playing: true,
    });
  });
  Sound.addPlaybackEndListener(() => {
    if (activeId !== id) {
      return;
    }
    activeId = null;
    clearPlaybackListeners();
    publish({ id: null, position: 0, duration: 0, playing: false });
  });
};

export const toggleVoice = async (id, uri) => {
  if (!uri || recordingNow) {
    return;
  }
  if (playback.id === id && playback.playing) {
    try {
      await Sound.pausePlayer();
      publish({ ...playback, playing: false });
    } catch (error) {
      quiet(() => error);
    }
    return;
  }
  if (playback.id === id && !playback.playing && playback.position > 0) {
    try {
      listen(id);
      await Sound.resumePlayer();
      publish({ ...playback, playing: true });
      return;
    } catch (error) {
      quiet(() => error);
    }
  }
  await stopVoice();
  publish({ id, position: 0, duration: 0, playing: true });
  try {
    listen(id);
    await Sound.startPlayer(uri);
  } catch (error) {
    quiet(() => error);
    await stopVoice();
  }
};

const ensureMic = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }
  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
    title: 'Խոսափող',
    message: 'Ձայնային հաղորդագրություն ուղարկելու համար թույլատրեք խոսափողի օգտագործումը',
    buttonNegative: 'Չեղարկել',
    buttonPositive: 'Թույլատրել',
  });
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

const isFile = uri => typeof uri === 'string' && uri.includes('/') && !uri.includes('already stopped');

export const useVoiceRecorder = onVoice => {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const elapsedRef = useRef(0);
  const levelsRef = useRef([]);
  const phase = useRef('idle');
  const mounted = useRef(true);
  const onVoiceRef = useRef(onVoice);
  onVoiceRef.current = onVoice;

  const releaseRecorder = async () => {
    let uri = '';
    try {
      uri = await Sound.stopRecorder();
    } catch (error) {
      quiet(() => error);
    }
    quiet(() => Sound.removeRecordBackListener());
    recordingNow = false;
    return uri;
  };

  const finish = async mode => {
    if (phase.current === 'arming') {
      phase.current = mode;
      return;
    }
    if (phase.current !== 'recording') {
      return;
    }
    phase.current = 'stopping';
    const uri = await releaseRecorder();
    const ms = elapsedRef.current;
    const bars = levelsRef.current.slice();
    elapsedRef.current = 0;
    levelsRef.current = [];
    phase.current = 'idle';
    if (mounted.current) {
      setRecording(false);
      setElapsed(0);
    }
    if (mode === 'send' && mounted.current && ms >= MIN_MS && isFile(uri)) {
      onVoiceRef.current({
        uri,
        duration: formatClock(ms),
        bars,
      });
    }
  };

  useEffect(
    () => () => {
      mounted.current = false;
      phase.current = 'cancel';
      recordingNow = false;
      Sound.stopRecorder().catch(() => {});
      quiet(() => Sound.removeRecordBackListener());
      stopVoice();
    },
    [],
  );

  const start = async () => {
    if (phase.current !== 'idle') {
      return;
    }
    phase.current = 'arming';
    recordingNow = true;
    elapsedRef.current = 0;
    levelsRef.current = [];
    setElapsed(0);
    setRecording(true);
    const allowed = await ensureMic();
    if (!allowed || !mounted.current || phase.current === 'cancel') {
      phase.current = 'idle';
      recordingNow = false;
      if (mounted.current) {
        setRecording(false);
        setElapsed(0);
      }
      return;
    }
    await stopVoice();
    if (!mounted.current || phase.current === 'cancel') {
      phase.current = 'idle';
      recordingNow = false;
      if (mounted.current) {
        setRecording(false);
        setElapsed(0);
      }
      return;
    }
    try {
      quiet(() => Sound.setSubscriptionDuration(0.2));
      Sound.addRecordBackListener(event => {
        elapsedRef.current = event.currentPosition || 0;
        setElapsed(elapsedRef.current);
        levelsRef.current = levelsRef.current.concat(levelHeight(event.currentMetering)).slice(-24);
      });
      await Sound.startRecorder(undefined, undefined, true);
      const queued = phase.current;
      if (queued === 'send' || queued === 'cancel') {
        phase.current = 'recording';
        await finish(queued);
        return;
      }
      phase.current = 'recording';
    } catch (error) {
      quiet(() => error);
      phase.current = 'idle';
      recordingNow = false;
      if (mounted.current) {
        setRecording(false);
      }
      quiet(() => Sound.removeRecordBackListener());
    }
  };

  return {
    recording,
    elapsed: formatClock(elapsed),
    start,
    send: () => finish('send'),
    cancel: () => finish('cancel'),
  };
};

const barStyle = (height, mine, played) => [
  styles.waveBar,
  mine && styles.waveBarMine,
  played && (mine ? styles.waveBarPlayedMine : styles.waveBarPlayed),
  { height: normalize(height) },
];

export const VoiceBubble = ({ id, mine, duration, uri, bars }) => {
  const state = usePlayback();
  const active = state.id === id && state.duration > 0;
  const wave = bars && bars.length ? bars : DEFAULT_BARS;
  const played = active ? Math.round((state.position / state.duration) * wave.length) : 0;
  const label = active ? formatClock(state.position) : duration;
  const body = (
    <>
      {state.id === id && state.playing ? <PauseSmallIcon /> : <PlaySmallIcon />}
      <View style={styles.wave}>
        {wave.map((height, index) => (
          <View key={`${id}-${index}`} style={barStyle(height, mine, index < played)} />
        ))}
      </View>
      {label ? <Text style={[styles.voiceTime, mine && styles.voiceTimeMine]}>{label}</Text> : null}
    </>
  );
  const shell = [styles.bubbleWrap, mine ? styles.bubbleOut : styles.bubbleIn, styles.voice];
  if (!uri) {
    return <View style={shell}>{body}</View>;
  }
  return (
    <TouchableOpacity style={shell} activeOpacity={0.85} onPress={() => toggleVoice(id, uri)}>
      {body}
    </TouchableOpacity>
  );
};

export const ChatComposer = ({ value, onChangeText, onSend, onVoice, placeholder = 'Հաղորդագրություն' }) => {
  const voice = useVoiceRecorder(onVoice);
  const onPress = () => {
    if (voice.recording) {
      voice.send();
      return;
    }
    if (value.trim()) {
      onSend();
      return;
    }
    voice.start();
  };
  return (
    <View style={styles.composer}>
      {voice.recording ? (
        <>
          <TouchableOpacity style={styles.composerSide} onPress={voice.cancel}>
            <TrashIcon />
          </TouchableOpacity>
          <View style={styles.recordDot} />
          <Text style={styles.recordTime}>{voice.elapsed}</Text>
        </>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.composerInput}
          placeholder={placeholder}
          placeholderTextColor="#B2B2B2"
        />
      )}
      <TouchableOpacity style={styles.composerSide} onPress={onPress}>
        {voice.recording || value.trim() ? <SendIcon /> : <MicIcon />}
      </TouchableOpacity>
    </View>
  );
};
