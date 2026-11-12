import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { useCreatedBusiness, usePromoted } from '../register/store';
import { useApiItem, useApiList } from '../../../../state/reads/useList';
import { getCurrentUser, getGallery, getPlaceDetail } from '../../../../state/reads/operations';
import { mapCurrentUser, mapGalleryPhoto, mapPlace, numericId } from '../../../../state/reads/shape';
import { updateProfile, useProfile } from '../../profile/data';
import dispatch from '../../../../utils/dispatch/dispatch';

const hotel = require('../../../../assets/images/home/hotel.png');
const memory = require('../../../../assets/images/home/memory.png');
const attraction = require('../../../../assets/images/home/attraction.png');
const concert = require('../../../../assets/images/home/concert.png');

export const SAMPLE_PHOTOS = [hotel, memory, attraction, concert, hotel, memory];

export const PROMO_POINTS = [
  {
    id: 'see',
    title: 'Տեսանելիության բարձրացում',
    body: 'Ձեր բիզնեսը ավելի հաճախ է ցուցադրվելու գլխավոր էջում, բաժիններում և առաջարկություններում',
  },
  {
    id: 'visits',
    title: 'Ավելի շատ իրական այցելուներ',
    body: 'Ձեր բիզնեսը կտեսնեն այն մարդիկ, ովքեր ավելի մեծ հավանականությամբ կայցելեն ձեր մոտ',
  },
  {
    id: 'feel',
    title: 'Ավելի շատ էմոցիաներ',
    body: 'Ավելի շատ այցելուներ նշանակում է ավելի շատ էմոցիաներ և ավելի հարուստ էմոցիոնալ պրոֆիլ',
  },
  {
    id: 'look',
    title: 'Տարբերվող դիզայն',
    body: 'Ձեր էջը ստանում է արտահայտիչ տեքստ, որը գրավում է այցելուների ուշադրությունը',
  },
];

export const NOTES = [
  {
    id: 'n1',
    title: 'Scorpions համերգ',
    body: 'Խումբը կներկայացնի իր հայտնի հիթերը կենդանի կատարմամբ:',
    time: '20 րոպե առաջ',
    image: concert,
  },
  {
    id: 'n2',
    title: 'SMM դասընթաց',
    body: 'Սկսվում է նոր դասընթաց SMM թեմայով:',
    time: '1 ժամ առաջ',
    image: memory,
  },
];

export const SAMPLE_METRICS = {
  fire: '1500',
  leaf: '720',
  heart: '500',
  score: '2,500',
  progress: 0.68,
  messages: 3,
  reach: '3500',
  reachDelta: '+24%',
  views: '10,680',
  viewsDelta: '+14%',
};

export const EMPTY_METRICS = {
  fire: '0',
  leaf: '0',
  heart: '0',
  score: '0',
  progress: 0,
  messages: 0,
  reach: '0',
  reachDelta: '',
  views: '0',
  viewsDelta: '',
};

const FALLBACK = {
  name: 'Արմենիա հյուրանոց',
  handle: '@armenia hotel',
  logo: require('../../../../assets/images/home/hotel-logo.png'),
  category: 'Հյուրանոցներ',
  caption: 'Էներգիաներով լիցքավորված',
  description:
    'Բացահայտեք բարձրակարգ խոհանոցը մեզ հետ: Վայելեք յուրահատուկ համեր և հարմարավետ միջավայր',
  location: 'Event Hub',
  phone: '+37477543321',
  website: 'www.armenia.hotel',
  hours: '09:00 - 23:00',
  emails: [],
  cover: hotel,
  photos: SAMPLE_PHOTOS,
};

export const useBusinessPage = () => {
  const route = useRoute();
  const created = useCreatedBusiness();
  const promoted = usePromoted();
  const user = useProfile();
  const explicitId = route.params?.id || route.params?.placeId || created?.id || created?.placeId;
  const placeId = numericId(explicitId || user.placeId);

  useEffect(() => {
    if (placeId) return undefined;
    let live = true;
    dispatch(getCurrentUser())
      .unwrap()
      .then(data => {
        if (!live) return;
        const patch = mapCurrentUser(data);
        if (Object.keys(patch).length) updateProfile(patch);
      })
      .catch(error => console.error('Failed to load current user:', error));
    return () => {
      live = false;
    };
  }, [placeId]);
  const remote = useApiItem(getPlaceDetail, placeId);
  const gallery = useApiList(getGallery, placeId);
  const source = created || (route.params?.name ? route.params : null);
  const sample = !created;
  const metrics = sample ? SAMPLE_METRICS : EMPTY_METRICS;
  const base = !source
    ? { ...FALLBACK, sample, promoted, metrics }
    : {
        id: source.id,
        placeId: source.placeId || source.id,
        name: source.name || '',
        handle: source.handle || '',
        logo: source.logo || null,
        category: source.category || source.caption || '',
        caption: source.caption || source.category || '',
        description: source.description || '',
        location: source.location || '',
        phone: source.phone || '',
        website: source.website || '',
        hours: source.hours || '',
        emails: source.emails || [],
        cover: source.cover || null,
        photos: source.photos || [],
        schedules: source.schedules || [],
        sample,
        promoted,
        metrics,
      };
  const page = { ...base, ...mapPlace(remote) };
  const galleryPhotos = (gallery || []).map(mapGalleryPhoto).filter(Boolean);
  if (galleryPhotos.length) page.photos = galleryPhotos;
  return page;
};
