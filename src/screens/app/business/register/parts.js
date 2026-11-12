import React, { useEffect, useState } from 'react';
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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import MIcon from '../../../../components/svgs';
import { ICON_NAMES } from '../../../../components/svgs/icon_names';
import { normalize } from '../../../../assets/deviceInfo/normalize';
import { PageHeader, PrimaryButton, BottomSheet } from '../../profile/parts';
import { CATEGORIES, DAYS, HOURS, STEP_COUNT, formatClock } from './data';
import styles from './styles';

const Icon = ({ children }) => (
  <Svg width={normalize(24)} height={normalize(24)} viewBox="0 0 24 24" fill="none">
    {children}
  </Svg>
);

export const BenefitIcon = ({ id }) => {
  const stroke = '#171717';
  if (id === 'visibility') {
    return (
      <Icon>
        <Path d="M3 12C3 12 6.5 6.5 12 6.5C17.5 6.5 21 12 21 12C21 12 17.5 17.5 12 17.5C6.5 17.5 3 12 3 12Z" stroke={stroke} strokeWidth="1.6" />
        <Circle cx="12" cy="12" r="2.4" stroke={stroke} strokeWidth="1.6" />
      </Icon>
    );
  }
  if (id === 'events') {
    return (
      <Icon>
        <Rect x="4" y="5" width="16" height="15" rx="2" stroke={stroke} strokeWidth="1.6" />
        <Path d="M4 10H20" stroke={stroke} strokeWidth="1.6" />
        <Path d="M8 3.5V7M16 3.5V7" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      </Icon>
    );
  }
  if (id === 'feelings') {
    return (
      <Icon>
        <Path
          d="M12 20.5C12 20.5 4.5 16.2 4.5 10.8C4.5 8.4 6.3 6.5 8.6 6.5C10 6.5 11.2 7.2 12 8.3C12.8 7.2 14 6.5 15.4 6.5C17.7 6.5 19.5 8.4 19.5 10.8C19.5 16.2 12 20.5 12 20.5Z"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </Icon>
    );
  }
  if (id === 'visits') {
    return (
      <Icon>
        <Path d="M12 21C12 21 18 15.2 18 10.2C18 6.8 15.3 4 12 4C8.7 4 6 6.8 6 10.2C6 15.2 12 21 12 21Z" stroke={stroke} strokeWidth="1.6" />
        <Circle cx="12" cy="10" r="2" stroke={stroke} strokeWidth="1.6" />
      </Icon>
    );
  }
  return (
    <Icon>
      <Path d="M5 19V13" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M10 19V8" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M15 19V11" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M20 19V5" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
    </Icon>
  );
};

export const CameraBadge = () => (
  <View style={styles.cameraBadge}>
    <Svg width={normalize(16)} height={normalize(16)} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 8.5H6.2C5.5 8.5 5 9 5 9.7V17C5 17.7 5.5 18.2 6.2 18.2H17.8C18.5 18.2 19 17.7 19 17V9.7C19 9 18.5 8.5 17.8 8.5H16L14.6 6.8H9.4L8 8.5Z"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="13" r="2.2" stroke="#FFFFFF" strokeWidth="1.6" />
    </Svg>
  </View>
);

const Check = () => (
  <Svg width={normalize(12)} height={normalize(12)} viewBox="0 0 12 12" fill="none">
    <Path d="M2 6.2L4.6 8.8L10 3.2" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CheckBox = ({ on }) => (
  <View style={[styles.checkBox, on && styles.checkBoxOn]}>{on ? <Check /> : null}</View>
);

export const StepHeader = ({ step, onBack }) => (
  <View style={styles.steps}>
    <View style={styles.stepRow}>
      <TouchableOpacity style={styles.stepBack} onPress={onBack} hitSlop={8}>
        <MIcon name={ICON_NAMES.ARROWS.BACK} width={normalize(22)} height={normalize(22)} />
      </TouchableOpacity>
      <Text style={styles.stepLabel}>{`${step}/${STEP_COUNT}`}</Text>
    </View>
    <View style={styles.segments}>
      {Array.from({ length: STEP_COUNT }).map((_, index) => (
        <View key={index} style={[styles.segment, index < step && styles.segmentOn]} />
      ))}
    </View>
  </View>
);

export const RegScreen = ({
  header,
  step,
  onBack,
  children,
  label = 'Շարունակել',
  onPress,
  disabled,
  scroll = true,
}) => {
  const insets = useSafeAreaInsets();
  const body = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={styles.flex}>{children}</View>
  );
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {header}
        {step ? <StepHeader step={step} onBack={onBack} /> : null}
        {body}
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, normalize(16)) }]}>
          <PrimaryButton label={label} onPress={onPress} disabled={disabled} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export const RegHeader = PageHeader;

export const RegField = ({
  label,
  value,
  onChangeText,
  placeholder,
  onPress,
  keyboardType,
  autoCapitalize = 'none',
  right,
}) => {
  const Box = onPress ? TouchableOpacity : View;
  const pressable = onPress ? { activeOpacity: 0.75, onPress } : null;
  return (
  <View style={styles.field}>
    {label ? <Text style={styles.fieldLabel}>{label}</Text> : null}
    <Box {...pressable} style={styles.fieldBox}>
      {onPress ? (
        <Text style={[styles.fieldValue, !value && styles.placeholder]} numberOfLines={1}>
          {value || placeholder}
        </Text>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#B5B5B5"
          style={styles.fieldInput}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />
      )}
      {right}
    </Box>
  </View>
  );
};

export const LogoPicker = ({ source, onPress }) => (
  <TouchableOpacity style={styles.logoButton} activeOpacity={0.85} onPress={onPress}>
    <View style={styles.logoCircle}>
      {source ? (
        <Image source={source} style={styles.logoImage} />
      ) : (
        <Text style={styles.logoWord}>Logo</Text>
      )}
    </View>
    <CameraBadge />
  </TouchableOpacity>
);

export const RoundButton = ({ label, onPress }) => (
  <TouchableOpacity style={styles.roundBtn} onPress={onPress} activeOpacity={0.75}>
    <Text style={styles.roundLabel}>{label}</Text>
  </TouchableOpacity>
);

export const DaySelect = ({ days, onToggle }) => {
  const label = days.length ? days.join(', ') : 'Օրեր';
  return (
    <TouchableOpacity style={[styles.dayChip, styles.dayColumn]} onPress={onToggle} activeOpacity={0.8}>
      <Text style={[styles.chipText, !days.length && styles.chipMuted]} numberOfLines={1}>
        {label}
      </Text>
      <MIcon name={ICON_NAMES.ARROWS.DOWN} width={normalize(14)} height={normalize(14)} />
    </TouchableOpacity>
  );
};

export const DayMenu = ({ days, onChange }) => (
  <View style={styles.dayMenu}>
    {DAYS.map(day => {
      const on = days.includes(day);
      return (
        <TouchableOpacity
          key={day}
          style={styles.dayOption}
          onPress={() => {
            const next = on ? days.filter(item => item !== day) : [...days, day];
            onChange(next);
          }}
        >
          <Text style={styles.dayOptionText}>{day}</Text>
          <CheckBox on={on} />
        </TouchableOpacity>
      );
    })}
  </View>
);

export const CenterCamera = () => (
  <View style={styles.centerCamera}>
    <Svg width={normalize(16)} height={normalize(16)} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 8.5H6.2C5.5 8.5 5 9 5 9.7V17C5 17.7 5.5 18.2 6.2 18.2H17.8C18.5 18.2 19 17.7 19 17V9.7C19 9 18.5 8.5 17.8 8.5H16L14.6 6.8H9.4L8 8.5Z"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="13" r="2.2" stroke="#FFFFFF" strokeWidth="1.6" />
    </Svg>
  </View>
);

export const CategorySheet = ({ visible, value, onClose, onSelect }) => (
  <BottomSheet visible={visible} onClose={onClose}>
    <Text style={styles.sheetTitle}>Կատեգորիա</Text>
    <ScrollView style={styles.sheetList} keyboardShouldPersistTaps="handled">
      {CATEGORIES.map(item => (
        <TouchableOpacity
          key={item}
          style={styles.categoryRow}
          onPress={() => onSelect(item)}
        >
          <Text style={styles.categoryText}>{item}</Text>
          <CheckBox on={value === item} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  </BottomSheet>
);

export const TimeSheet = ({ visible, start, end, onClose, onConfirm }) => {
  const [from, setFrom] = useState(start);
  const [to, setTo] = useState(end);

  useEffect(() => {
    if (visible) {
      setFrom(start);
      setTo(end);
    }
  }, [visible, start, end]);

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={styles.timeColumns}>
        <View style={styles.timeColumn}>
          <Text style={styles.timeHead}>Սկիզբ</Text>
          <View style={styles.timeSelected}>
            <Text style={styles.timeSelectedText}>{formatClock(from)}</Text>
          </View>
          <ScrollView style={styles.timeList} showsVerticalScrollIndicator={false}>
            {HOURS.map(hour => (
              <TouchableOpacity
                key={`s-${hour}`}
                style={[styles.timeOption, hour === from && styles.timeOptionOn]}
                onPress={() => setFrom(hour)}
              >
                <Text style={[styles.timeOptionText, hour === from && styles.timeOptionTextOn]}>
                  {formatClock(hour)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.timeColumn}>
          <Text style={styles.timeHead}>Ավարտ</Text>
          <View style={styles.timeSelected}>
            <Text style={styles.timeSelectedText}>{formatClock(to)}</Text>
          </View>
          <ScrollView style={styles.timeList} showsVerticalScrollIndicator={false}>
            {HOURS.map(hour => (
              <TouchableOpacity
                key={`e-${hour}`}
                style={[styles.timeOption, hour === to && styles.timeOptionOn]}
                onPress={() => setTo(hour)}
              >
                <Text style={[styles.timeOptionText, hour === to && styles.timeOptionTextOn]}>
                  {formatClock(hour)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.timeActions}>
        <TouchableOpacity style={styles.timeAction} onPress={onClose}>
          <Text style={styles.timeActionText}>Չեղարկել</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.timeAction, styles.timeActionPrimary]}
          onPress={() => onConfirm(from, to)}
        >
          <Text style={[styles.timeActionText, styles.timeActionTextPrimary]}>Հաստատել</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};
