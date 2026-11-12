import { baseUrl } from '../../constants/url';

const LIST_KEYS = ['data', 'items', 'results', 'places', 'categories', 'emotions', 'cities', 'gallery', 'images', 'working_times'];

export const asList = payload => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  for (const key of LIST_KEYS) {
    if (Array.isArray(payload[key])) return payload[key];
  }
  if (payload.data && typeof payload.data === 'object') {
    for (const key of LIST_KEYS) {
      if (Array.isArray(payload.data[key])) return payload.data[key];
    }
  }
  return [];
};

const looksLikeResource = value =>
  Boolean(value && (value.name || value.title || value.first_name || value.username || value.email));

export const recordOf = payload => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;
  if (payload.user && typeof payload.user === 'object') return payload.user;
  if (
    payload.data &&
    typeof payload.data === 'object' &&
    !Array.isArray(payload.data) &&
    !looksLikeResource(payload)
  ) {
    return payload.data.user || payload.data;
  }
  return payload;
};

export const nameOf = item => {
  if (typeof item === 'string') return item;
  return item?.name || item?.title || item?.label || '';
};

export const numericId = value => {
  if (value == null || value === '') return null;
  return /^\d+$/.test(String(value)) ? value : null;
};

export const remoteImage = value => {
  if (!value || typeof value !== 'string') return null;
  if (value.startsWith('http')) return { uri: value };
  const root = baseUrl.replace(/\/$/, '');
  return { uri: `${root}/${value.replace(/^\//, '')}` };
};

const filled = patch =>
  Object.fromEntries(Object.entries(patch).filter(([, value]) => value != null && value !== ''));

const GENDER_LABEL = {
  female: 'Իգական',
  male: 'Արական',
  other: 'Չնշել',
};

export const mapCurrentUser = payload => {
  const user = recordOf(payload);
  if (!user) return {};
  const first = user.first_name || user.name;
  const last = user.last_name;
  const handle = user.username || user.handle;
  const city = user.city?.name || (typeof user.city === 'string' ? user.city : '');
  const avatar = user.avatar || user.image || user.profile_image;
  return filled({
    name: [first, last].filter(Boolean).join(' '),
    handle: handle ? (String(handle).startsWith('@') ? handle : `@${handle}`) : '',
    email: user.email,
    phone: user.phone || user.phone_number,
    city,
    gender: GENDER_LABEL[user.gender] || (typeof user.gender === 'string' ? user.gender : ''),
    birthday: user.birthday || user.birthdate,
    avatar: typeof avatar === 'string' ? remoteImage(avatar) : null,
    placeId: user.place_id || user.place?.id,
  });
};

export const mapGalleryPhoto = item => {
  if (!item || typeof item === 'number') return null;
  if (item.uri) return item;
  const source = remoteImage(
    typeof item === 'string' ? item : item.url || item.image || item.path || item.photo,
  );
  if (!source) return null;
  return item.id ? { ...source, id: item.id } : source;
};

export const imageSource = image => (image?.uri ? { uri: image.uri } : image);

export const mapPlace = payload => {
  const place = recordOf(payload);
  if (!place) return {};
  const name = nameOf(place);
  const image = remoteImage(place.logo || place.image || place.cover || place.photo);
  const photos = Array.isArray(place.photos)
    ? place.photos.map(mapGalleryPhoto).filter(Boolean)
    : [];
  return filled({
    id: place.id,
    name,
    handle: place.handle || (name ? `@${name}` : ''),
    description: place.description || place.about,
    caption: place.caption || place.category?.name || (typeof place.category === 'string' ? place.category : ''),
    location: place.location || place.address || place.city?.name,
    phone: place.phone || place.phone_number,
    website: place.website || place.web,
    hours: place.hours || place.working_hours,
    logo: image,
    cover: remoteImage(place.cover || place.image),
    photos: photos.length ? photos : null,
    coins: place.score || place.coins,
  });
};
