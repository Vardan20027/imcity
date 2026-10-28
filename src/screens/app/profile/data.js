import { useEffect, useState } from 'react';
import { ICON_NAMES } from '../../../components/svgs/icon_names';

const ani = require('../../../assets/images/home/avatar-ani.png');
const alex = require('../../../assets/images/notifications/alex.png');
const lilit = require('../../../assets/images/notifications/lilit.png');
const a1 = require('../../../assets/images/home/avatar-1.png');
const a2 = require('../../../assets/images/home/avatar-2.png');
const a3 = require('../../../assets/images/home/avatar-3.png');
const a4 = require('../../../assets/images/home/avatar-4.png');
const a5 = require('../../../assets/images/home/avatar-5.png');
const hotelLogo = require('../../../assets/images/home/hotel-logo.png');
const concert = require('../../../assets/images/home/concert.png');
const scorpions = require('../../../assets/images/home/scorpions-logo.png');

const mem = [
  require('../../../assets/images/services/mem-1.jpg'),
  require('../../../assets/images/services/mem-2.png'),
  require('../../../assets/images/services/mem-3.png'),
  require('../../../assets/images/services/mem-4.jpg'),
  require('../../../assets/images/services/mem-5.png'),
  require('../../../assets/images/services/mem-6.jpg'),
  require('../../../assets/images/services/mem-7.jpg'),
  require('../../../assets/images/services/mem-8.jpg'),
  require('../../../assets/images/services/mem-9.jpg'),
];

export const ME = {
  id: 'me',
  name: 'Անի Եսայան',
  handle: '@ani_yesayan',
  avatar: ani,
  city: 'Կապան',
  gender: 'Իգական',
  birthday: '15.05.1994',
  email: 'ani@imcity.am',
  phone: '+374 91 000 000',
  score: '2,500',
  contacts: 120,
  unreadChats: 3,
  weekly: 0.68,
  fire: '1500',
  leaf: '720',
  heart: '500',
};

let profile = { ...ME };
const listeners = new Set();

export const getProfile = () => profile;

export const updateProfile = patch => {
  profile = { ...profile, ...patch };
  listeners.forEach(listener => listener(profile));
};

export const useProfile = () => {
  const [state, setState] = useState(profile);
  useEffect(() => {
    const listener = next => setState({ ...next });
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);
  return state;
};

export const ANNA = {
  id: 'anna',
  name: 'Աննա Գևորգյան',
  handle: '@anna gevorgyan',
  avatar: lilit,
  city: 'Կապան',
  score: '2,500',
  contacts: 120,
  unreadChats: 3,
  fire: '1500',
  leaf: '720',
  heart: '500',
};

export const EMOTION_BARS = [
  { id: 1, icon: ICON_NAMES.EMOTIONS.CALM, color: '#6EAA4E', value: 32 },
  { id: 2, icon: ICON_NAMES.EMOTIONS.DRIVE, color: '#FF8700', value: 40 },
  { id: 3, icon: ICON_NAMES.EMOTIONS.ROMANCE, color: '#F4466E', value: 8 },
  { id: 4, icon: ICON_NAMES.EMOTIONS.FUN, color: '#FFCC00', value: 15 },
  { id: 5, icon: ICON_NAMES.EMOTIONS.DISCOVERY, color: '#DA61FF', value: 12 },
  { id: 6, icon: ICON_NAMES.EMOTIONS.WORKING, color: '#46A3F4', value: 10 },
  { id: 7, icon: ICON_NAMES.EMOTIONS.INSPIRATION, color: '#2EC4B6', value: 38 },
];

export const MEMORIES = mem.map((image, index) => ({
  id: `mem-${index + 1}`,
  image,
  logo: hotelLogo,
  place: 'Արմենիա հոթել',
  city: 'Կապան',
}));

export const EVENTS = [
  {
    id: 'scorpions-1',
    author: 'Scorpions',
    logo: scorpions,
    media: concert,
    date: 'Մայիս 25',
    time: '19:00',
    countdown: '2 օրից',
    description:
      'Scorpions-ը գալիս է Երևան: Լեգենդար Scorpions ռոք խումբը պատրաստվում է ...',
    location: 'Event Hub',
    price: '35 $',
    count: '2640',
  },
  {
    id: 'scorpions-2',
    author: 'Scorpions',
    logo: scorpions,
    media: concert,
    date: 'Մայիս 25',
    time: '19:00',
    countdown: '2 օրից',
    description:
      'Scorpions-ը գալիս է Երևան: Լեգենդար Scorpions ռոք խումբը պատրաստվում է ...',
    location: 'Event Hub',
    price: '35 $',
    count: '2640',
  },
];

const preview = 'Բարև, լավ ես...';

export const CHATS = [
  { id: 'c1', user: ANNA, preview, time: '10:30', unread: 2, avatar: lilit },
  { id: 'c2', user: { ...ANNA, id: 'u2', name: 'Աննա Գևորգյան' }, preview, time: '10:30', unread: 2, avatar: a1 },
  { id: 'c3', user: ANNA, preview, time: '10:30', unread: 2, avatar: a2 },
  { id: 'c4', user: ANNA, preview, time: '10:30', unread: 2, avatar: a3 },
  { id: 'c5', user: ANNA, preview, time: '10:30', unread: 2, avatar: a4 },
  { id: 'c6', user: ANNA, preview, time: '10:30', unread: 2, avatar: a5 },
  { id: 'c7', user: ANNA, preview, time: '10:30', unread: 2, avatar: alex },
].map((item, index) => ({
  ...item,
  id: `c${index + 1}`,
  user: { ...ANNA, id: `chat-user-${index}`, avatar: item.avatar },
}));

export const INVITES = [
  {
    id: 'inv-1',
    name: 'Ալեքս Մանուկյան',
    avatar: alex,
    cover: concert,
    text: 'Ձեզ հրավիրել է միջոցառման\n«Scorpions համերգ»',
    time: '20 րոպե առաջ',
  },
  {
    id: 'inv-2',
    name: 'Ալեքս Մանուկյան',
    avatar: a1,
    cover: concert,
    text: 'Ձեզ հրավիրել է միջոցառման\n«Scorpions համերգ»',
    time: '20 րոպե առաջ',
  },
];

const contactName = 'Ալեքս Բարսեղյան';

export const CONTACTS = [a1, a2, a3, a4, a5, alex, lilit, ani].map((avatar, index) => ({
  id: `contact-${index}`,
  name: contactName,
  avatar,
  user: { ...ANNA, id: `contact-user-${index}`, name: contactName, avatar },
}));

export const SUGGESTED = [a2, a3, a4, a5, alex, lilit, a1].map((avatar, index) => ({
  id: `sug-${index}`,
  name: contactName,
  avatar,
  mutual: '12 ընդհանուր կոնտակտ',
  user: { ...ANNA, id: `sug-user-${index}`, name: contactName, avatar },
}));

export const CITIES = [
  'Երևան',
  'Գյումրի',
  'Վանաձոր',
  'Աբովյան',
  'Կապան',
  'Գորիս',
  'Դիլիջան',
];

export const GENDERS = ['Իգական', 'Արական'];

export const LANGUAGES = [
  { id: 'hy', label: 'Հայերեն' },
  { id: 'en', label: 'English' },
  { id: 'ru', label: 'Русский' },
];

export const BUSINESSES = [
  { id: 'personal', name: 'Անձնական էջ' },
  { id: 'business', name: 'Բիզնես էջ' },
];

export const FAQS = [
  'Ինչպե՞ս փոխել գաղտնաբառը',
  'Ինչպե՞ս ջնջել հաշիվը',
  'Ինչպե՞ս հրավիրել ընկերոջը',
  'Ինչ է շաբաթական ակտիվությունը',
  'Ինչպե՞ս ստեղծել բիզնես էջ',
  'Ինչպե՞ս փոխել քաղաքը',
  'Ինչպե՞ս կառավարել ծանուցումները',
  'Ինչպե՞ս կապվել աջակցման հետ',
];

export const NOTIFICATION_TOGGLES = [
  { id: 'messages', label: 'Հաղորդագրություններ' },
  { id: 'invites', label: 'Հրավերներ' },
  { id: 'events', label: 'Միջոցառումներ' },
  { id: 'system', label: 'Համակարգային' },
];

export const THREAD = [
  { id: 'd1', type: 'date', text: 'Երեքշաբթի, 19 օգ.' },
  { id: 'm1', type: 'out', text: 'Բարև, լավ ես' },
  { id: 'm2', type: 'in', text: 'Բարև, լավ եմ։ Այսօր կգա՞ս համերգին' },
  { id: 'd2', type: 'date', text: 'Ուրբաթ, 22 օգ.' },
  { id: 'v1', type: 'voice', mine: false, duration: '0:12' },
  { id: 'v2', type: 'voice', mine: true, duration: '0:08' },
  { id: 'd3', type: 'date', text: 'Այսօր' },
  { id: 'img1', type: 'image', mine: true },
];
