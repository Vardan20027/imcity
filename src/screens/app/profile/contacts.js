import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CONTACTS, SUGGESTED } from './data';
import { BlockIcon, DotsIcon, PlusBoxIcon, TrashIcon } from './icons';
import {
  BottomSheet,
  EmotionMarks,
  PageHeader,
  SearchField,
  SegmentTabs,
  SheetAction,
  SuccessModal,
} from './parts';
import { P } from './routes';
import styles from './styles';

const ContactsScreen = ({ navigation }) => {
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');
  const [contacts, setContacts] = useState(CONTACTS);
  const [menu, setMenu] = useState(null);
  const [sent, setSent] = useState(false);
  const q = query.trim().toLowerCase();
  const all = contacts.filter(item => !q || item.name.toLowerCase().includes(q));
  const suggested = SUGGESTED.filter(item => !q || item.name.toLowerCase().includes(q));

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader title={`Կոնտակտներ (${contacts.length})`} onBack={() => navigation.goBack()} />
      <SearchField value={query} onChangeText={setQuery} />
      <SegmentTabs
        tabs={[
          { key: 'all', label: 'Բոլորը' },
          { key: 'suggested', label: 'Առաջարկվող' },
        ]}
        active={tab}
        onChange={setTab}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      >
        {tab === 'all'
          ? all.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.personRow}
                activeOpacity={0.75}
                onPress={() => navigation.navigate(P.FRIEND, { user: item.user })}
              >
                <Image source={item.avatar} style={styles.personAvatar} />
                <View style={styles.personBody}>
                  <Text style={styles.personName}>{item.name}</Text>
                  <EmotionMarks size={14} />
                </View>
                <TouchableOpacity
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  onPress={() => setMenu(item)}
                >
                  <DotsIcon />
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          : suggested.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.personRow}
                activeOpacity={0.75}
                onPress={() => navigation.navigate(P.FRIEND, { user: item.user })}
              >
                <Image source={item.avatar} style={styles.personAvatar} />
                <View style={styles.personBody}>
                  <View style={styles.suggestedTitle}>
                    <EmotionMarks size={14} />
                    <Text style={styles.personName}>{item.name}</Text>
                  </View>
                  <Text style={styles.personSub}>{item.mutual}</Text>
                </View>
                <TouchableOpacity onPress={() => setSent(true)}>
                  <PlusBoxIcon />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
      </ScrollView>
      <BottomSheet visible={!!menu} onClose={() => setMenu(null)}>
        <SheetAction icon={<BlockIcon />} label="Բլոկավորել" onPress={() => setMenu(null)} />
        <SheetAction
          icon={<TrashIcon />}
          label="Ջնջել"
          danger
          onPress={() => {
            setContacts(list => list.filter(item => item.id !== menu?.id));
            setMenu(null);
          }}
        />
      </BottomSheet>
      <SuccessModal
        visible={sent}
        title="Հրավերն ուղարկվել է"
        message="Կստանաք ծանուցում, երբ հրավերն ընդունվի"
        onClose={() => setSent(false)}
      />
    </SafeAreaView>
  );
};

export default ContactsScreen;
