import React, { memo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import { EMOTIONS } from '../../../constants/emotions/data';
import {
  FireIcon,
  HeartFillIcon,
  LeafIcon,
  ShareIcon,
} from '../home/icons';
import { SparkleIcon } from '../business/icons';
import { SERVICE_ICONS } from './iconXml';
import styles from './styles';

const CHIP_ICON_BOX = 16;
const CHIP_ICON_NATIVE = {
  [ICON_NAMES.EMOTIONS.CALM]: [19, 19],
  [ICON_NAMES.EMOTIONS.DRIVE]: [12, 18],
  [ICON_NAMES.EMOTIONS.ROMANCE]: [19, 18],
  [ICON_NAMES.EMOTIONS.FUN]: [16, 18],
  [ICON_NAMES.EMOTIONS.DISCOVERY]: [13, 18],
  [ICON_NAMES.EMOTIONS.WORKING]: [17, 15],
  [ICON_NAMES.EMOTIONS.INSPIRATION]: [16, 16],
};

const chipIconSize = icon => {
  const [w, h] = CHIP_ICON_NATIVE[icon] || [16, 16];
  const scale = CHIP_ICON_BOX / Math.max(w, h);
  return { width: normalize(w * scale), height: normalize(h * scale) };
};

const hexToRgba = (hex, alpha) => {
  const n = hex.replace('#', '');
  return `rgba(${parseInt(n.slice(0, 2), 16)},${parseInt(n.slice(2, 4), 16)},${parseInt(
    n.slice(4, 6),
    16,
  )},${alpha})`;
};

export const CHIPS = EMOTIONS.map(c => ({
  ...c,
  label: c.title,
  selectedBg: hexToRgba(c.color, 0.15),
  iconSize: chipIconSize(c.icon),
}));

export const ServiceIcon = ({ name, size = 18 }) => (
  <SvgXml
    xml={SERVICE_ICONS[name]}
    width={normalize(size)}
    height={normalize(size)}
  />
);

export const EmotionMarks = ({ size = 12 }) => (
  <View style={styles.emotions}>
    <LeafIcon width={normalize(size)} height={normalize(size)} />
    <FireIcon width={normalize(size)} height={normalize(size)} />
    <HeartFillIcon width={normalize(size)} height={normalize(size * 0.875)} />
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
      style={styles.searchInput}
      value={value}
      onChangeText={onChangeText}
      returnKeyType="search"
    />
  </View>
);

export const PageHeader = ({ title, onBack, bold }) => (
  <View style={styles.pageHeader}>
    <TouchableOpacity
      style={styles.pageBack}
      onPress={onBack}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      activeOpacity={0.7}
    >
      <MIcon
        name={ICON_NAMES.ARROWS.BACK}
        width={normalize(20)}
        height={normalize(20)}
      />
    </TouchableOpacity>
    <Text style={[styles.pageTitle, bold && styles.pageTitleBold]}>{title}</Text>
  </View>
);

const EmotionChip = memo(({ chip, selected, onToggle }) => (
  <Pressable
    onPress={() => onToggle(chip.id)}
    style={({ pressed }) => [
      styles.chip,
      selected ? { backgroundColor: chip.selectedBg } : styles.chipIdle,
      pressed && styles.chipPressed,
    ]}
  >
    <View style={styles.chipIcon}>
      <MIcon
        name={chip.icon}
        width={chip.iconSize.width}
        height={chip.iconSize.height}
        color={selected ? chip.color : '#7B7B7B'}
      />
    </View>
    <Text
      style={[
        styles.chipLabel,
        selected ? { color: chip.color } : styles.chipLabelIdle,
      ]}
    >
      {chip.label}
    </Text>
  </Pressable>
));

export const EmotionFilters = ({ selectedIds, onToggle }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={styles.chipsContent}
  >
    {CHIPS.map(chip => (
      <EmotionChip
        key={chip.id}
        chip={chip}
        selected={selectedIds.has(chip.id)}
        onToggle={onToggle}
      />
    ))}
  </ScrollView>
);

export const useEmotionFilter = () => {
  const [selectedIds, setSelectedIds] = useState(() => new Set([2, 3, 5]));
  const toggle = id => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  return { selectedIds, toggle };
};

export const EmotionButton = ({ compact, count = '2640' }) => (
  <View style={[styles.emotionButton, compact && styles.emotionButtonCompact]}>
    <SparkleIcon dark />
    {compact ? null : <Text style={styles.emotionLabel}>Էմոցիա</Text>}
    <View style={styles.emotionDivider} />
    <Text style={styles.emotionCount}>{count}</Text>
  </View>
);

export const ShareButton = () => <ShareIcon />;
