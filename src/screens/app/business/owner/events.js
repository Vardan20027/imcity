import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MIcon from '../../../../components/svgs';
import { normalize } from '../../../../assets/deviceInfo/normalize';
import { EMOTIONS } from '../../../../constants/emotions/data';
import { CONTACTS } from '../../profile/data';
import { PageHeader, PrimaryButton, BottomSheet, SheetAction } from '../../profile/parts';
import { PencilIcon, ShareIcon, TrashIcon } from '../../profile/icons';
import { PinIcon } from '../icons';
import { GALLERY, cycleAsset } from '../register/data';
import { RegField } from '../register/parts';
import { saveOwnerEvents, useOwnerEvents } from './store';
import styles from './styles';

const NAMES = [
  'Անի Հովհաննիսյան',
  'Ալեքս Բարսեղյան',
  'Լիլիթ Գևորգյան',
  'Մարիամ Պետրոսյան',
  'Արամ Սարգսյան',
  'Նարե Ավետիսյան',
  'Տիգրան Հակոբյան',
];

const emotionStyle = (on, color) => [
  styles.emotion,
  on && { backgroundColor: color, borderColor: color },
];

export const EventPane = ({ navigation }) => {
  const events = useOwnerEvents();
  return (
    <View>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('OwnerEventForm')}
      >
        <Text style={styles.addBtnText}>Ավելացնել միջոցառում</Text>
      </TouchableOpacity>
      {events.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('OwnerEventDetail', { id: item.id })}
        >
          {item.cover ? <Image source={item.cover} style={styles.cover} /> : <View style={styles.cover} />}
          <View style={styles.cardBody}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.meta}>
              {[item.date, item.time, item.countdown].filter(Boolean).join(' · ')}
            </Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {!events.length ? <Text style={styles.hint}>Միջոցառումներ դեռ չկան</Text> : null}
    </View>
  );
};

export const EventFormScreen = ({ navigation, route }) => {
  const events = useOwnerEvents();
  const current = events.find(item => item.id === route.params?.id);
  const [cover, setCover] = useState(current?.cover || null);
  const [name, setName] = useState(current?.name || '');
  const [date, setDate] = useState(current?.date || '');
  const [time, setTime] = useState(current?.time || '');
  const [price, setPrice] = useState(current?.price || '');
  const [location, setLocation] = useState(current?.location || '');
  const [description, setDescription] = useState(current?.description || '');
  const [picked, setPicked] = useState(() => new Set(current?.emotions || []));

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

  const save = () => {
    const next = {
      id: current?.id || `event-${Date.now()}`,
      name: name.trim(),
      date,
      time,
      price,
      location,
      description,
      cover,
      countdown: current?.countdown || '',
      past: current?.past || false,
      joined: current?.joined || '0',
      emotions: [...picked],
    };
    const list = current
      ? events.map(item => (item.id === current.id ? next : item))
      : [next, ...events];
    saveOwnerEvents(list);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader
        title={current ? 'Խմբագրել' : 'Ավելացնել միջոցառում'}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.pad} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.hero} onPress={() => setCover(cycleAsset(cover, GALLERY))}>
          {cover ? <Image source={cover} style={styles.heroFill} /> : <Text style={styles.plus}>+</Text>}
        </TouchableOpacity>
        <View style={styles.block}>
          <Text style={styles.label}>Էմոցիա</Text>
          <View style={styles.emotions}>
            {EMOTIONS.map(item => {
              const on = picked.has(item.id);
              return (
                <TouchableOpacity key={item.id} style={emotionStyle(on, item.backgroundColor)} onPress={() => toggle(item.id)}>
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
          <RegField label="Անվանում" value={name} onChangeText={setName} />
          <RegField label="Ամսաթիվ" value={date} onChangeText={setDate} />
          <RegField label="Ժամ" value={time} onChangeText={setTime} />
          <RegField label="Գին" value={price} onChangeText={setPrice} />
          <TouchableOpacity style={styles.map} onPress={() => setLocation('Երևան')}>
            <PinIcon />
            <Text style={styles.hint}>{location || 'Նշեք վայրը'}</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Նկարագրություն</Text>
          <View style={styles.area}>
            <TextInput
              value={description}
              onChangeText={setDescription}
              multiline
              style={styles.areaInput}
            />
          </View>
          <PrimaryButton label="Պահպանել" disabled={!name.trim()} onPress={save} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const EventDetailScreen = ({ navigation, route }) => {
  const events = useOwnerEvents();
  const event = events.find(item => item.id === route.params?.id);
  const [menu, setMenu] = useState(false);
  const [confirm, setConfirm] = useState(false);
  if (!event) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <PageHeader title="Միջոցառում" onBack={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }
  const remove = () => {
    saveOwnerEvents(events.filter(item => item.id !== event.id));
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader
        title={event.name}
        onBack={() => navigation.goBack()}
        right={
          <TouchableOpacity onPress={() => setMenu(true)}>
            <Text style={styles.title}>•••</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView>
        {event.cover ? <Image source={event.cover} style={styles.hero} /> : <View style={styles.hero} />}
        <View style={styles.block}>
          <View style={styles.pills}>
            {event.date ? (
              <View style={styles.pill}>
                <Text style={styles.pillText}>{event.date} {event.time}</Text>
              </View>
            ) : null}
            {event.countdown ? (
              <View style={styles.pill}>
                <Text style={styles.pillText}>{event.countdown}</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.body}>{event.description}</Text>
          {event.location ? (
            <View style={styles.row}>
              <PinIcon />
              <Text style={styles.meta}>{event.location}</Text>
            </View>
          ) : null}
          <Text style={styles.price}>{event.price}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerParticipants', { count: event.joined })}>
            <Text style={styles.label}>Մասնակիցներ {event.joined}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomSheet visible={menu} onClose={() => setMenu(false)}>
        <SheetAction
          icon={<PencilIcon />}
          label="Խմբագրել"
          onPress={() => {
            setMenu(false);
            navigation.navigate('OwnerEventForm', { id: event.id });
          }}
        />
        <SheetAction
          icon={<ShareIcon />}
          label="Վիճակագրություն"
          onPress={() => {
            setMenu(false);
            navigation.navigate('OwnerEventStats', { id: event.id });
          }}
        />
        <SheetAction
          icon={<TrashIcon />}
          label="Ջնջել"
          danger
          onPress={() => {
            setMenu(false);
            setConfirm(true);
          }}
        />
      </BottomSheet>
      <BottomSheet visible={confirm} onClose={() => setConfirm(false)}>
        <Text style={styles.sheetText}>Ջնջե՞լ իրադարձությունը: Այս գործողությունը հնարավոր չի լինի հետարկել:</Text>
        <View style={styles.gap} />
        <PrimaryButton label="Ջնջել" onPress={remove} />
      </BottomSheet>
    </SafeAreaView>
  );
};

export const EventStatsScreen = ({ navigation, route }) => {
  const events = useOwnerEvents();
  const event = events.find(item => item.id === route.params?.id);
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader title="Միջոցառման վիճակագրություն" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.pad}>
        {event?.cover ? <Image source={event.cover} style={styles.cover} /> : <View style={styles.cover} />}
        <View style={styles.statLine}>
          <Text style={styles.label}>Մասնակիցներ</Text>
          <Text style={styles.value}>{event?.joined || '0'}</Text>
        </View>
        <View style={styles.statLine}>
          <Text style={styles.label}>Էմոցիաներ</Text>
          <Text style={styles.value}>{event?.emotions?.length || 0}</Text>
        </View>
        <View style={styles.statLine}>
          <Text style={styles.label}>Գին</Text>
          <Text style={styles.value}>{event?.price || '—'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const ParticipantsScreen = ({ navigation, route }) => {
  const count = route.params?.count || '0';
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader title="Մասնակիցներ" onBack={() => navigation.goBack()} />
      <Text style={[styles.hint, styles.pad]}>{count} մասնակից</Text>
      <ScrollView contentContainerStyle={styles.pad}>
        {NAMES.map((name, index) => (
          <View key={name} style={styles.statLine}>
            <Image source={CONTACTS[index % CONTACTS.length].avatar} style={styles.avatar} />
            <Text style={styles.personName}>{name}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
