export const REG = {
  INTRO: 'BusinessIntro',
  BASICS: 'BusinessBasics',
  CONTACT: 'BusinessContact',
  PHOTOS: 'BusinessPhotos',
  PREVIEW: 'BusinessPreview',
  SUCCESS: 'BusinessSuccess',
};

export const STEP_COUNT = 4;

export const CATEGORIES = [
  'Ռեստորաններ',
  'Հյուրանոցներ',
  'Սրճարաններ',
  'Ժամանց',
  'Տուրիզմ',
  'Հանգստի վայրեր',
  'Խանութներ',
  'Տրանսպորտ',
  'Լիցքավորում',
  'Ծառայություններ',
  'Արտադրություն',
  'Բժշկություն',
];

export const DAYS = [
  'Երկուշաբթի',
  'Երեքշաբթի',
  'Չորեքշաբթի',
  'Հինգշաբթի',
  'Ուրբաթ',
  'Շաբաթ',
  'Կիրակի',
];

export const HOURS = Array.from({ length: 24 }, (_, index) => {
  const hour = String(index).padStart(2, '0');
  return `${hour}:00`;
});

export const BENEFITS = [
  { id: 'visibility', text: 'Բարձրացրեք ձեր բիզնեսի տեսանելիությունը' },
  { id: 'events', text: 'Ստեղծեք միջոցառումներ' },
  { id: 'feelings', text: 'Պարզեք, թե ինչ են զգում այցելուները ձեր բիզնեսից օգտվելուց' },
  { id: 'visits', text: 'Ստացեք իրական այցելումներ' },
  { id: 'analytics', text: 'Ունեցեք վիճակագրություն և ակտիվ վերլուծություն' },
];

export const LOGOS = [
  require('../../../../assets/images/home/hotel-logo.png'),
  require('../../../../assets/images/services/rest-logo.png'),
  require('../../../../assets/images/services/fun-logo.png'),
];

export const COVERS = [
  require('../../../../assets/images/services/hotel-1.jpg'),
  require('../../../../assets/images/services/rest-1.jpg'),
  require('../../../../assets/images/services/fun-1.jpg'),
  require('../../../../assets/images/home/hotel.png'),
];

export const GALLERY = [
  require('../../../../assets/images/services/hotel-2.jpg'),
  require('../../../../assets/images/services/hotel-3.jpg'),
  require('../../../../assets/images/services/rest-2.jpg'),
  require('../../../../assets/images/services/rest-3.jpg'),
  require('../../../../assets/images/services/fun-2.jpg'),
  require('../../../../assets/images/services/fun-3.jpg'),
];

export const emptySchedule = () => ({
  days: [],
  start: '00:00',
  end: '00:00',
});

export const INITIAL_DRAFT = {
  name: '',
  handle: '',
  category: '',
  logo: null,
  phone: '',
  website: '',
  emails: [''],
  schedules: [emptySchedule()],
  cover: null,
  photos: [],
};

export const formatClock = value => String(value).replace(':', '։');

export const withHandle = (handle, name) => {
  const raw = (handle || name || '').trim().replace(/^@/, '');
  return raw ? `@${raw}` : '';
};

export const formatHours = schedules =>
  schedules
    .filter(item => item.days.length)
    .map(
      item =>
        `${item.days.join(', ')}  ${formatClock(item.start)} - ${formatClock(item.end)}`,
    )
    .join('\n');

export const cycleAsset = (current, list) => {
  if (!current) {
    return list[0] || null;
  }
  const index = list.indexOf(current);
  if (index < 0 || index === list.length - 1) {
    return null;
  }
  return list[index + 1];
};
