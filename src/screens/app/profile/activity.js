import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { MEMORIES } from './data';
import { InfoIcon, PinIcon } from './icons';
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
}) => {
  const [info, setInfo] = useState(false);
  return (
    <Screen scroll>
      <PageHeader title={title} onBack={() => navigation.goBack()} />
      <View>
        <Ring progress={progress} color={color} label={title} />
        <TouchableOpacity style={styles.infoBtn} onPress={() => setInfo(true)}>
          <InfoIcon />
        </TouchableOpacity>
      </View>
      {extra}
      <StatRow fire="1500" leaf="720" heart="500" />
      <MemoryGrid
        items={MEMORIES}
        onPress={item => navigation.navigate(P.MEMORY, { memory: item })}
      />
      <CenterCard visible={info} onClose={() => setInfo(false)}>
        <Text style={styles.infoTitle}>{infoTitle}</Text>
        <Text style={styles.infoBody}>{infoBody}</Text>
      </CenterCard>
    </Screen>
  );
};

export const WeeklyScreen = ({ navigation }) => (
  <ActivityLayout
    navigation={navigation}
    title="Շաբաթական ակտիվություն"
    color="#FF8700"
    progress={0.68}
    infoTitle="Շաբաթական ակտիվություն"
    infoBody="Ակտիվությունը հաշվարկվում է ձեր էմոցիաների, այցելությունների և հիշողությունների հիման վրա։ Որքան շատ եք ներգրավված քաղաքում, այնքան բարձր է ցուցանիշը։"
    extra={
      <TouchableOpacity
        style={styles.goldLink}
        onPress={() => navigation.navigate(P.GOLD)}
      >
        <Text style={styles.goldLinkText}>Gold կարգավիճակ</Text>
      </TouchableOpacity>
    }
  />
);

export const GoldScreen = ({ navigation }) => (
  <ActivityLayout
    navigation={navigation}
    title="Gold կարգավիճակ"
    color="#E0B000"
    progress={0.82}
    infoTitle="Gold կարգավիճակ"
    infoBody="Gold կարգավիճակը բացվում է, երբ շաբաթական ակտիվությունը պահպանվում է բարձր մակարդակի վրա։ Այն տալիս է լրացուցիչ տեսանելիություն ձեր հիշողություններին։"
  />
);

export const MemoryDetailScreen = ({ navigation, route }) => {
  const memory = route.params?.memory;
  return (
    <Screen scroll edges={['top', 'bottom']}>
      <PageHeader title={memory?.place || 'Հիշողություն'} onBack={() => navigation.goBack()} />
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
        <Text style={styles.detailDesc}>
          Հիանալի տեղ ընկերների հետ ժամանակ անցկացնելու համար։ Գեղեցիկ տեսարան և ջերմ մթնոլորտ։
        </Text>
      </View>
    </Screen>
  );
};
