import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MIcon from '../../../../components/svgs';
import { ICON_NAMES } from '../../../../components/svgs/icon_names';
import { normalize } from '../../../../assets/deviceInfo/normalize';
import { COLORS } from '../../../../assets/rootStyles';
import { FireIcon, HeartFillIcon, LeafIcon, MoreIcon, PlayIcon, VolumeIcon } from '../../home/icons';
import {
  BalloonIcon,
  ChatIcon,
  ClockIcon,
  EyeIcon,
  PhoneIcon,
  PinIcon,
  SparkleIcon,
  TabCalIcon,
  TabGridIcon,
  TabInfoIcon,
  TabListIcon,
  WebIcon,
} from '../icons';
import { MailIcon, MenuIcon, PencilIcon, ShareIcon, SparkleIcon as SparkleMark, TrashIcon, BellIcon } from '../../profile/icons';
import { BottomSheet, PageHeader, PrimaryButton, SheetAction } from '../../profile/parts';
import { ROUT_NAMES } from '../../../../constants/rout';
import { P } from '../../profile/routes';
import { saveCreatedBusiness, setPromoted } from '../register/store';
import { listenMapPick } from '../mapPick';
import { COVERS, LOGOS, cycleAsset } from '../register/data';
import { CategorySheet, CenterCamera, RegField, RoundButton } from '../register/parts';
import { NOTES, PROMO_POINTS, useBusinessPage } from './data';
import { imageSource, numericId } from '../../../../state/reads/shape';
import {
  deleteGalleryRequest,
  deletePlaceRequest,
  fileFromAsset,
  placeBody,
  saveWorkingTimesRequest,
  updatePlaceRequest,
  uploadGalleryRequest,
  workingTimesBody,
} from '../api';
import { launchImageLibrary } from 'react-native-image-picker';
import SettingsNavigator from '../settings';
import { OwnerEmotionPeopleScreen, OwnerEmotionsScreen } from '../emotions';
import {
  EventDetailScreen,
  EventFormScreen,
  EventPane,
  EventStatsScreen,
  ParticipantsScreen,
} from '../owner/events';
import { ListDetailScreen, ListFormScreen, ListPane } from '../owner/lists';
import { AnalyticsScreen } from '../owner/analytics';
import styles from './styles';

const TABS = [
  { id: 'gallery', Icon: TabGridIcon },
  { id: 'info', Icon: TabInfoIcon },
  { id: 'event', Icon: TabCalIcon },
  { id: 'list', Icon: TabListIcon },
];

const FACES = [
  require('../../../../assets/images/home/avatar-5.png'),
  require('../../../../assets/images/home/avatar-1.png'),
  require('../../../../assets/images/home/avatar-2.png'),
];

const InfoLine = ({ icon, text, textStyle, onPress }) =>
  text ? (
    <TouchableOpacity
      style={styles.contactLine}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      {icon}
      <Text style={[styles.contactText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  ) : null;

const OwnerInfoScreen = ({ navigation }) => {
  const business = useBusinessPage();
  const [tab, setTab] = useState('info');
  const [expanded, setExpanded] = useState(false);
  const [menu, setMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [boostHidden, setBoostHidden] = useState(false);
  const [muted, setMuted] = useState(false);
  const description = business.description || '';
  const long = description.length > 90;
  const metrics = business.metrics;
  const showBoost = (business.sample || business.promoted) && !boostHidden;

  const openApp = (name, params) => navigation.getParent()?.navigate(name, params);

  const share = () => {
    setMenu(false);
    Share.share({
      message: [business.name, business.website].filter(Boolean).join('\n'),
    }).catch(() => {});
  };

  const remove = async () => {
    const id = numericId(business.id || business.placeId);
    if (id) {
      try {
        await deletePlaceRequest(id);
      } catch (error) {
        console.error('Failed to delete place:', error);
        return;
      }
    }
    saveCreatedBusiness(null);
    navigation.getParent()?.goBack();
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerSide} onPress={() => navigation.getParent()?.goBack()}>
          <MIcon name={ICON_NAMES.ARROWS.BACK} width={normalize(22)} height={normalize(22)} />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>{business.name}</Text>
          {business.handle ? <Text style={styles.headerHandle}>{business.handle}</Text> : null}
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerNotes')} hitSlop={8}>
            <BellIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerSettings')} hitSlop={8}>
            <MenuIcon />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.stage}>
          <View style={styles.glow} />
          <View style={styles.glowAlt} />
          <TouchableOpacity style={styles.scorePill} onPress={() => navigation.navigate('OwnerEmotions')}>
            <SparkleMark />
            <Text style={styles.scoreText}>{metrics.score}</Text>
          </TouchableOpacity>
          {metrics.messages ? (
            <TouchableOpacity
              style={styles.chatBadge}
              onPress={() =>
                openApp(ROUT_NAMES.TAB, {
                  screen: ROUT_NAMES.PROFILE,
                  params: { screen: P.MESSAGES },
                })
              }
            >
              <ChatIcon />
              <View style={styles.chatCount}>
                <Text style={styles.chatCountText}>{metrics.messages}</Text>
              </View>
            </TouchableOpacity>
          ) : null}
          <View style={styles.logoRing}>
            {business.logo ? (
              <Image source={business.logo} style={styles.logo} />
            ) : (
              <View style={styles.logo} />
            )}
          </View>
          <View style={styles.progressRow}>
            <Text style={styles.progressValue}>{Math.round(metrics.progress * 100)}%</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${metrics.progress * 100}%` }]} />
            </View>
          </View>
        </View>
        <View style={styles.statCard}>
          <View style={styles.stat}>
            <FireIcon />
            <Text style={styles.statValue}>{metrics.fire}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <LeafIcon />
            <Text style={styles.statValue}>{metrics.leaf}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <HeartFillIcon />
            <Text style={styles.statValue}>{metrics.heart}</Text>
          </View>
        </View>
        <View style={styles.reachCard}>
          <View style={styles.reachItem}>
            <SparkleMark />
            <Text style={styles.statValue}>{metrics.reach}</Text>
            {metrics.reachDelta ? <Text style={styles.delta}>{metrics.reachDelta}</Text> : null}
          </View>
          <View style={styles.statDivider} />
          <View style={styles.reachItem}>
            <EyeIcon />
            <Text style={styles.statValue}>{metrics.views}</Text>
            {metrics.viewsDelta ? <Text style={styles.delta}>{metrics.viewsDelta}</Text> : null}
          </View>
        </View>
        {showBoost ? (
          <View style={styles.boost}>
            <TouchableOpacity style={styles.boostClose} onPress={() => setBoostHidden(true)}>
              <Text style={styles.boostCloseText}>×</Text>
            </TouchableOpacity>
            <View style={styles.boostRow}>
              <BalloonIcon />
              <View style={styles.boostCopy}>
                <Text style={styles.boostTitle}>X 10 անգամ</Text>
                <Text style={styles.boostBody}>
                  Ավելի շատ մարդիկ ներգրավեք դեպի ձեր բիզնեսը, բարձրացնելով տեսանելիությունը և հաճախումները
                </Text>
                <View style={styles.faces}>
                  {FACES.map((face, index) => (
                    <Image
                      key={`face-${index}`}
                      source={face}
                      style={[styles.face, index > 0 && styles.faceOverlap]}
                    />
                  ))}
                  <Text style={styles.boostNote}>
                    <Text style={styles.boostStrong}>24,000</Text>
                    {'+  մարդ արդեն այցելել են\nՌեստորան ձեր քաղաքում'}
                  </Text>
                </View>
                <TouchableOpacity style={styles.proBtn} onPress={() => navigation.navigate('OwnerPromote')}>
                  <Text style={styles.proText}>PRO փաթեթ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : boostHidden ? null : (
          <TouchableOpacity
            style={styles.promo}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('OwnerPromote')}
          >
            <Text style={styles.promoTitle}>Խթանել էջը</Text>
            <Text style={styles.promoBody}>
              Օգնեք ավելի շատ մարդկանց զգալ ձեր բիզնեսի մթնոլորտը
            </Text>
            <View style={styles.promoPrice}>
              <Text style={styles.promoPriceText}>9,9$</Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.tabs}>
          {TABS.map(item => (
            <TouchableOpacity key={item.id} style={styles.tabBtn} onPress={() => setTab(item.id)}>
              <item.Icon active={tab === item.id} />
            </TouchableOpacity>
          ))}
        </View>

        {tab === 'info' ? (
          <>
            <View style={styles.cover}>
              {business.cover ? (
                <Image source={business.cover} style={styles.coverImage} />
              ) : null}
              <View style={styles.play} pointerEvents="none">
                <PlayIcon />
              </View>
              <TouchableOpacity style={styles.moreBtn} onPress={() => setMenu(true)}>
                <MoreIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.soundBtn} onPress={() => setMuted(value => !value)}>
                <View style={muted ? styles.muted : null}>
                  <VolumeIcon />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.copy}>
              <Text style={styles.copyText} numberOfLines={expanded ? undefined : 3}>
                {description || 'Ավելացրեք նկարագրություն'}
              </Text>
              {long ? (
                <TouchableOpacity onPress={() => setExpanded(value => !value)}>
                  <Text style={styles.moreLink}>{expanded ? 'փակել' : 'more'}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.contactRow}>
              <View style={styles.contactCol}>
                <InfoLine
                  icon={<PinIcon />}
                  text={business.location}
                  onPress={() => openApp(ROUT_NAMES.MAP, { address: business.location })}
                />
                <InfoLine icon={<PhoneIcon />} text={business.phone} />
                <InfoLine icon={<WebIcon />} text={business.website} />
                <InfoLine icon={<MailIcon />} text={business.emails.filter(Boolean).join('\n')} />
                <InfoLine icon={<ClockIcon />} text={business.hours} textStyle={styles.hoursText} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('OwnerEdit')}>
                <PencilIcon />
              </TouchableOpacity>
            </View>
            {business.photos.length ? (
              <View style={styles.grid}>
                {business.photos.map((image, index) => (
                  <TouchableOpacity
                    key={`${index}`}
                    style={styles.tile}
                    onPress={() => navigation.navigate('OwnerPhoto', { index })}
                  >
                    <Image source={imageSource(image)} style={styles.tileImage} />
                    <View style={styles.tileBadge} pointerEvents="none">
                      <SparkleMark />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={styles.empty}>Լուսանկարներ դեռ չկան</Text>
            )}
          </>
        ) : null}
        {tab === 'gallery' ? (
          business.photos.length ? (
            <View style={styles.grid}>
              {business.photos.map((image, index) => (
                <TouchableOpacity
                  key={`${index}`}
                  style={styles.tile}
                  onPress={() => navigation.navigate('OwnerPhoto', { index })}
                >
                  <Image source={imageSource(image)} style={styles.tileImage} />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.empty}>Լուսանկարներ դեռ չկան</Text>
          )
        ) : null}
        {tab === 'event' ? <EventPane navigation={navigation} /> : null}
        {tab === 'list' ? <ListPane navigation={navigation} /> : null}
      </ScrollView>
      <BottomSheet visible={menu} onClose={() => setMenu(false)}>
        <SheetAction
          icon={<PencilIcon />}
          label="Խմբագրել"
          onPress={() => {
            setMenu(false);
            navigation.navigate('OwnerEdit');
          }}
        />
        <SheetAction icon={<ShareIcon />} label="Կիսվել" onPress={share} />
        <SheetAction
          icon={<SparkleMark />}
          label="Վիճակագրություն"
          onPress={() => {
            setMenu(false);
            navigation.navigate('OwnerAnalytics');
          }}
        />
        <SheetAction
          icon={<BellIcon />}
          label="Ծանուցումներ"
          onPress={() => {
            setMenu(false);
            navigation.navigate('OwnerNotes');
          }}
        />
        <SheetAction
          icon={<TrashIcon />}
          label="Ջնջել էջը"
          danger
          onPress={() => {
            setMenu(false);
            setConfirmDelete(true);
          }}
        />
      </BottomSheet>
      <BottomSheet visible={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <Text style={styles.promoBody}>
          Վստահ եք, որ ցանկանում եք ջնջել ձեր բիզնես էջը? Ձեր տվյալները հնարավոր չի լինի վերականգնել:
        </Text>
        <View style={styles.sheetGap} />
        <PrimaryButton label="Ջնջել" onPress={remove} />
      </BottomSheet>
    </SafeAreaView>
  );
};

const PhotoScreen = ({ navigation, route }) => {
  const business = useBusinessPage();
  const photos = business.photos.length ? business.photos : [];
  const [index, setIndex] = useState(route.params?.index || 0);
  const [menu, setMenu] = useState(false);
  const photo = photos[index];

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.photo}>
        {photo ? <Image source={imageSource(photo)} style={styles.photoImage} /> : null}
        <View style={styles.photoBar}>
          <TouchableOpacity style={styles.photoIcon} onPress={() => navigation.goBack()}>
            <MIcon name={ICON_NAMES.ARROWS.BACK} width={normalize(18)} height={normalize(18)} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoIcon} onPress={() => setMenu(true)}>
            <Text style={styles.headerTitle}>•••</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.dots}>
        {photos.map((_, dot) => (
          <TouchableOpacity key={dot} onPress={() => setIndex(dot)}>
            <View style={[styles.dot, dot === index && styles.dotOn]} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.emotions}>
        <LeafIcon />
        <FireIcon />
        <HeartFillIcon />
      </View>
      <BottomSheet visible={menu} onClose={() => setMenu(false)}>
        <SheetAction
          icon={<ShareIcon />}
          label="Կիսվել"
          onPress={() => {
            setMenu(false);
            Share.share({ message: business.name }).catch(() => {});
          }}
        />
        <SheetAction
          icon={<TrashIcon />}
          label="Ջնջել լուսանկարը"
          danger
          onPress={async () => {
            const placeId = numericId(business.id || business.placeId);
            if (placeId && photo?.id) {
              try {
                await deleteGalleryRequest({ placeId, imageId: photo.id });
              } catch (error) {
                console.error('Failed to delete gallery image:', error);
                return;
              }
            }
            const next = photos.filter((_, item) => item !== index);
            saveCreatedBusiness({ ...business, photos: next });
            setMenu(false);
            if (!next.length) {
              navigation.goBack();
            } else {
              setIndex(0);
            }
          }}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

const EditScreen = ({ navigation }) => {
  const business = useBusinessPage();
  const [draft, setDraft] = useState({
    ...business,
    emails: business.emails.length ? business.emails : [''],
  });
  const [categoryOpen, setCategoryOpen] = useState(false);
  const patch = next => setDraft(current => ({ ...current, ...next }));

  useEffect(() => listenMapPick(location => setDraft(current => ({ ...current, location }))), []);

  const save = async () => {
    const next = {
      ...draft,
      emails: draft.emails.map(item => item.trim()).filter(Boolean),
    };
    const id = numericId(next.id || next.placeId);
    if (id) {
      try {
        await updatePlaceRequest({ id, ...placeBody(next) });
        const times = workingTimesBody(next);
        if (times.hours || times.working_times.length) {
          await saveWorkingTimesRequest({ id, ...times });
        }
      } catch (error) {
        console.error('Failed to update place:', error);
        return;
      }
    }
    saveCreatedBusiness(next);
    navigation.goBack();
  };

  const addPhoto = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
      const file = fileFromAsset(result.assets?.[0]);
      if (!file) return;
      const id = numericId(draft.id || draft.placeId);
      if (id) {
        const uploaded = await uploadGalleryRequest({ placeId: id, files: [file] });
        patch({ photos: [...draft.photos, ...(uploaded || [file])] });
        return;
      }
      patch({ photos: [...draft.photos, file] });
    } catch (error) {
      console.error('Failed to upload gallery image:', error);
    }
  };

  const removePhoto = async index => {
    const photo = draft.photos[index];
    const id = numericId(draft.id || draft.placeId);
    if (id && photo?.id) {
      try {
        await deleteGalleryRequest({ placeId: id, imageId: photo.id });
      } catch (error) {
        console.error('Failed to delete gallery image:', error);
        return;
      }
    }
    patch({ photos: draft.photos.filter((_, item) => item !== index) });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader
        title="Խմբագրել"
        onBack={() => navigation.goBack()}
        right={
          <TouchableOpacity onPress={save}>
            <Text style={styles.save}>Պահպանել</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        <TouchableOpacity
          style={styles.editCover}
          onPress={() => patch({ cover: cycleAsset(draft.cover, COVERS) })}
        >
          {draft.cover ? <Image source={imageSource(draft.cover)} style={styles.coverImage} /> : <CenterCamera />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editLogo}
          onPress={() => patch({ logo: cycleAsset(draft.logo, LOGOS) })}
        >
          <View style={styles.logoCircle}>
            {draft.logo ? (
              <Image source={imageSource(draft.logo)} style={styles.logoFill} />
            ) : (
              <Text style={styles.logoWord}>Logo</Text>
            )}
          </View>
        </TouchableOpacity>
        <RegField
          label="Բիզնեսի անուն"
          value={draft.name}
          onChangeText={name => patch({ name })}
          autoCapitalize="words"
        />
        <RegField
          label="Օգտանուն"
          value={draft.handle}
          onChangeText={handle => patch({ handle })}
        />
        <RegField
          label="Կատեգորիա"
          value={draft.category}
          placeholder="Ընտրել"
          onPress={() => setCategoryOpen(true)}
        />
        <View style={styles.area}>
          <Text style={styles.areaLabel}>Նկարագրություն</Text>
          <TextInput
            value={draft.description}
            onChangeText={description => patch({ description })}
            style={styles.areaInput}
            multiline
            placeholder="Պատմեք ձեր բիզնեսի մասին"
            placeholderTextColor="#B5B5B5"
          />
        </View>
        <RegField
          label="Հեռախոսահամար"
          value={draft.phone}
          onChangeText={phone => patch({ phone })}
          keyboardType="phone-pad"
        />
        <TouchableOpacity
          style={styles.map}
          onPress={() =>
            navigation.getParent()?.navigate(ROUT_NAMES.MAP, {
              address: draft.location || 'Երևան, Աբովյան 22',
              picker: true,
            })
          }
        >
          <PinIcon />
          <Text style={styles.mapText}>{draft.location || 'Նշեք հասցեն'}</Text>
        </TouchableOpacity>
        <RegField
          label="Վեբկայք"
          value={draft.website}
          onChangeText={website => patch({ website })}
          keyboardType="url"
        />
        {draft.emails.map((email, index) => (
          <RegField
            key={`mail-${index}`}
            label={index === 0 ? 'Էլ. հասցե' : 'Նոր էլ. հասցե'}
            value={email}
            onChangeText={value =>
              patch({ emails: draft.emails.map((item, itemIndex) => (itemIndex === index ? value : item)) })
            }
            keyboardType="email-address"
            right={
              index === draft.emails.length - 1 ? (
                <RoundButton label="+" onPress={() => patch({ emails: [...draft.emails, ''] })} />
              ) : null
            }
          />
        ))}
        <RegField
          label="Աշխատաժամեր"
          value={draft.hours}
          onChangeText={hours => patch({ hours })}
          placeholder="Երկուշաբթի 10։00 - 20։00"
        />
        <Text style={styles.promoTitle}>Լուսանկարներ</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.tile} onPress={addPhoto}>
            <CenterCamera />
            <Text style={styles.moreLink}>Ավելացնել</Text>
          </TouchableOpacity>
          {draft.photos.map((image, index) => (
            <TouchableOpacity
              key={`${index}`}
              style={styles.tile}
              onPress={() => removePhoto(index)}
            >
              <Image source={imageSource(image)} style={styles.tileImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <CategorySheet
        visible={categoryOpen}
        value={draft.category}
        onClose={() => setCategoryOpen(false)}
        onSelect={category => {
          patch({ category, caption: category });
          setCategoryOpen(false);
        }}
      />
    </SafeAreaView>
  );
};

const PromoteScreen = ({ navigation }) => {
  const [done, setDone] = useState(false);
  const activate = () => {
    setPromoted(true);
    setDone(true);
  };
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <PageHeader title="Խթանում" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.pad}>
        <Text style={styles.promoHead}>Օգնեք ավելի շատ մարդկանց զգալ ձեր բիզնեսի մթնոլորտը</Text>
        {PROMO_POINTS.map(item => (
          <View key={item.id} style={styles.point}>
            <SparkleIcon />
            <View style={styles.flex}>
              <Text style={styles.pointTitle}>{item.title}</Text>
              <Text style={styles.pointBody}>{item.body}</Text>
            </View>
          </View>
        ))}
        <Text style={styles.price}>9,9$</Text>
        <PrimaryButton
          label={done ? 'Ակտիվ է' : 'Շարունակել'}
          disabled={done}
          onPress={activate}
        />
        <Text style={styles.footnote}>Ցանկացած ժամանակ կարող եք փոխել կամ չեղարկել փաթեթը</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const NotesScreen = ({ navigation }) => (
  <SafeAreaView style={styles.screen} edges={['top']}>
    <PageHeader title="Ծանուցումներ" onBack={() => navigation.goBack()} />
    <ScrollView contentContainerStyle={styles.pad}>
      {NOTES.map(item => (
        <View key={item.id} style={styles.note}>
          <Image source={item.image} style={styles.noteImage} />
          <View style={styles.flex}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteBody}>{item.body}</Text>
            <Text style={styles.noteTime}>{item.time}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  </SafeAreaView>
);

const Stack = createNativeStackNavigator();

const InfoNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
      contentStyle: { backgroundColor: COLORS.white },
    }}
  >
    <Stack.Screen name="OwnerInfo" component={OwnerInfoScreen} />
    <Stack.Screen name="OwnerEdit" component={EditScreen} />
    <Stack.Screen name="OwnerPhoto" component={PhotoScreen} />
    <Stack.Screen name="OwnerPromote" component={PromoteScreen} />
    <Stack.Screen name="OwnerNotes" component={NotesScreen} />
    <Stack.Screen name="OwnerSettings" component={SettingsNavigator} />
    <Stack.Screen name="OwnerEmotions" component={OwnerEmotionsScreen} />
    <Stack.Screen name="OwnerEmotionPeople" component={OwnerEmotionPeopleScreen} />
    <Stack.Screen name="OwnerEventForm" component={EventFormScreen} />
    <Stack.Screen name="OwnerEventDetail" component={EventDetailScreen} />
    <Stack.Screen name="OwnerEventStats" component={EventStatsScreen} />
    <Stack.Screen name="OwnerParticipants" component={ParticipantsScreen} />
    <Stack.Screen name="OwnerListForm" component={ListFormScreen} />
    <Stack.Screen name="OwnerListDetail" component={ListDetailScreen} />
    <Stack.Screen name="OwnerAnalytics" component={AnalyticsScreen} />
  </Stack.Navigator>
);

export default InfoNavigator;
