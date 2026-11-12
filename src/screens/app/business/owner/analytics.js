import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Polyline } from 'react-native-svg';
import MIcon from '../../../../components/svgs';
import { normalize } from '../../../../assets/deviceInfo/normalize';
import { EMOTIONS } from '../../../../constants/emotions/data';
import { PageHeader } from '../../profile/parts';
import CalendarModal from '../../../../components/calendar/calendarModal';
import { useCreatedBusiness } from '../register/store';
import { useOwnerEvents } from './store';
import styles from './styles';

const PERIODS = ['7 օր', '28 օր', '3 ամիս', '12 ամիս'];
const TABS = [
  { id: 'emotions', label: 'Էմոցիաներ' },
  { id: 'reach', label: 'Տեսանելիություն' },
  { id: 'events', label: 'Միջոցառումներ' },
  { id: 'audience', label: 'Լսարան' },
];
const DAYS = ['1', '2', '3', '4', '5', '6', '7'];
const HEIGHTS = [40, 78, 52, 120, 88, 96, 46];
const LEGEND = [1504, 235, 311, 254, 235, 235, 235];
const BARS = [32, 40, 8, 15, 12, 10, 38];
const CITIES = [
  { name: 'Երևան', value: '42%' },
  { name: 'Գյումրի', value: '36%' },
  { name: 'Վանաձոր', value: '24%' },
  { name: 'Կապան', value: '20%' },
  { name: 'Դիլիջան', value: '12%' },
  { name: 'Այլ քաղ.', value: '5%' },
];
const VISITORS = [
  { label: 'Գոլդ օգտատեր', value: '1000', share: '(25%)', tint: '#FF8700' },
  { label: 'Օգտատեր', value: '1045', share: '(75%)', tint: '#171717' },
  { label: 'Նոր օգտատեր', value: '104', share: '(25%)', tint: '#171717' },
];
const HOURS = ['00:00', '06:00', '12:00', '18:00', '24:00'];
const LINE = [40, 70, 120, 90, 150, 80, 46];

const showNum = (live, value) => (live ? value : '0');
const meterStyle = (live, value, color) => [
  styles.meterFill,
  { width: live ? `${(value / 40) * 100}%` : '0%', backgroundColor: color },
];
const genderSlice = (width, color) => [styles.genderFill, { width, backgroundColor: color }];

const Donut = ({ total, caption, live }) => {
  const size = normalize(193);
  const stroke = normalize(18);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const cx = size / 2;
  const slices = EMOTIONS.map((item, index) => ({
    color: item.color,
    share: live ? LEGEND[index] / LEGEND.reduce((sum, n) => sum + n, 0) : 0,
  }));
  let cursor = 0;
  return (
    <View style={styles.donutWrap}>
      <Svg width={size} height={size}>
        <Circle cx={cx} cy={cx} r={r} stroke="#F4F4F4" strokeWidth={stroke} fill="none" />
        {slices.map(slice => {
          const length = c * slice.share;
          const node = (
            <Circle
              key={slice.color}
              cx={cx}
              cy={cx}
              r={r}
              stroke={slice.color}
              strokeWidth={stroke}
              fill="none"
              strokeDasharray={`${length} ${c - length}`}
              strokeDashoffset={-cursor}
              strokeLinecap="butt"
              rotation={-90}
              origin={`${cx}, ${cx}`}
            />
          );
          cursor += length;
          return node;
        })}
      </Svg>
      <View style={styles.donutLabel}>
        <Text style={styles.donutValue}>{showNum(live, total)}</Text>
        <Text style={styles.donutSub}>{caption}</Text>
      </View>
    </View>
  );
};

const HoursChart = () => {
  const width = normalize(250);
  const height = normalize(160);
  const points = LINE.map((value, index) => {
    const x = (index / (LINE.length - 1)) * width;
    const y = height - (value / 160) * height;
    return `${x},${y}`;
  }).join(' ');
  return (
    <View style={styles.hoursCard}>
      <View style={styles.hoursIcons}>
        {EMOTIONS.map(item => (
          <MIcon key={item.id} name={item.icon} width={normalize(16)} height={normalize(16)} color={item.color} />
        ))}
      </View>
      <View style={styles.hoursPlot}>
        <Svg width={width} height={height}>
          <Polyline points={points} fill="none" stroke="#46A3F4" strokeWidth={2} />
          <Path d={`M0,${height * 0.35} H${width}`} stroke="#EDEDED" strokeWidth={1} />
          <Path d={`M0,${height * 0.62} H${width}`} stroke="#EDEDED" strokeWidth={1} />
        </Svg>
        <View style={styles.hoursAxis}>
          {HOURS.map(item => (
            <Text key={item} style={styles.axisText}>{item}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export const AnalyticsScreen = ({ navigation }) => {
  const created = useCreatedBusiness();
  const events = useOwnerEvents();
  const live = !created;
  const [tab, setTab] = useState('emotions');
  const [period, setPeriod] = useState('7 օր');
  const [periodOpen, setPeriodOpen] = useState(false);
  const [calendar, setCalendar] = useState(false);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader title="Վիճակագրություն" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.pad}>
        <View style={styles.analyticsTools}>
          <TouchableOpacity style={styles.periodBtn} onPress={() => setPeriodOpen(value => !value)}>
            <Text style={styles.periodText}>{period}</Text>
            <Text style={styles.periodCaret}>▾</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calendarBtn} onPress={() => setCalendar(true)}>
            <Text style={styles.periodCaret}>▦</Text>
          </TouchableOpacity>
        </View>
        {periodOpen ? (
          <View style={styles.periodMenu}>
            {PERIODS.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.periodOption}
                onPress={() => {
                  setPeriod(item);
                  setPeriodOpen(false);
                }}
              >
                <Text style={styles.periodText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
        <View style={styles.analyticsTabs}>
          {TABS.map(item => {
            const on = item.id === tab;
            return (
              <TouchableOpacity key={item.id} onPress={() => setTab(item.id)} style={styles.analyticsTab}>
                <Text style={[styles.analyticsTabText, on && styles.analyticsTabTextOn]}>{item.label}</Text>
                {on ? <View style={styles.analyticsTabLine} /> : null}
              </TouchableOpacity>
            );
          })}
        </View>

        {tab === 'emotions' ? (
          <>
            <Text style={styles.section}>Էմոցիաներ</Text>
            <Donut total="5360" caption={live ? 'Միջոցառումներ 42%' : 'Միջոցառումներ 0%'} live={live} />
            <View style={styles.legend}>
              {EMOTIONS.map((item, index) => (
                <View key={item.id} style={styles.legendItem}>
                  <MIcon name={item.icon} width={normalize(16)} height={normalize(16)} color={item.color} />
                  <Text style={styles.legendValue}>{showNum(live, LEGEND[index])}</Text>
                </View>
              ))}
            </View>
            <View style={styles.chart}>
              {HEIGHTS.map((height, index) => (
                <View key={DAYS[index]} style={[styles.bar, { height: normalize(live ? height : 8) }]} />
              ))}
            </View>
            <View style={styles.axis}>
              {DAYS.map(day => (
                <Text key={day} style={styles.axisText}>{day}</Text>
              ))}
            </View>
            {VISITORS.map(item => (
              <View key={item.label} style={styles.statLine}>
                <Text style={[styles.label, { color: item.tint }]}>{item.label}</Text>
                <Text style={styles.mutedValue}>
                  {showNum(live, item.value)} <Text style={styles.share}>{live ? item.share : '(0%)'}</Text>
                </Text>
              </View>
            ))}
            <Text style={styles.section}>Ակտիվության ժամեր</Text>
            <HoursChart />
            <View style={styles.repeatRow}>
              <Text style={styles.section}>Կրկնակի այցեր</Text>
              <View style={styles.repeatPill}>
                <Text style={styles.repeatValue}>{showNum(live, '168')}</Text>
                <Text style={styles.repeatDelta}>{live ? '+25%' : '0%'}</Text>
              </View>
            </View>
            {EMOTIONS.map((item, index) => (
              <View key={`bar-${item.id}`} style={styles.emotionMeter}>
                <MIcon name={item.icon} width={normalize(16)} height={normalize(16)} color={item.color} />
                <View style={styles.meterTrack}>
                  <View style={meterStyle(live, BARS[index], item.color)} />
                </View>
                <Text style={styles.legendValue}>{showNum(live, BARS[index])}</Text>
              </View>
            ))}
          </>
        ) : null}

        {tab === 'reach' ? (
          <>
            <Text style={styles.section}>Տեսանելիություն</Text>
            <View style={styles.chart}>
              {HEIGHTS.map((height, index) => (
                <View key={DAYS[index]} style={[styles.bar, { height: normalize(live ? height : 8) }]} />
              ))}
            </View>
            <View style={styles.axis}>
              {['0 K', '1 K', '5 K', '10 K'].map(item => (
                <Text key={item} style={styles.axisText}>{live ? item : '0'}</Text>
              ))}
            </View>
            <View style={styles.axis}>
              {DAYS.map(day => (
                <Text key={day} style={styles.axisText}>{day}</Text>
              ))}
            </View>
          </>
        ) : null}

        {tab === 'events' ? (
          <>
            <Text style={styles.section}>Միջոցառումներ</Text>
            {events.length ? (
              events.map(event => (
                <View key={event.id} style={styles.statLine}>
                  <Text style={styles.label}>{event.name}</Text>
                  <Text style={styles.value}>{showNum(live, event.joined || '0')}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.hint}>Միջոցառումներ դեռ չկան</Text>
            )}
          </>
        ) : null}

        {tab === 'audience' ? (
          <>
            <Text style={styles.section}>Սեռ</Text>
            <View style={styles.gender}>
              {live ? (
                <>
                  <View style={genderSlice('62%', '#FF8700')} />
                  <View style={genderSlice('35%', '#46A3F4')} />
                  <View style={genderSlice('3%', '#E5E5EA')} />
                </>
              ) : (
                <View style={[styles.genderFill, styles.genderEmpty]} />
              )}
            </View>
            <View style={styles.statLine}>
              <Text style={styles.label}>Իգական</Text>
              <Text style={styles.value}>{live ? '62%' : '0%'}</Text>
            </View>
            <View style={styles.statLine}>
              <Text style={styles.label}>Արական</Text>
              <Text style={styles.value}>{live ? '35%' : '0%'}</Text>
            </View>
            <View style={styles.statLine}>
              <Text style={styles.label}>Այլ</Text>
              <Text style={styles.value}>{live ? '3%' : '0%'}</Text>
            </View>
            <Text style={styles.section}>Քաղաքներ</Text>
            {CITIES.map(city => (
              <View key={city.name} style={styles.statLine}>
                <Text style={styles.label}>{city.name}</Text>
                <Text style={styles.value}>{live ? city.value : '0%'}</Text>
              </View>
            ))}
          </>
        ) : null}
      </ScrollView>
      <CalendarModal
        visible={calendar}
        onClose={() => setCalendar(false)}
        onConfirm={date => {
          const day = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
          setPeriod(day);
          setCalendar(false);
        }}
      />
    </SafeAreaView>
  );
};
