import { useSyncExternalStore } from 'react';
import { useCreatedBusiness } from '../register/store';

const concert = require('../../../../assets/images/home/concert.png');
const memory = require('../../../../assets/images/home/memory.png');

export const SAMPLE_EVENTS = [
  {
    id: 'scorpions',
    name: 'Scorpions',
    date: 'Մայիս 25',
    time: '19:00',
    countdown: '2 օրից',
    price: '35 $',
    location: 'Event Hub',
    description:
      'Scorpions-ը գալիս է Երևան: Լեգենդար Scorpions ռոք խումբը պատրաստվում է ներկայացնել իր հայտնի հիթերը կենդանի կատարմամբ',
    cover: concert,
    past: false,
    joined: '2640',
    emotions: [2, 4],
  },
];

export const SAMPLE_LISTS = [
  {
    id: 'lux',
    title: 'LUX',
    description:
      'Նախատեսված է երկուսի համար, ունի էլեկտրական WIFI, սառնարան, 120 սմ լայնությամբ երկտեղանոց մահճակալ և պատշգամբ',
    price: '48 $',
    image: memory,
    views: '15,862',
    comments: '27',
  },
];

let state = { events: null, lists: null };
const listeners = new Set();

const emit = () => listeners.forEach(listener => listener());

const subscribe = listener => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const snapshot = () => state;

const useOwnerState = () => useSyncExternalStore(subscribe, snapshot, snapshot);

export const useOwnerEvents = () => {
  const created = useCreatedBusiness();
  const stored = useOwnerState();
  if (stored.events) {
    return stored.events;
  }
  return created ? [] : SAMPLE_EVENTS;
};

export const useOwnerLists = () => {
  const created = useCreatedBusiness();
  const stored = useOwnerState();
  if (stored.lists) {
    return stored.lists;
  }
  return created ? [] : SAMPLE_LISTS;
};

export const saveOwnerEvents = events => {
  state = { ...state, events };
  emit();
};

export const saveOwnerLists = lists => {
  state = { ...state, lists };
  emit();
};
