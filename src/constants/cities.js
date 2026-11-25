import { toPhrase } from '../locales/catalog';

export const CITY_NAMES = [
  'Երևան',
  'Գյումրի',
  'Վանաձոր',
  'Գորիս',
  'Կապան',
  'Արմավիր',
  'Հրազդան',
  'Արարատ',
  'Արտաշատ',
];

const cityIndex = value => {
  const raw = typeof value === 'string' ? value : value?.name || value?.title || value?.label || '';
  return CITY_NAMES.indexOf(toPhrase(raw));
};

export const pickCities = list => {
  const chosen = new Array(CITY_NAMES.length);
  (list || []).forEach(item => {
    const index = cityIndex(item);
    if (index >= 0 && chosen[index] == null) chosen[index] = item;
  });
  return chosen.filter(Boolean);
};
