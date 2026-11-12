import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageHeader, PrimaryButton, BottomSheet, SheetAction } from '../../profile/parts';
import { PencilIcon, ShareIcon, TrashIcon } from '../../profile/icons';
import { GALLERY, cycleAsset } from '../register/data';
import { RegField } from '../register/parts';
import { saveOwnerLists, useOwnerLists } from './store';
import styles from './styles';

export const ListPane = ({ navigation }) => {
  const lists = useOwnerLists();
  return (
    <View>
      {lists.length ? (
        <View style={styles.block}>
          <PrimaryButton label="Ավելացնել" onPress={() => navigation.navigate('OwnerListForm')} />
        </View>
      ) : (
        <TouchableOpacity style={styles.drop} onPress={() => navigation.navigate('OwnerListForm')}>
          <Text style={styles.plus}>+</Text>
          <Text style={styles.hint}>Ավելացնել առաջարկ</Text>
        </TouchableOpacity>
      )}
      {lists.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('OwnerListDetail', { id: item.id })}
        >
          {item.image ? <Image source={item.image} style={styles.cover} /> : <View style={styles.cover} />}
          <View style={styles.cardBody}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body} numberOfLines={3}>{item.description}</Text>
            <View style={styles.row}>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.meta}>{item.views ? `${item.views} դիտում` : ''}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const ListFormScreen = ({ navigation, route }) => {
  const lists = useOwnerLists();
  const current = lists.find(item => item.id === route.params?.id);
  const [image, setImage] = useState(current?.image || null);
  const [title, setTitle] = useState(current?.title || '');
  const [description, setDescription] = useState(current?.description || '');
  const [price, setPrice] = useState(current?.price || '');

  const save = () => {
    const next = {
      id: current?.id || `list-${Date.now()}`,
      title: title.trim(),
      description,
      price,
      image,
      views: current?.views || '0',
      comments: current?.comments || '0',
    };
    const items = current
      ? lists.map(item => (item.id === current.id ? next : item))
      : [next, ...lists];
    saveOwnerLists(items);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader
        title={current ? 'Խմբագրել' : 'Ավելացնել առաջարկ'}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.pad} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.hero} onPress={() => setImage(cycleAsset(image, GALLERY))}>
          {image ? <Image source={image} style={styles.heroFill} /> : <Text style={styles.plus}>+</Text>}
        </TouchableOpacity>
        <View style={styles.block}>
          <RegField label="Անվանում" value={title} onChangeText={setTitle} />
          <Text style={styles.label}>Նկարագրություն</Text>
          <View style={styles.area}>
            <TextInput value={description} onChangeText={setDescription} multiline style={styles.areaInput} />
          </View>
          <RegField label="Գին" value={price} onChangeText={setPrice} />
          <PrimaryButton label="Պահպանել" disabled={!title.trim()} onPress={save} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const ListDetailScreen = ({ navigation, route }) => {
  const lists = useOwnerLists();
  const item = lists.find(entry => entry.id === route.params?.id);
  const [menu, setMenu] = useState(false);
  const [confirm, setConfirm] = useState(false);
  if (!item) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <PageHeader title="Առաջարկ" onBack={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }
  const remove = () => {
    saveOwnerLists(lists.filter(entry => entry.id !== item.id));
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader
        title={item.title}
        onBack={() => navigation.goBack()}
        right={
          <TouchableOpacity onPress={() => setMenu(true)}>
            <Text style={styles.title}>•••</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView>
        {item.image ? <Image source={item.image} style={styles.hero} /> : <View style={styles.hero} />}
        <View style={styles.block}>
          <Text style={styles.body}>{item.description}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.meta}>
            {[item.views && `${item.views} դիտում`, item.comments && `${item.comments} մեկնաբանություն`]
              .filter(Boolean)
              .join(' · ')}
          </Text>
        </View>
      </ScrollView>
      <BottomSheet visible={menu} onClose={() => setMenu(false)}>
        <SheetAction
          icon={<PencilIcon />}
          label="Խմբագրել"
          onPress={() => {
            setMenu(false);
            navigation.navigate('OwnerListForm', { id: item.id });
          }}
        />
        <SheetAction
          icon={<ShareIcon />}
          label="Կիսվել"
          onPress={() => {
            setMenu(false);
            Share.share({ message: [item.title, item.price].filter(Boolean).join('\n') }).catch(() => {});
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
        <Text style={styles.sheetText}>Ջնջե՞լ լիստ-ի առաջարկը: Այս գործողությունը հնարավոր չի լինի հետարկել:</Text>
        <View style={styles.gap} />
        <PrimaryButton label="Ջնջել" onPress={remove} />
      </BottomSheet>
    </SafeAreaView>
  );
};
