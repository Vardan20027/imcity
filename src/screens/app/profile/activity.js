import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { InfoIcon, PinIcon } from './icons';
import { useProfile } from './data';
import { useT } from '../../../locales/useT';
import {
  CenterCard,
  EmotionMarks,
  MemoryGrid,
  PageHeader,
  Screen,
  StatRow,
} from './parts';
import { P } from './routes';
import styles from './styles';

const ringBox = size => [styles.ringCenter, { width: size, height: size }];
const ringColor = color => [styles.ringValue, { color }];

const Ring = ({ progress, color, label }) => {
  const size = normalize(150);
  const stroke = normalize(12);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const cx = size / 2;
  return (
    <View style={styles.ringWrap}>
      <Svg width={size} height={size}>
        <Circle cx={cx} cy={cx} r={r} stroke="#F2F2F2" strokeWidth={stroke} fill="none" />
        <Circle
          cx={cx}
          cy={cx}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={c * (1 - progress)}
          strokeLinecap="round"
          rotation={-90}
          origin={`${cx}, ${cx}`}
        />
      </Svg>
      <View style={ringBox(size)}>
        <Text style={ringColor(color)}>{Math.round(progress * 100)}%</Text>
        <Text style={styles.ringCaption}>{label}</Text>
      </View>
    </View>
  );
};

const ActivityLayout = ({
  navigation,
  title,
  color,
  progress,
  infoTitle,
  infoBody,
  extra,
  stats,
  memories,
}) => {
  const t = useT();
  const [info, setInfo] = useState(false);
  const hasStats = stats && [stats.fire, stats.leaf, stats.heart].some(value => value !== '' && value != null);
  return (
    <Screen scroll>
      <PageHeader title={title} onBack={() => navigation.goBack()} />
      {progress > 0 ? (
        <View>
          <Ring progress={progress} color={color} label={t(title)} />
          <TouchableOpacity style={styles.infoBtn} onPress={() => setInfo(true)}>
            <InfoIcon />
          </TouchableOpacity>
        </View>
      ) : null}
      {progress > 0 ? extra : null}
      {hasStats ? <StatRow fire={stats.fire} leaf={stats.leaf} heart={stats.heart} /> : null}
      {memories?.length ? (
        <MemoryGrid
          items={memories}
          onPress={item => navigation.navigate(P.MEMORY, { memory: item })}
        />
      ) : null}
      <CenterCard visible={info} onClose={() => setInfo(false)}>
        <Text style={styles.infoTitle}>{t(infoTitle)}</Text>
        <Text style={styles.infoBody}>{t(infoBody)}</Text>
      </CenterCard>
    </Screen>
  );
};

const activityStats = user => ({ fire: user.fire, leaf: user.leaf, heart: user.heart });

export const WeeklyScreen = ({ navigation }) => {
  const t = useT();
  const user = useProfile();
  return (
    <ActivityLayout
      navigation={navigation}
      title="Շաբաթական ակտիվություն"
      color="#FF8700"
      progress={Number(user.weekly) || 0}
      infoTitle="Շաբաթական ակտիվություն"
      infoBody="Ակտիվությունը հաշվարկվում է ձեր էմոցիաների, այցելությունների և հիշողությունների հիման վրա։ Որքան շատ եք ներգրավված քաղաքում, այնքան բարձր է ցուցանիշը։"
      stats={activityStats(user)}
      memories={user.memories}
      extra={
        <TouchableOpacity
          style={styles.goldLink}
          onPress={() => navigation.navigate(P.GOLD)}
        >
          <Text style={styles.goldLinkText}>{t('Gold կարգավիճակ')}</Text>
        </TouchableOpacity>
      }
    />
  );
};

export const GoldScreen = ({ navigation }) => {
  const user = useProfile();
  return (
    <ActivityLayout
      navigation={navigation}
      title="Gold կարգավիճակ"
      color="#E0B000"
      progress={Number(user.gold) || 0}
      infoTitle="Gold կարգավիճակ"
      infoBody="Gold կարգավիճակը բացվում է, երբ շաբաթական ակտիվությունը պահպանվում է բարձր մակարդակի վրա։ Այն տալիս է լրացուցիչ տեսանելիություն ձեր հիշողություններին։"
      stats={activityStats(user)}
      memories={user.memories}
    />
  );
};

export const MemoryDetailScreen = ({ navigation, route }) => {
  const t = useT();
  const memory = route.params?.memory;
  return (
    <Screen scroll edges={['top', 'bottom']}>
      <PageHeader title={memory?.place || t('Հիշողություն')} onBack={() => navigation.goBack()} />
      {memory?.image ? (
        <Image source={memory.image} style={styles.detailHero} />
      ) : (
        <View style={styles.detailHero} />
      )}
      <View style={styles.detailBody}>
        <EmotionMarks size={16} />
        <Text style={styles.detailTitle}>{memory?.place}</Text>
        <View style={styles.cityRow}>
          <PinIcon size={14} color="#8E8C8C" />
          <Text style={styles.cityText}>{memory?.city}</Text>
        </View>
        {memory?.description ? <Text style={styles.detailDesc}>{memory.description}</Text> : null}
      </View>
    </Screen>
  );
};
