import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MIcon from '../../../../components/svgs';
import { ICON_NAMES } from '../../../../components/svgs/icon_names';
import { normalize } from '../../../../assets/deviceInfo/normalize';
import { COLORS } from '../../../../assets/rootStyles';
import { ROUT_NAMES } from '../../../../constants/rout';
import { CITIES, FAQS, LANGUAGES, NOTIFICATION_TOGGLES, THREAD } from '../../profile/data';
import {
  BellIcon,
  CheckCircleIcon,
  ChevronRight,
  EyeIcon,
  GlobeIcon,
  HelpIcon,
  ImageAddIcon,
  MicIcon,
  PencilIcon,
  PinIcon,
  PlaySmallIcon,
  RadioMark,
  SendIcon,
  TrashIcon,
  WarnCircleIcon,
} from '../../profile/icons';
import {
  Field,
  PageHeader,
  PrimaryButton,
  Screen,
  SearchField,
  SettingRow,
  SuccessModal,
  ToggleRow,
} from '../../profile/parts';
import styles from '../../profile/styles';
import { saveCreatedBusiness } from '../register/store';
import { GALLERY } from '../register/data';
import page from '../info/styles';
import { useBusinessPage } from '../info/data';

const S = {
  HUB: 'Hub',
  CITY: 'City',
  LANGUAGE: 'Language',
  NOTIFICATIONS: 'Notifications',
  HELP: 'Help',
  FAQ: 'Faq',
  REPORT: 'Report',
  SUPPORT: 'Support',
  DELETE: 'Delete',
  DELETE_PASSWORD: 'DeletePassword',
  DELETE_FINAL: 'DeleteFinal',
  DELETE_DONE: 'DeleteDone',
};

const TOGGLES = NOTIFICATION_TOGGLES.slice(0, 3);

const HELP = [
  {
    key: 'faq',
    title: 'Հաճախ տրվող հարցեր',
    sub: 'Գտեք պատասխաններ տարածված հարցերի',
    route: S.FAQ,
  },
  {
    key: 'report',
    title: 'Հայտնել խնդրի մասին',
    sub: 'Նկարագրեք խնդիրը և ուղարկեք մեզ',
    route: S.REPORT,
  },
  {
    key: 'chat',
    title: 'Կապ մեզ հետ',
    sub: 'Գրեք աջակցման թիմին',
    route: S.SUPPORT,
  },
];

const CHAT = THREAD.filter(item => item.type !== 'image' && item.id !== 'd3');
const BARS = [8, 14, 10, 18, 12, 16, 9, 14];

const prefs = {
  city: 'Երևան',
  language: 'hy',
  notes: Object.fromEntries(TOGGLES.map(item => [item.id, true])),
};

const local = StyleSheet.create({
  promo: {
    minHeight: normalize(204),
    marginTop: normalize(24),
  },
  shot: {
    width: normalize(56),
    height: normalize(56),
    borderRadius: normalize(10),
  },
});

const barLook = height => [styles.waveBar, { height: normalize(height) }];

const leaveBusiness = navigation => {
  saveCreatedBusiness(null);
  const app = navigation.getParent()?.getParent();
  if (app?.canGoBack()) {
    app.goBack();
    return;
  }
  app?.reset({ index: 0, routes: [{ name: ROUT_NAMES.TAB }] });
};

const HubScreen = ({ navigation }) => {
  const business = useBusinessPage();
  const open = name => navigation.getParent()?.navigate(name);
  return (
    <Screen scroll>
      <PageHeader title="Կարգավորումներ" onBack={() => navigation.getParent()?.goBack()} />
      <TouchableOpacity
        style={styles.profileEdit}
        activeOpacity={0.8}
        onPress={() => open('OwnerEdit')}
      >
        {business.logo ? (
          <Image source={business.logo} style={styles.profileEditAvatar} />
        ) : (
          <View style={styles.profileEditAvatar} />
        )}
        <View style={styles.profileEditText}>
          <Text style={styles.profileEditName}>{business.name}</Text>
          {business.handle ? <Text style={styles.profileEditHandle}>{business.handle}</Text> : null}
        </View>
        <PencilIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={[page.promo, local.promo]}
        activeOpacity={0.85}
        onPress={() => open('OwnerPromote')}
      >
        <Text style={page.promoTitle}>Խթանել էջը</Text>
        <Text style={page.promoBody}>Օգնեք ավելի շատ մարդկանց զգալ ձեր բիզնեսի մթնոլորտը</Text>
        <View style={page.promoPrice}>
          <Text style={page.promoPriceText}>9,9$</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.settingsList}>
        <SettingRow icon={<PinIcon />} label="Քաղաք" onPress={() => navigation.navigate(S.CITY)} />
        <SettingRow icon={<GlobeIcon />} label="Լեզու" onPress={() => navigation.navigate(S.LANGUAGE)} />
        <SettingRow
          icon={<BellIcon />}
          label="Ծանուցումներ"
          onPress={() => navigation.navigate(S.NOTIFICATIONS)}
        />
        <SettingRow icon={<HelpIcon />} label="Օգնություն" onPress={() => navigation.navigate(S.HELP)} />
      </View>
      <View style={styles.settingsDivider} />
      <View style={styles.logoutRow}>
        <SettingRow
          icon={<TrashIcon />}
          label="Ջնջել հաշիվը"
          danger
          onPress={() => navigation.navigate(S.DELETE)}
        />
      </View>
    </Screen>
  );
};

const CityScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(prefs.city);
  const cities = CITIES.filter(item => item.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <Screen scroll>
      <PageHeader title="Քաղաք" onBack={() => navigation.goBack()} />
      <SearchField value={query} onChangeText={setQuery} />
      <View style={styles.blockTop}>
        {cities.map(item => (
          <TouchableOpacity
            key={item}
            style={styles.selectRow}
            onPress={() => {
              prefs.city = item;
              setSelected(item);
            }}
          >
            <Text style={styles.selectLabel}>{item}</Text>
            {selected === item ? (
              <MIcon name={ICON_NAMES.CHECKMARK} width={normalize(18)} height={normalize(18)} />
            ) : (
              <View style={styles.checkSpacer} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
};

const LanguageScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(prefs.language);
  return (
    <Screen scroll>
      <PageHeader title="Լեզու" onBack={() => navigation.goBack()} />
      <View style={styles.blockTopLg}>
        {LANGUAGES.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.selectRow}
            onPress={() => {
              prefs.language = item.id;
              setSelected(item.id);
            }}
          >
            <Text style={styles.selectLabel}>{item.label}</Text>
            <RadioMark selected={selected === item.id} />
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
};

const NotificationsScreen = ({ navigation }) => {
  const [values, setValues] = useState({ ...prefs.notes });
  return (
    <Screen scroll>
      <PageHeader title="Ծանուցումներ" onBack={() => navigation.goBack()} />
      <View style={styles.form}>
        {TOGGLES.map(item => (
          <ToggleRow
            key={item.id}
            label={item.label}
            value={values[item.id]}
            onValueChange={next => {
              prefs.notes[item.id] = next;
              setValues(prev => ({ ...prev, [item.id]: next }));
            }}
          />
        ))}
      </View>
    </Screen>
  );
};

const HelpScreen = ({ navigation }) => (
  <Screen scroll>
    <PageHeader title="Օգնություն" onBack={() => navigation.goBack()} />
    <View style={styles.headerLine} />
    <View style={[styles.form, styles.blockTopLg]}>
      {HELP.map(item => (
        <TouchableOpacity
          key={item.key}
          style={styles.helpCard}
          onPress={() => navigation.navigate(item.route)}
        >
          <View style={styles.helpText}>
            <Text style={styles.helpTitle}>{item.title}</Text>
            <Text style={styles.helpSub}>{item.sub}</Text>
          </View>
          <ChevronRight />
        </TouchableOpacity>
      ))}
    </View>
  </Screen>
);

const FaqScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(null);
  const items = FAQS.filter(item => item.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <Screen scroll>
      <PageHeader title="Հաճախ տրվող հարցեր" onBack={() => navigation.goBack()} />
      <SearchField value={query} onChangeText={setQuery} />
      <View style={styles.form}>
        {items.map(item => (
          <View key={item}>
            <TouchableOpacity style={styles.faqRow} onPress={() => setOpen(open === item ? null : item)}>
              <Text style={styles.faqQ}>{item}</Text>
              <ChevronRight />
            </TouchableOpacity>
            {open === item ? (
              <Text style={styles.faqA}>
                Բացեք համապատասխան բաժինը կարգավորումներից և հետևեք էկրանի քայլերին։ Եթե հարցը մնա, գրեք աջակցմանը։
              </Text>
            ) : null}
          </View>
        ))}
        <TouchableOpacity style={styles.helpCard} onPress={() => navigation.navigate(S.SUPPORT)}>
          <View style={styles.helpText}>
            <Text style={styles.helpTitle}>Չգտա՞ք պատասխանը</Text>
            <Text style={styles.helpSub}>Գրեք մեզ</Text>
          </View>
          <ChevronRight />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const ReportScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [done, setDone] = useState(false);
  return (
    <Screen
      scroll
      footer={
        <View style={styles.footerBtn}>
          <PrimaryButton label="Ուղարկել" disabled={!text.trim()} onPress={() => setDone(true)} />
        </View>
      }
    >
      <PageHeader title="Հայտնել խնդրի մասին" onBack={() => navigation.goBack()} />
      <View style={styles.headerLine} />
      <View style={styles.form}>
        <Text style={styles.bodyText}>Ներկայացրեք խնդիրը և մենք կփորձենք շտկել այն</Text>
        <Text style={[styles.fieldLabel, styles.blockTopLg]}>Նկարագրեք խնդիրը</Text>
        <TextInput value={text} onChangeText={setText} multiline style={styles.textArea} />
        <TouchableOpacity
          style={styles.addImage}
          onPress={() => setImages(list => [...list, GALLERY[list.length % GALLERY.length]])}
        >
          <ImageAddIcon />
          <Text style={styles.addImageText}>Ավելացնել նկար</Text>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageRow}>
          {images.map((image, index) => (
            <Image key={`${index}`} source={image} style={[local.shot, styles.slotGap]} />
          ))}
        </ScrollView>
      </View>
      <SuccessModal
        visible={done}
        title="Հաղորդումը ուղարկվեց"
        message="Շնորհակալություն, մենք կդիտարկենք խնդիրը"
        onClose={() => {
          setDone(false);
          navigation.goBack();
        }}
      />
    </Screen>
  );
};

const SupportScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState(CHAT);
  const send = () => {
    const value = text.trim();
    if (!value) {
      return;
    }
    setMessages(list => [...list, { id: `s-${Date.now()}`, type: 'out', text: value }]);
    setText('');
  };
  return (
    <Screen
      footer={
        <View style={styles.composer}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={styles.composerInput}
            placeholder="Հաղորդագրություն"
            placeholderTextColor="#B2B2B2"
          />
          <TouchableOpacity onPress={send}>{text.trim() ? <SendIcon /> : <MicIcon />}</TouchableOpacity>
        </View>
      }
    >
      <PageHeader title="Կապ մեզ հետ" onBack={() => navigation.goBack()} />
      <View style={styles.headerLine} />
      <ScrollView style={styles.flex} contentContainerStyle={styles.list} keyboardShouldPersistTaps="handled">
        {messages.map(item => {
          if (item.type === 'date') {
            return (
              <Text key={item.id} style={styles.dateLabel}>
                {item.text}
              </Text>
            );
          }
          if (item.type === 'voice') {
            return (
              <View
                key={item.id}
                style={[styles.bubbleWrap, item.mine ? styles.bubbleOut : styles.bubbleIn, styles.voice]}
              >
                <PlaySmallIcon />
                <View style={styles.wave}>
                  {BARS.map((height, index) => (
                    <View key={`${item.id}-${index}`} style={barLook(height)} />
                  ))}
                </View>
              </View>
            );
          }
          const mine = item.type === 'out';
          return (
            <View key={item.id} style={[styles.bubbleWrap, mine ? styles.bubbleOut : styles.bubbleIn]}>
              <Text style={mine ? styles.bubbleTextOut : styles.bubbleTextIn}>{item.text}</Text>
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

const DeleteScreen = ({ navigation }) => (
  <Screen
    scroll
    footer={
      <View style={styles.footerBtn}>
        <PrimaryButton label="Շարունակել" onPress={() => navigation.navigate(S.DELETE_PASSWORD)} />
      </View>
    }
  >
    <PageHeader title="Ջնջել հաշիվը" onBack={() => navigation.goBack()} />
    <View style={styles.centerBlock}>
      <WarnCircleIcon />
      <Text style={styles.centerTitle}>Դուք պատրաստվում եք ջնջել ձեր հաշիվը</Text>
      <Text style={styles.centerBody}>
        30 օրվա ընթացքում ակտիվության բացակայության դեպքում ձեր հաշիվը կջնջվի մշտապես
      </Text>
    </View>
  </Screen>
);

const DeletePasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  return (
    <Screen
      scroll
      footer={
        <View style={styles.footerBtn}>
          <PrimaryButton
            label="Հաստատել"
            disabled={!password}
            onPress={() => navigation.navigate(S.DELETE_FINAL)}
          />
        </View>
      }
    >
      <PageHeader title="Հաստատել գործողությունը" onBack={() => navigation.goBack()} />
      <View style={styles.form}>
        <Text style={[styles.bodyText, styles.spacedBottom]}>
          Մուտքագրեք ձեր գաղտնաբառը, որպեսզի հաստատեք հաշվի ջնջումը
        </Text>
        <Field
          value={password}
          onChangeText={setPassword}
          secure={!show}
          right={
            <TouchableOpacity onPress={() => setShow(value => !value)}>
              <EyeIcon off={!show} />
            </TouchableOpacity>
          }
        />
      </View>
    </Screen>
  );
};

const DeleteFinalScreen = ({ navigation }) => (
  <Screen
    scroll
    footer={
      <View style={styles.footerBtn}>
        <PrimaryButton label="Ջնջել" onPress={() => navigation.navigate(S.DELETE_DONE)} />
      </View>
    }
  >
    <PageHeader title="Վերջին հաստատում" onBack={() => navigation.goBack()} />
    <View style={styles.headerLine} />
    <View style={styles.form}>
      <Text style={styles.bodyText}>
        Վստահ եք, որ ցանկանում եք ջնջել ձեր բիզնես էջը? Ձեր տվյալները հնարավոր չի լինի վերականգնել:
      </Text>
    </View>
  </Screen>
);

const DeleteDoneScreen = ({ navigation }) => (
  <Screen
    scroll
    footer={
      <View style={styles.footerBtn}>
        <PrimaryButton label="Լավ" onPress={() => leaveBusiness(navigation)} />
      </View>
    }
  >
    <PageHeader title="Վերջին հաստատում" onBack={() => leaveBusiness(navigation)} />
    <View style={styles.headerLine} />
    <View style={styles.centerBlock}>
      <CheckCircleIcon />
      <Text style={styles.centerTitle}>Ձեր հաշիվը հաջողությամբ ջնջվեց</Text>
    </View>
  </Screen>
);

const Stack = createNativeStackNavigator();

const SettingsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
      contentStyle: { backgroundColor: COLORS.white },
    }}
  >
    <Stack.Screen name={S.HUB} component={HubScreen} />
    <Stack.Screen name={S.CITY} component={CityScreen} />
    <Stack.Screen name={S.LANGUAGE} component={LanguageScreen} />
    <Stack.Screen name={S.NOTIFICATIONS} component={NotificationsScreen} />
    <Stack.Screen name={S.HELP} component={HelpScreen} />
    <Stack.Screen name={S.FAQ} component={FaqScreen} />
    <Stack.Screen name={S.REPORT} component={ReportScreen} />
    <Stack.Screen name={S.SUPPORT} component={SupportScreen} />
    <Stack.Screen name={S.DELETE} component={DeleteScreen} />
    <Stack.Screen name={S.DELETE_PASSWORD} component={DeletePasswordScreen} />
    <Stack.Screen name={S.DELETE_FINAL} component={DeleteFinalScreen} />
    <Stack.Screen name={S.DELETE_DONE} component={DeleteDoneScreen} />
  </Stack.Navigator>
);

export default SettingsNavigator;
