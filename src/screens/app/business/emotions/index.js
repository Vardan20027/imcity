import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MIcon from '../../../../components/svgs';
import { normalize } from '../../../../assets/deviceInfo/normalize';
import { EMOTIONS } from '../../../../constants/emotions/data';
import { CONTACTS, EMOTION_BARS } from '../../profile/data';
import { ChevronRight, SparkleIcon } from '../../profile/icons';
import { PageHeader, Screen, SearchField } from '../../profile/parts';
import profile from '../../profile/styles';
import { useCreatedBusiness } from '../register/store';

const NAMES = [
  'Անի Հովհաննիսյան',
  'Ալեքս Բարսեղյան',
  'Լիլիթ Գևորգյան',
  'Մարիամ Պետրոսյան',
  'Արամ Սարգսյան',
  'Նարե Ավետիսյան',
  'Տիգրան Հակոբյան',
  'Սոնա Մարտիրոսյան',
  'Հայկ Դավթյան',
];

const PEOPLE = NAMES.map((name, index) => ({
  id: `feel-${index}`,
  name,
  avatar: CONTACTS[index % CONTACTS.length].avatar,
  emotion: EMOTIONS[index % EMOTIONS.length],
}));

const fill = (value, color, max) => [
  profile.barFill,
  { width: `${max ? (value / max) * 100 : 0}%`, backgroundColor: color },
];

export const useOwnerEmotions = () => {
  const created = useCreatedBusiness();
  const bars = created ? EMOTION_BARS.map(item => ({ ...item, value: 0 })) : EMOTION_BARS;
  const people = created ? [] : PEOPLE;
  const total = bars.reduce((sum, item) => sum + item.value, 0);
  return { bars, people, total };
};

export const OwnerEmotionsScreen = ({ navigation }) => {
  const { bars, people, total } = useOwnerEmotions();
  const max = Math.max(...bars.map(item => item.value), 1);
  return (
    <Screen scroll>
      <PageHeader title="Էմոցիաներ" onBack={() => navigation.goBack()} />
      <View style={profile.form}>
        <View style={profile.emotionHead}>
          <View style={profile.emotionScore}>
            <SparkleIcon />
            <Text style={profile.emotionScoreText}>{total}</Text>
          </View>
          <Text style={profile.emotionTitle}>Ընդամենը</Text>
        </View>
        {bars.map(bar => (
          <View key={bar.id} style={profile.barRow}>
            <MIcon name={bar.icon} width={normalize(18)} height={normalize(18)} color={bar.color} />
            <View style={profile.barTrack}>
              <View style={fill(bar.value, bar.color, max)} />
            </View>
            <Text style={profile.barValue}>{bar.value}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={profile.settingRow}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('OwnerEmotionPeople')}
        >
          <Text style={profile.settingLabel}>Ովքեր կիսվեցին</Text>
          <View style={profile.emotionScore}>
            <Text style={profile.hint}>{people.length}</Text>
            <ChevronRight />
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export const OwnerEmotionPeopleScreen = ({ navigation }) => {
  const { people } = useOwnerEmotions();
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const list = people.filter(item => !q || item.name.toLowerCase().includes(q));
  return (
    <Screen scroll>
      <PageHeader title="Էմոցիաներ" onBack={() => navigation.goBack()} />
      <Text style={[profile.hint, profile.form]}>{people.length} մարդ</Text>
      <SearchField value={query} onChangeText={setQuery} />
      <View style={profile.form}>
        {list.length ? (
          list.map(item => (
            <View key={item.id} style={profile.personRow}>
              <Image source={item.avatar} style={profile.personAvatar} />
              <View style={profile.personBody}>
                <Text style={profile.personName}>{item.name}</Text>
              </View>
              <MIcon
                name={item.emotion.icon}
                width={normalize(18)}
                height={normalize(18)}
                color={item.emotion.color}
              />
            </View>
          ))
        ) : (
          <Text style={profile.bodyText}>
            {people.length ? 'Ոչինչ չի գտնվել' : 'Դեռ ոչ ոք չի կիսվել էմոցիաներով'}
          </Text>
        )}
      </View>
    </Screen>
  );
};
