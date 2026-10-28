import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
  Switch,
  Modal,
  Keyboard,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { FireIcon, HeartFillIcon, LeafIcon } from '../home/icons';
import { EMOTION_BARS } from './data';
import {
  CheckCircleIcon,
  ChevronRight,
  CloseIcon,
  PinIcon,
  SparkleIcon,
} from './icons';
import styles from './styles';

export const Screen = ({ children, scroll, footer, edges = ['top'] }) => (
  <SafeAreaView style={styles.screen} edges={edges}>
    {scroll ? (
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    ) : (
      <View style={styles.flex}>{children}</View>
    )}
    {footer}
  </SafeAreaView>
);

export const PageHeader = ({ title, onBack, right }) => (
  <View>
    <View style={styles.pageHeader}>
      <TouchableOpacity
        onPress={onBack}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.iconBtn}
      >
        <MIcon name={ICON_NAMES.ARROWS.BACK} width={normalize(20)} height={normalize(20)} />
      </TouchableOpacity>
      <Text style={styles.pageTitle} numberOfLines={1}>
        {title}
      </Text>
      {right || <View style={styles.iconBtn} />}
    </View>
  </View>
);

export const SearchField = ({ value, onChangeText, style }) => (
  <View style={[styles.searchBox, style]}>
    <MIcon
      name={ICON_NAMES.SEARCH}
      width={normalize(18)}
      height={normalize(18)}
      color="#B2B2B2"
    />
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={styles.searchInput}
      placeholder=""
      returnKeyType="search"
    />
  </View>
);

export const SegmentTabs = ({ tabs, active, onChange }) => {
  const index = Math.max(
    0,
    tabs.findIndex(tab => tab.key === active),
  );
  return (
    <View style={styles.segments}>
      <View style={styles.segmentRow}>
        {tabs.map(tab => {
          const on = tab.key === active;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.segmentBtn}
              onPress={() => onChange(tab.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.segmentLabel, on && styles.segmentLabelOn]}>
                {tab.label}
              </Text>
              {tab.badge ? (
                <View style={styles.countBubble}>
                  <Text style={styles.countBubbleText}>{tab.badge}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.segmentTrack}>
        <View style={[styles.segmentThumb, index === 1 && styles.segmentThumbSecond]} />
      </View>
    </View>
  );
};

export const Avatar = ({ source, size, style }) => {
  const box = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#E6E6E6',
  };
  if (!source) {
    return <View style={[box, style]} />;
  }
  return <Image source={source} style={[box, style]} />;
};

export const EmotionMarks = ({ size = 12 }) => (
  <View style={styles.emotionRow}>
    <LeafIcon width={normalize(size)} height={normalize(size)} />
    <FireIcon width={normalize(size)} height={normalize(size)} />
    <HeartFillIcon width={normalize(size)} height={normalize(size * 0.875)} />
  </View>
);

export const MemoryGrid = ({ items, onPress }) => (
  <View style={styles.memoryGrid}>
    {items.map(item => (
      <TouchableOpacity
        key={item.id}
        style={styles.memoryCard}
        activeOpacity={0.85}
        onPress={() => onPress?.(item)}
      >
        {item.image ? (
          <Image source={item.image} style={styles.memoryPhoto} />
        ) : (
          <View style={styles.memoryPhoto} />
        )}
        <View style={styles.memoryMeta}>
          <EmotionMarks size={12} />
          <View style={styles.cityRow}>
            <PinIcon size={10} color="#979797" />
            <Text style={styles.memoryCity}>{item.city}</Text>
          </View>
        </View>
        <View style={styles.memoryPlace}>
          {item.logo ? (
            <Image source={item.logo} style={styles.memoryLogo} />
          ) : (
            <View style={styles.memoryLogo} />
          )}
          <Text style={styles.memoryPlaceText} numberOfLines={1}>
            {item.place}
          </Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

export const StatRow = ({ fire, leaf, heart }) => (
  <View style={styles.stats}>
    <View style={styles.stat}>
      <FireIcon width={normalize(24)} height={normalize(24)} />
      <Text style={styles.statValue}>{fire}</Text>
    </View>
    <View style={styles.statDivider} />
    <View style={styles.stat}>
      <LeafIcon width={normalize(24)} height={normalize(24)} />
      <Text style={styles.statValue}>{leaf}</Text>
    </View>
    <View style={styles.statDivider} />
    <View style={styles.stat}>
      <HeartFillIcon width={normalize(24)} height={normalize(21)} />
      <Text style={styles.statValue}>{heart}</Text>
    </View>
  </View>
);

const sheetBottom = inset => ({
  paddingBottom: normalize(20) + inset,
});

const keyboardPad = height => (height > 0 ? { paddingBottom: height } : null);

export const BottomSheet = ({ visible, onClose, children, style }) => {
  const insets = useSafeAreaInsets();
  const [keyboard, setKeyboard] = useState(0);

  useEffect(() => {
    if (!visible) {
      setKeyboard(0);
      return undefined;
    }
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const show = Keyboard.addListener(showEvent, event => {
      setKeyboard(event.endCoordinates.height);
    });
    const hide = Keyboard.addListener(hideEvent, () => setKeyboard(0));
    return () => {
      show.remove();
      hide.remove();
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, keyboardPad(keyboard)]}>
        <Pressable style={styles.dim} onPress={onClose} />
        <View style={[styles.sheet, sheetBottom(insets.bottom), style]}>
          <View style={styles.handle} />
          {children}
        </View>
      </View>
    </Modal>
  );
};

export const SheetAction = ({ icon, label, danger, onPress }) => (
  <TouchableOpacity style={styles.sheetAction} onPress={onPress} activeOpacity={0.7}>
    {icon}
    <Text style={[styles.sheetLabel, danger && styles.danger]}>{label}</Text>
  </TouchableOpacity>
);

export const SuccessModal = ({ visible, title, message, onClose }) => {
  if (!visible) {
    return null;
  }
  return (
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.dialogWrap}>
        <Pressable style={styles.dialogDim} onPress={onClose} />
        <View style={styles.dialog}>
          <TouchableOpacity style={styles.dialogClose} onPress={onClose}>
            <CloseIcon />
          </TouchableOpacity>
          <CheckCircleIcon />
          <Text style={styles.dialogTitle}>{title}</Text>
          {message ? <Text style={styles.dialogBody}>{message}</Text> : null}
        </View>
      </View>
    </Modal>
  );
};

export const CenterCard = ({ visible, onClose, children }) => {
  if (!visible) {
    return null;
  }
  return (
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.dialogWrap}>
        <Pressable style={styles.dialogDim} onPress={onClose} />
        <View style={styles.dialog}>{children}</View>
      </View>
    </Modal>
  );
};

const barFill = (value, color) => [
  styles.barFill,
  { width: `${(value / 40) * 100}%`, backgroundColor: color },
];

export const EmotionSheet = ({ visible, onClose, score = '2500' }) => (
  <BottomSheet visible={visible} onClose={onClose}>
    <View style={styles.emotionHead}>
      <View style={styles.emotionScore}>
        <SparkleIcon />
        <Text style={styles.emotionScoreText}>{score}</Text>
      </View>
      <Text style={styles.emotionTitle}>Էմոցիաներ</Text>
    </View>
    {EMOTION_BARS.map(bar => (
      <View key={bar.id} style={styles.barRow}>
        <MIcon name={bar.icon} width={normalize(18)} height={normalize(18)} color={bar.color} />
        <View style={styles.barTrack}>
          <View style={barFill(bar.value, bar.color)} />
        </View>
        <Text style={styles.barValue}>{bar.value}</Text>
      </View>
    ))}
  </BottomSheet>
);

export const PrimaryButton = ({ label, onPress, disabled, style }) => (
  <TouchableOpacity
    style={[styles.primary, disabled && styles.primaryDisabled, style]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.85}
  >
    <Text style={[styles.primaryText, disabled && styles.primaryTextDisabled]}>{label}</Text>
  </TouchableOpacity>
);

export const SettingRow = ({ icon, label, onPress, danger, labelStyle }) => (
  <TouchableOpacity style={styles.settingRow} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.settingLeft}>
      {icon}
      <Text style={[styles.settingLabel, danger && styles.danger, labelStyle]}>{label}</Text>
    </View>
    {danger ? null : <ChevronRight />}
  </TouchableOpacity>
);

export const ToggleRow = ({ label, value, onValueChange }) => (
  <View style={styles.toggleRow}>
    <Text style={styles.settingLabel}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#E5E5E5', true: '#FF8700' }}
      thumbColor="#FFFFFF"
    />
  </View>
);

export const Field = ({
  label,
  value,
  onChangeText,
  onPress,
  icon,
  secure,
  right,
  editable = true,
}) => (
  <View style={styles.field}>
    {label ? <Text style={styles.fieldLabel}>{label}</Text> : null}
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      style={styles.fieldBox}
    >
      {onPress || !editable ? (
        <Text style={styles.fieldValue}>{value}</Text>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.fieldInput}
          secureTextEntry={secure}
          autoCapitalize="none"
        />
      )}
      {icon}
      {right}
    </TouchableOpacity>
  </View>
);
