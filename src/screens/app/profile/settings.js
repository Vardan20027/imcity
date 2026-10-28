import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { EMOTIONS } from '../../../constants/emotions/data';
import { ROUT_NAMES } from '../../../constants/rout';
import CalendarModal from '../../../components/calendar/calendarModal';
import {
  BUSINESSES,
  CITIES,
  FAQS,
  GENDERS,
  LANGUAGES,
  NOTIFICATION_TOGGLES,
  THREAD,
  updateProfile,
  useProfile,
} from './data';
import {
  BellIcon,
  ChevronRight,
  EyeIcon,
  GlobeIcon,
  HelpIcon,
  ImageAddIcon,
  LinkIcon,
  LockIcon,
  LogoutIcon,
  MailIcon,
  PencilIcon,
  PhoneIcon,
  PinIcon,
  RadioMark,
  ShieldIcon,
  SparkleIcon,
  StoreIcon,
  TrashIcon,
  WarnCircleIcon,
  CameraIcon,
  CheckCircleIcon,
  MicIcon,
  PlaySmallIcon,
  SendIcon,
} from './icons';
import {
  BottomSheet,
  CenterCard,
  Field,
  PageHeader,
  PrimaryButton,
  Screen,
  SearchField,
  SettingRow,
  SuccessModal,
  ToggleRow,
} from './parts';
import { P } from './routes';
import styles from './styles';

const cardLook = (on, backgroundColor) => [
  styles.emotionCard,
  on && styles.emotionCardOn,
  on && { backgroundColor },
];

const labelLook = (on, color) => [styles.emotionCardLabel, on && { color }];

const barLook = height => [styles.waveBar, { height: normalize(height) }];

const formatDate = date => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${date.getFullYear()}`;
};

export const SettingsScreen = ({ navigation }) => {
  const user = useProfile();
  const [businessOpen, setBusinessOpen] = useState(false);

  return (
    <Screen scroll>
      <PageHeader title="Կարգավորումներ" onBack={() => navigation.goBack()} />
      <TouchableOpacity
        style={styles.profileEdit}
        activeOpacity={0.8}
        onPress={() => navigation.navigate(P.EDIT)}
      >
        {user.avatar ? (
          <Image source={user.avatar} style={styles.profileEditAvatar} />
        ) : (
          <View style={styles.profileEditAvatar} />
        )}
        <View style={styles.profileEditText}>
          <Text style={styles.profileEditName}>{user.name}</Text>
          <Text style={styles.profileEditHandle}>{user.handle}</Text>
        </View>
        <PencilIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.businessRow}
        activeOpacity={0.8}
        onPress={() => setBusinessOpen(true)}
      >
        <View style={styles.businessLeft}>
          <StoreIcon />
          <Text style={styles.businessLabel}>Ստեղծել բիզնես էջ</Text>
        </View>
        <ChevronRight />
      </TouchableOpacity>
      <View style={styles.settingsList}>
        <SettingRow
          icon={<PinIcon />}
          label="Քաղաք"
          onPress={() => navigation.navigate(P.CITY)}
        />
        <SettingRow
          icon={<GlobeIcon />}
          label="Լեզու"
          onPress={() => navigation.navigate(P.LANGUAGE)}
        />
        <SettingRow
          icon={<SparkleIcon size={22} color="#3C3C3C" />}
          label="Էմոցիաներ"
          onPress={() => navigation.navigate(P.EMOTIONS)}
        />
        <SettingRow
          icon={<BellIcon />}
          label="Ծանուցումներ"
          onPress={() => navigation.navigate(P.NOTIFICATIONS)}
        />
        <SettingRow
          icon={<ShieldIcon />}
          label="Անվտանգություն"
          onPress={() => navigation.navigate(P.SECURITY)}
        />
        <SettingRow
          icon={<HelpIcon />}
          label="Օգնություն"
          onPress={() => navigation.navigate(P.HELP)}
        />
      </View>
      <View style={styles.settingsDivider} />
      <View style={styles.logoutRow}>
        <SettingRow
          icon={<LogoutIcon />}
          label="Դուրս գալ"
          danger
          onPress={() => navigation.popToTop()}
        />
      </View>
      <BottomSheet
        visible={businessOpen}
        onClose={() => setBusinessOpen(false)}
        style={styles.accountSheet}
      >
        {BUSINESSES.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.accountRow}
            activeOpacity={0.7}
            onPress={() => {
              setBusinessOpen(false);
              if (item.id === 'business') {
                navigation.navigate(ROUT_NAMES.BUSINESS);
              }
            }}
          >
            {item.id === 'business' ? <StoreIcon /> : <PencilIcon />}
            <Text style={styles.accountLabel}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </BottomSheet>
    </Screen>
  );
};

export const EditProfileScreen = ({ navigation }) => {
  const user = useProfile();
  const [name, setName] = useState(user.name);
  const [handle, setHandle] = useState(user.handle);
  const [birthday, setBirthday] = useState(user.birthday);
  const [gender, setGender] = useState(user.gender);
  const [city, setCity] = useState(user.city);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [cityQuery, setCityQuery] = useState('');
  const cities = CITIES.filter(item => item.toLowerCase().includes(cityQuery.trim().toLowerCase()));

  return (
    <Screen
      scroll
      footer={
        <View style={styles.footerBtn}>
          <PrimaryButton
            label="Պահպանել"
            disabled={!name.trim() || !handle.trim()}
            onPress={() => {
              updateProfile({ name: name.trim(), handle: handle.trim(), birthday, gender, city });
              navigation.goBack();
            }}
          />
        </View>
      }
    >
      <PageHeader title="Խմբագրել" onBack={() => navigation.goBack()} />
      <View style={styles.headerLine} />
      <View style={styles.form}>
        <TouchableOpacity style={styles.editAvatarWrap} onPress={() => setPhotoOpen(true)}>
          {user.avatar ? (
            <Image source={user.avatar} style={styles.editAvatar} />
          ) : (
            <View style={styles.editAvatar} />
          )}
          <View style={styles.cameraBadge}>
            <CameraIcon />
          </View>
        </TouchableOpacity>
        <Field label="Անուն, ազգանուն" value={name} onChangeText={setName} />
        <Field label="Օգտագործողի անուն" value={handle} onChangeText={setHandle} />
        <Field
          label="Ծննդյան ամսաթիվ"
          value={birthday}
          onPress={() => setCalendar(true)}
          icon={<MIcon name={ICON_NAMES.CALENDAR} width={normalize(18)} height={normalize(18)} />}
        />
        <Field label="Սեռ" value={gender} onPress={() => setGenderOpen(true)} icon={<ChevronRight />} />
        <Field label="Քաղաք" value={city} onPress={() => setCityOpen(true)} icon={<ChevronRight />} />
      </View>
      <CenterCard visible={photoOpen} onClose={() => setPhotoOpen(false)}>
        <TouchableOpacity style={styles.optionRow} onPress={() => setPhotoOpen(false)}>
          <Text style={styles.optionText}>Լուսանկարել</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow} onPress={() => setPhotoOpen(false)}>
          <Text style={styles.optionText}>Ընտրել պատկերասրահից</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => {
            updateProfile({ avatar: null });
            setPhotoOpen(false);
          }}
        >
          <Text style={[styles.optionText, styles.danger]}>Ջնջել լուսանկարը</Text>
        </TouchableOpacity>
      </CenterCard>
      <BottomSheet visible={genderOpen} onClose={() => setGenderOpen(false)}>
        {GENDERS.map(item => (
          <TouchableOpacity
            key={item}
            style={styles.optionRow}
            onPress={() => {
              setGender(item);
              setGenderOpen(false);
            }}
          >
            <Text style={styles.optionText}>{item}</Text>
            <RadioMark selected={gender === item} />
          </TouchableOpacity>
        ))}
      </BottomSheet>
      <BottomSheet visible={cityOpen} onClose={() => setCityOpen(false)}>
        <SearchField
          value={cityQuery}
          onChangeText={setCityQuery}
          style={styles.searchFlush}
        />
        <ScrollView
          style={styles.sheetList}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {cities.map(item => (
            <TouchableOpacity
              key={item}
              style={styles.optionRow}
              onPress={() => {
                setCity(item);
                setCityOpen(false);
              }}
            >
              <Text style={styles.optionText}>{item}</Text>
              {city === item ? (
                <MIcon name={ICON_NAMES.CHECKMARK} width={normalize(18)} height={normalize(18)} />
              ) : null}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </BottomSheet>
      <CalendarModal
        visible={calendar}
        initialDate={new Date(1994, 4, 15)}
        onClose={() => setCalendar(false)}
        onConfirm={date => {
          setBirthday(formatDate(date));
          setCalendar(false);
        }}
      />
    </Screen>
  );
};

export const CityScreen = ({ navigation }) => {
  const user = useProfile();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(user.city);
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
              setSelected(item);
              updateProfile({ city: item });
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

export const LanguageScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('hy');
  return (
    <Screen scroll>
      <PageHeader title="Լեզու" onBack={() => navigation.goBack()} />
      <View style={styles.blockTopLg}>
        {LANGUAGES.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.selectRow}
            onPress={() => setSelected(item.id)}
          >
            <Text style={styles.selectLabel}>{item.label}</Text>
            <RadioMark selected={selected === item.id} />
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
};

export const EmotionsScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(() => new Set([2, 3, 5]));
  const toggle = id => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
      }
      return next;
    });
  };
  return (
    <Screen
      scroll
      footer={
        <View style={styles.footerBtn}>
          <PrimaryButton
            label="Պահպանել"
            disabled={selected.size === 0}
            onPress={() => navigation.goBack()}
          />
        </View>
      }
    >
      <PageHeader title="Էմոցիաներ" onBack={() => navigation.goBack()} />
      <View style={styles.form}>
        <Text style={styles.hint}>Ընտրեք մինչև 3 էմոցիա, որոնք ցանկանում եք զգալ</Text>
        <View style={styles.emotionGrid}>
          {EMOTIONS.map(item => {
            const on = selected.has(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={cardLook(on, item.backgroundColor)}
                onPress={() => toggle(item.id)}
                activeOpacity={0.8}
              >
                <MIcon
                  name={item.icon}
                  width={normalize(22)}
                  height={normalize(22)}
                  color={on ? item.color : '#7B7B7B'}
                />
                <Text style={labelLook(on, item.color)}>
                  {item.title.replace('\n', '')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Screen>
  );
};

export const NotificationsSettingsScreen = ({ navigation }) => {
  const [values, setValues] = useState(() =>
    Object.fromEntries(NOTIFICATION_TOGGLES.map(item => [item.id, true])),
  );
  return (
    <Screen scroll>
      <PageHeader title="Ծանուցումներ" onBack={() => navigation.goBack()} />
      <View style={styles.form}>
        {NOTIFICATION_TOGGLES.map(item => (
          <ToggleRow
            key={item.id}
            label={item.label}
            value={values[item.id]}
            onValueChange={next => setValues(prev => ({ ...prev, [item.id]: next }))}
          />
        ))}
      </View>
    </Screen>
  );
};

export const SecurityScreen = ({ navigation }) => (
  <Screen scroll>
    <PageHeader title="Անվտանգություն" onBack={() => navigation.goBack()} />
    <View style={styles.headerLine} />
    <View style={styles.settingsList}>
      <SettingRow
        icon={<LockIcon />}
        label="Փոխել գաղտնաբառը"
        onPress={() => navigation.navigate(P.PASSWORD)}
      />
      <SettingRow
        icon={<ShieldIcon />}
        label="Երկքայլ հաստատում"
        onPress={() => navigation.navigate(P.TWO_FA)}
      />
      <SettingRow
        icon={<LinkIcon />}
        label="Կցված հաշիվներ"
        onPress={() => navigation.navigate(P.LINKED)}
      />
      <View style={styles.divider} />
      <SettingRow
        icon={<TrashIcon color="#171717" />}
        label="Ջնջել հաշիվը"
        onPress={() => navigation.navigate(P.DELETE)}
      />
    </View>
  </Screen>
);

const Rule = ({ ok, label }) => (
  <View style={styles.ruleRow}>
    <MIcon
      name={ICON_NAMES.CHECKMARK}
      width={normalize(16)}
      height={normalize(16)}
      color={ok ? '#12B900' : '#C8C8C8'}
    />
    <Text style={[styles.ruleText, ok && styles.ruleTextOn]}>{label}</Text>
  </View>
);

export const ChangePasswordScreen = ({ navigation }) => {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [repeat, setRepeat] = useState('');
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const lengthOk = next.length >= 8;
  const caseOk = /[a-z]/.test(next) && /[A-Z]/.test(next);
  const symbolOk = /[0-9]/.test(next) || /[^A-Za-z0-9]/.test(next);
  const ready = current.length > 0 && lengthOk && caseOk && symbolOk && next === repeat;
  const eye = (
    <TouchableOpacity onPress={() => setShow(value => !value)}>
      <EyeIcon off={!show} />
    </TouchableOpacity>
  );
  return (
    <Screen scroll>
      <PageHeader title="Փոխել գաղտնաբառը" onBack={() => navigation.goBack()} />
      <View style={styles.form}>
        <Field label="Ընթացիկ գաղտնաբառ" value={current} onChangeText={setCurrent} secure={!show} right={eye} />
        <Field label="Նոր գաղտնաբառ" value={next} onChangeText={setNext} secure={!show} right={eye} />
        <Field label="Կրկնել գաղտնաբառը" value={repeat} onChangeText={setRepeat} secure={!show} right={eye} />
        <Text style={styles.rulesTitle}>Պահանջներ գաղտնաբառի համար</Text>
        <Rule ok={lengthOk} label="Առնվազն 8 նիշ" />
        <Rule ok={caseOk} label="Պետք է լինի և փոքրատառ և մեծատառ" />
        <Rule ok={symbolOk} label="Պետք է լինի թիվ կամ հստակ նշան" />
        <PrimaryButton
          label="Պահպանել"
          disabled={!ready}
          style={styles.buttonSpace}
          onPress={() => setDone(true)}
        />
      </View>
      <SuccessModal
        visible={done}
        title="Գաղտնաբառը փոխվեց"
        message="Ձեր գաղտնաբառը հաջողությամբ թարմացվեց"
        onClose={() => {
          setDone(false);
          navigation.goBack();
        }}
      />
    </Screen>
  );
};

export const TwoFactorScreen = ({ navigation }) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <Screen scroll>
      <PageHeader title="Երկքայլ հաստատում" onBack={() => navigation.goBack()} />
      <View style={styles.headerLine} />
      <View style={styles.form}>
        <ToggleRow
          label="Երկքայլ հաստատում"
          value={enabled}
          onValueChange={value => {
            setEnabled(value);
            if (value) {
              navigation.navigate(P.METHOD);
            }
          }}
        />
        <Text style={[styles.bodyText, styles.blockTopLg]}>
          Միացրեք 2FA-ն ձեր հաշվի ապահովության համար: Սա կպահանջի հաստատման կոդ մուտք գործելիս:
        </Text>
      </View>
    </Screen>
  );
};

export const ConfirmMethodScreen = ({ navigation }) => {
  const [method, setMethod] = useState('sms');
  const [done, setDone] = useState(false);
  const options = [
    { id: 'sms', title: 'SMS', sub: 'Կոդը կուղարկվի հեռախոսահամարին' },
    { id: 'email', title: 'Էլ. հասցե', sub: 'Կոդը կուղարկվի էլ. հասցեին' },
  ];
  return (
    <Screen
      scroll
      footer={
        <View style={styles.footerBtn}>
          <PrimaryButton label="Շարունակել" onPress={() => setDone(true)} />
        </View>
      }
    >
      <PageHeader title="Ընտրել հաստատման տարբերակ" onBack={() => navigation.goBack()} />
      <View style={styles.headerLine} />
      <View style={styles.form}>
        <Text style={styles.bodyText}>Ընտրեք, թե ինչպես եք ցանկանում ստանալ հաստատման կոդը:</Text>
        <View style={styles.blockTopLg}>
          {options.map(item => {
            const on = method === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.methodCard, on && styles.methodCardOn]}
                onPress={() => setMethod(item.id)}
              >
                <RadioMark selected={on} />
                <View>
                  <Text style={styles.methodTitle}>{item.title}</Text>
                  <Text style={styles.methodSub}>{item.sub}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <SuccessModal
        visible={done}
        title="Կոդն ուղարկվել է"
        message="Հաստատման կոդը ուղարկված է ընտրված եղանակով"
        onClose={() => {
          setDone(false);
          navigation.goBack();
        }}
      />
    </Screen>
  );
};

export const LinkedAccountsScreen = ({ navigation }) => {
  const user = useProfile();
  return (
    <Screen scroll>
      <PageHeader title="Կցված հաշիվներ" onBack={() => navigation.goBack()} />
      <View style={styles.settingsList}>
        <SettingRow
          icon={<MailIcon />}
          label={user.email}
          onPress={() => navigation.navigate(P.EMAIL)}
        />
        <SettingRow
          icon={<PhoneIcon />}
          label={user.phone}
          onPress={() => navigation.navigate(P.PHONE)}
        />
        <SettingRow
          icon={<MIcon name={ICON_NAMES.SOCIAL.GOOGLE} width={normalize(22)} height={normalize(22)} />}
          label="Google"
        />
        <SettingRow
          icon={<View style={styles.logoBlank} />}
          label="Apple"
        />
      </View>
    </Screen>
  );
};

export const ChangeEmailScreen = ({ navigation }) => {
  const user = useProfile();
  const [email, setEmail] = useState(user.email);
  const [done, setDone] = useState(false);
  const valid = /\S+@\S+\.\S+/.test(email);
  return (
    <Screen
      scroll
      footer={
        <View style={styles.footerBtn}>
          <PrimaryButton label="Պահպանել" disabled={!valid} onPress={() => setDone(true)} />
        </View>
      }
    >
      <PageHeader title="Փոխել էլ. հասցե" onBack={() => navigation.goBack()} />
      <View style={styles.headerLine} />
      <View style={styles.form}>
        <Field label="Էլ. հասցե" value={email} onChangeText={setEmail} />
      </View>
      <SuccessModal
        visible={done}
        title="Էլ. հասցեն փոխվեց"
        message="Նոր հասցեն պահպանված է"
        onClose={() => {
          updateProfile({ email: email.trim() });
          setDone(false);
          navigation.goBack();
        }}
      />
    </Screen>
  );
};

export const ChangePhoneScreen = ({ navigation }) => {
  const user = useProfile();
  const [phone, setPhone] = useState(user.phone);
  return (
    <Screen
      scroll
      footer={
        <View style={styles.footerBtn}>
          <PrimaryButton
            label="Շարունակել"
            disabled={phone.trim().length < 8}
            onPress={() => navigation.navigate(P.PHONE_CODE, { phone: phone.trim() })}
          />
        </View>
      }
    >
      <PageHeader title="Փոխել հեռախոսահամարը" onBack={() => navigation.goBack()} />
      <View style={styles.headerLine} />
      <View style={styles.form}>
        <Field label="Հեռախոսահամար" value={phone} onChangeText={setPhone} />
      </View>
    </Screen>
  );
};

export const PhoneCodeScreen = ({ navigation, route }) => {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [done, setDone] = useState(false);
  const refs = useRef([]);
  const ready = digits.every(Boolean);
  const setDigit = (index, value) => {
    const char = value.replace(/\D/g, '').slice(-1);
    setDigits(prev => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    if (char && refs.current[index + 1]) {
      refs.current[index + 1].focus();
    }
  };
  return (
    <Screen
      scroll
      footer={
        <View style={styles.footerBtn}>
          <PrimaryButton label="Հաստատել" disabled={!ready} onPress={() => setDone(true)} />
        </View>
      }
    >
      <PageHeader title="Փոխել հեռախոսահամարը" onBack={() => navigation.goBack()} />
      <View style={styles.headerLine} />
      <View style={styles.form}>
        <Text style={styles.bodyText}>Մուտքագրեք հաստատման կոդը</Text>
        <View style={[styles.otpRow, styles.blockTopLg]}>
          {digits.map((digit, index) => (
            <TextInput
              key={`d-${index}`}
              ref={node => {
                refs.current[index] = node;
              }}
              value={digit}
              onChangeText={value => setDigit(index, value)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.otpBox}
            />
          ))}
        </View>
      </View>
      <SuccessModal
        visible={done}
        title="Հեռախոսահամարը փոխվեց"
        message="Նոր համարը հաստատված է"
        onClose={() => {
          if (route.params?.phone) {
            updateProfile({ phone: route.params.phone });
          }
          setDone(false);
          navigation.pop(2);
        }}
      />
    </Screen>
  );
};

export const DeleteAccountScreen = ({ navigation }) => (
  <Screen
    scroll
    footer={
      <View style={styles.footerBtn}>
        <PrimaryButton label="Շարունակել" onPress={() => navigation.navigate(P.DELETE_PASSWORD)} />
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

export const DeletePasswordScreen = ({ navigation }) => {
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
            onPress={() => navigation.navigate(P.DELETE_FINAL)}
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

export const DeleteFinalScreen = ({ navigation }) => (
  <Screen
    scroll
    footer={
      <View style={styles.footerBtn}>
        <PrimaryButton label="Ջնջել հաշիվը" onPress={() => navigation.navigate(P.DELETE_DONE)} />
      </View>
    }
  >
    <PageHeader title="Վերջին հաստատում" onBack={() => navigation.goBack()} />
    <View style={styles.headerLine} />
    <View style={styles.form}>
      <Text style={styles.bodyText}>
        Վստահ եք, որ ցանկանում եք ջնջել հաշիվը? Ձեր տվյալները հնարավոր չի լինի վերականգնել:
      </Text>
    </View>
  </Screen>
);

export const DeleteDoneScreen = ({ navigation }) => (
  <Screen
    scroll
    footer={
      <View style={styles.footerBtn}>
        <PrimaryButton label="Լավ" onPress={() => navigation.popToTop()} />
      </View>
    }
  >
      <PageHeader title="Վերջին հաստատում" onBack={() => navigation.popToTop()} />
      <View style={styles.headerLine} />
      <View style={styles.centerBlock}>
        <CheckCircleIcon />
        <Text style={styles.centerTitle}>Ձեր հաշիվը հաջողությամբ ջնջվեց</Text>
      </View>
    </Screen>
);

const HELP = [
  {
    key: 'faq',
    title: 'Հաճախ տրվող հարցեր',
    sub: 'Գտեք պատասխաններ տարածված հարցերի',
    route: P.FAQ,
  },
  {
    key: 'report',
    title: 'Հայտնել խնդրի մասին',
    sub: 'Նկարագրեք խնդիրը և ուղարկեք մեզ',
    route: P.REPORT,
  },
  {
    key: 'chat',
    title: 'Կապ մեզ հետ',
    sub: 'Գրեք աջակցման թիմին',
    route: P.SUPPORT,
  },
];

export const HelpScreen = ({ navigation }) => (
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

export const FaqScreen = ({ navigation }) => {
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
        <TouchableOpacity style={styles.helpCard} onPress={() => navigation.navigate(P.SUPPORT)}>
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

export const ReportScreen = ({ navigation }) => {
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
        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          style={styles.textArea}
        />
        <TouchableOpacity
          style={styles.addImage}
          onPress={() => setImages(list => [...list, list.length])}
        >
          <ImageAddIcon />
          <Text style={styles.addImageText}>Ավելացնել նկար</Text>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageRow}>
          {images.map(id => (
            <View key={id} style={[styles.imageSlot, styles.slotGap]} />
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

const bars = [8, 14, 10, 18, 12, 16, 9, 14];

export const SupportChatScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState(THREAD.filter(item => item.type !== 'image'));
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
                  {bars.map((height, index) => (
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
