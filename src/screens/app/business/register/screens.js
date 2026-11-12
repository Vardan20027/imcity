import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { ClockIcon, PhoneIcon, WebIcon } from '../icons';
import { CloseIcon, MailIcon } from '../../profile/icons';
import MIcon from '../../../../components/svgs';
import { ICON_NAMES } from '../../../../components/svgs/icon_names';
import { normalize } from '../../../../assets/deviceInfo/normalize';
import { ROUT_NAMES } from '../../../../constants/rout';
import { launchImageLibrary } from 'react-native-image-picker';
import { saveCreatedBusiness } from './store';
import { useReg } from './context';
import {
  BENEFITS,
  LOGOS,
  REG,
  cycleAsset,
  emptySchedule,
  formatClock,
  formatHours,
  withHandle,
} from './data';
import {
  BenefitIcon,
  CenterCamera,
  CategorySheet,
  DayMenu,
  DaySelect,
  LogoPicker,
  RegField,
  RegHeader,
  RegScreen,
  RoundButton,
  TimeSheet,
} from './parts';
import styles from './styles';
import { imageSource } from '../../../../state/reads/shape';
import {
  createPlaceRequest,
  createdPlaceId,
  fileFromAsset,
  placeBody,
  saveWorkingTimesRequest,
  updateWorkingTimeRequest,
  uploadGalleryRequest,
  uploadable,
  workingTimesBody,
} from '../api';

const patchList = (list, index, next) => list.map((item, itemIndex) => (itemIndex === index ? next : item));

export const IntroScreen = ({ navigation }) => (
  <RegScreen
    header={<RegHeader title="Ստեղծել բիզնես էջ" onBack={() => navigation.goBack()} />}
    onPress={() => navigation.navigate(REG.BASICS)}
  >
    <View style={styles.art} />
    <View style={styles.benefits}>
      {BENEFITS.map(item => (
        <View key={item.id} style={styles.benefit}>
          <View style={styles.benefitIcon}>
            <BenefitIcon id={item.id} />
          </View>
          <Text style={styles.benefitText}>{item.text}</Text>
        </View>
      ))}
    </View>
  </RegScreen>
);

export const BasicsScreen = ({ navigation }) => {
  const { draft, update } = useReg();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const ready = draft.name.trim().length > 0 && draft.category;

  return (
    <RegScreen
      step={1}
      onBack={() => navigation.goBack()}
      disabled={!ready}
      onPress={() => navigation.navigate(REG.CONTACT)}
    >
      <Text style={styles.title}>Հիմնական տեղեկություններ</Text>
      <LogoPicker source={draft.logo} onPress={() => update({ logo: cycleAsset(draft.logo, LOGOS) })} />
      <RegField
        label="Բիզնեսի անուն"
        value={draft.name}
        onChangeText={name => update({ name })}
        placeholder="Անուն"
        autoCapitalize="words"
      />
      <RegField
        label="Օգտանուն"
        value={draft.handle}
        onChangeText={handle => update({ handle })}
        placeholder="օգտանուն"
      />
      <RegField
        label="Կատեգորիա"
        value={draft.category}
        placeholder="Ընտրել"
        onPress={() => setCategoryOpen(true)}
        right={
          <MIcon name={ICON_NAMES.ARROWS.DOWN} width={normalize(16)} height={normalize(16)} />
        }
      />
      <CategorySheet
        visible={categoryOpen}
        value={draft.category}
        onClose={() => setCategoryOpen(false)}
        onSelect={category => {
          update({ category });
          setCategoryOpen(false);
        }}
      />
    </RegScreen>
  );
};

export const ContactScreen = ({ navigation }) => {
  const { draft, update } = useReg();
  const [openDays, setOpenDays] = useState(null);
  const [openTime, setOpenTime] = useState(null);
  const ready = draft.phone.trim().length > 0;

  const setEmails = emails => update({ emails });
  const setSchedules = schedules => update({ schedules });

  const updateSchedule = (index, next) => {
    setSchedules(patchList(draft.schedules, index, { ...draft.schedules[index], ...next }));
  };

  return (
    <RegScreen
      step={2}
      onBack={() => navigation.goBack()}
      disabled={!ready}
      onPress={() => {
        if (draft.placeId) {
          const times = workingTimesBody(draft);
          if (times.working_times.length) {
            saveWorkingTimesRequest({ id: draft.placeId, ...times }).catch(error =>
              console.error('Failed to save working times:', error),
            );
          }
        }
        navigation.navigate(REG.PHOTOS);
      }}
    >
      <Text style={styles.title}>Կապ և աշխատաժամեր</Text>
      <RegField
        label="Հեռախոսահամար"
        value={draft.phone}
        onChangeText={phone => update({ phone })}
        placeholder="+374"
        keyboardType="phone-pad"
      />
      <RegField
        label="Վեբկայք"
        value={draft.website}
        onChangeText={website => update({ website })}
        placeholder="www.example.com"
        keyboardType="url"
      />
      {draft.emails.map((email, index) => (
        <RegField
          key={`email-${index}`}
          label={index === 0 ? 'Էլ. հասցե' : 'Նոր էլ. հասցե'}
          value={email}
          onChangeText={value => setEmails(patchList(draft.emails, index, value))}
          placeholder="email@gmail.com"
          keyboardType="email-address"
          right={
            index === draft.emails.length - 1 ? (
              <RoundButton label="+" onPress={() => setEmails([...draft.emails, ''])} />
            ) : (
              <RoundButton
                label="-"
                onPress={() => setEmails(draft.emails.filter((_, itemIndex) => itemIndex !== index))}
              />
            )
          }
        />
      ))}
      <Text style={styles.hoursHead}>Աշխատաժամեր</Text>
      {draft.schedules.map((row, index) => (
        <View key={`hours-${index}`} style={styles.hourRow}>
          <View style={styles.hourLine}>
            <DaySelect
              days={row.days}
              onToggle={() => setOpenDays(openDays === index ? null : index)}
            />
            <TouchableOpacity
              style={styles.timeChip}
              onPress={() => {
                setOpenDays(null);
                setOpenTime(index);
              }}
            >
              <Text style={styles.timeText}>
                {`${formatClock(row.start)} - ${formatClock(row.end)}`}
              </Text>
            </TouchableOpacity>
            <RoundButton
              label="+"
              onPress={() => setSchedules([...draft.schedules, emptySchedule()])}
            />
            <RoundButton
              label="-"
              onPress={() => {
                if (draft.schedules.length === 1) {
                  setSchedules([emptySchedule()]);
                  return;
                }
                setSchedules(draft.schedules.filter((_, itemIndex) => itemIndex !== index));
              }}
            />
          </View>
          {openDays === index ? (
            <DayMenu days={row.days} onChange={days => updateSchedule(index, { days })} />
          ) : null}
        </View>
      ))}
      <TimeSheet
        visible={openTime !== null}
        start={openTime === null ? '10:00' : draft.schedules[openTime].start}
        end={openTime === null ? '20:00' : draft.schedules[openTime].end}
        onClose={() => setOpenTime(null)}
        onConfirm={(start, end) => {
          const row = draft.schedules[openTime];
          updateSchedule(openTime, { start, end });
          if (draft.placeId && row?.id) {
            updateWorkingTimeRequest({
              placeId: draft.placeId,
              id: row.id,
              days: row.days,
              start,
              end,
            }).catch(error => console.error('Failed to update working time:', error));
          }
          setOpenTime(null);
        }}
      />
    </RegScreen>
  );
};

const PhotoTile = ({ source, onPress, onRemove, add }) => {
  const Shell = onPress ? TouchableOpacity : View;
  const pressable = onPress ? { activeOpacity: 0.85, onPress } : null;
  return (
    <Shell style={styles.tile} {...pressable}>
      {source ? <Image source={source} style={styles.tileImage} /> : null}
      {add ? (
        <>
          <CenterCamera />
          <Text style={styles.addLabel}>Ավելացնել</Text>
        </>
      ) : null}
      {onRemove ? (
        <TouchableOpacity style={styles.remove} onPress={onRemove}>
          <CloseIcon color="#FFFFFF" size={12} />
        </TouchableOpacity>
      ) : null}
    </Shell>
  );
};

export const PhotosScreen = ({ navigation }) => {
  const { draft, update } = useReg();

  const pickPhoto = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    return fileFromAsset(result.assets?.[0]);
  };

  const addPhoto = async () => {
    try {
      const file = await pickPhoto();
      if (file) update({ photos: [...draft.photos, file] });
    } catch (error) {
      console.error('Failed to choose photo:', error);
    }
  };

  return (
    <RegScreen step={3} onBack={() => navigation.goBack()} onPress={() => navigation.navigate(REG.PREVIEW)}>
      <Text style={styles.title}>Գլխավոր լուսանկար կամ տեսանյութ</Text>
      <TouchableOpacity
        style={styles.cover}
        activeOpacity={0.85}
        onPress={async () => {
          try {
            const file = await pickPhoto();
            if (file) update({ cover: file });
          } catch (error) {
            console.error('Failed to choose cover:', error);
          }
        }}
      >
        {draft.cover ? <Image source={imageSource(draft.cover)} style={styles.coverImage} /> : <CenterCamera />}
      </TouchableOpacity>
      <Text style={styles.blockTitle}>Լուսանկարներ</Text>
      <View style={styles.grid}>
        <PhotoTile add onPress={addPhoto} />
        {draft.photos.map((image, index) => (
          <PhotoTile
            key={`${index}`}
            source={imageSource(image)}
            onRemove={() => update({ photos: draft.photos.filter((_, itemIndex) => itemIndex !== index) })}
          />
        ))}
      </View>
    </RegScreen>
  );
};

const InfoLine = ({ icon, text }) =>
  text ? (
    <View style={styles.infoLine}>
      {icon}
      <Text style={styles.infoText}>{text}</Text>
    </View>
  ) : null;

export const PreviewScreen = ({ navigation }) => {
  const { draft } = useReg();
  const handle = withHandle(draft.handle, draft.name);
  const hours = formatHours(draft.schedules);
  const emails = draft.emails.map(item => item.trim()).filter(Boolean).join('\n');

  return (
    <RegScreen step={4} onBack={() => navigation.goBack()} onPress={() => navigation.navigate(REG.SUCCESS)}>
      <Text style={styles.title}>Նախադիտում</Text>
      <View style={styles.previewLogo}>
        {draft.logo ? <Image source={imageSource(draft.logo)} style={styles.logoImage} /> : <Text style={styles.logoWord}>Logo</Text>}
      </View>
      <Text style={styles.previewName}>{draft.name}</Text>
      {handle ? <Text style={styles.previewHandle}>{handle}</Text> : null}
      {draft.category ? <Text style={styles.previewCategory}>{draft.category}</Text> : null}
        {draft.cover ? (
        <View style={styles.previewCover}>
          <Image source={imageSource(draft.cover)} style={styles.coverImage} />
        </View>
      ) : null}
      <View style={styles.infoList}>
        <InfoLine icon={<PhoneIcon />} text={draft.phone.trim()} />
        <InfoLine icon={<WebIcon />} text={draft.website.trim()} />
        <InfoLine icon={<MailIcon />} text={emails} />
        <InfoLine icon={<ClockIcon />} text={hours} />
      </View>
      {draft.photos.length ? (
        <View style={[styles.grid, styles.previewGrid]}>
          {draft.photos.map((image, index) => (
            <View key={`${index}`} style={styles.tile}>
              <Image source={imageSource(image)} style={styles.tileImage} />
            </View>
          ))}
        </View>
      ) : null}
    </RegScreen>
  );
};

const SuccessMark = () => (
  <View style={styles.successMark}>
    <Text style={styles.successCheck}>✓</Text>
  </View>
);

export const SuccessScreen = ({ navigation }) => {
  const { draft } = useReg();

  const finish = async () => {
    const payload = {
      name: draft.name.trim(),
      handle: withHandle(draft.handle, draft.name),
      logo: draft.logo,
      category: draft.category,
      description: draft.category,
      caption: draft.category,
      phone: draft.phone.trim(),
      website: draft.website.trim(),
      hours: formatHours(draft.schedules),
      emails: draft.emails.map(item => item.trim()).filter(Boolean),
      cover: draft.cover,
      photos: draft.photos,
      schedules: draft.schedules,
      location: '',
    };
    try {
      const created = await createPlaceRequest(placeBody(payload));
      const id = createdPlaceId(created);
      if (id) {
        payload.id = id;
        payload.placeId = id;
        const times = workingTimesBody(payload);
        if (times.working_times.length) {
          await saveWorkingTimesRequest({ id, ...times }).catch(error =>
            console.error('Failed to save working times:', error),
          );
        }
        const files = [draft.cover, ...draft.photos].filter(uploadable);
        if (files.length) {
          const uploaded = await uploadGalleryRequest({ placeId: id, files }).catch(error => {
            console.error('Failed to upload gallery:', error);
            return null;
          });
          if (uploaded) payload.photos = uploaded;
        }
      }
    } catch (error) {
      console.error('Failed to create place:', error);
      return;
    }
    saveCreatedBusiness(payload);
    const root = navigation.getParent();
    if (!root) {
      navigation.navigate(ROUT_NAMES.BUSINESS_INFO);
      return;
    }
    root.dispatch(state => {
      const routes = state.routes.filter(route => route.name !== ROUT_NAMES.BUSINESS_REGISTER);
      const next = [...routes, { name: ROUT_NAMES.BUSINESS_INFO }];
      return CommonActions.reset({
        ...state,
        routes: next,
        index: next.length - 1,
      });
    });
  };

  return (
    <RegScreen
      header={<RegHeader title="" onBack={() => navigation.goBack()} />}
      label="Դիտել էջը"
      onPress={finish}
      scroll={false}
    >
      <View style={styles.successBody}>
        <SuccessMark />
        <Text style={styles.successTitle}>Բիզնես էջը հաջողությամբ ստեղծվեց</Text>
        <Text style={styles.successCopy}>Ձեր էջն այժմ ակտիվ է և տեսանելի հավելվածում</Text>
      </View>
    </RegScreen>
  );
};
