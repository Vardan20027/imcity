export const CITIES = ['Երևան', 'Կապան', 'Գորիս', 'Գյումրի', 'Արարատ'];

export const HOTEL_LOGO = require('../../../assets/images/services/hotel-logo.png');
export const REST_LOGO = require('../../../assets/images/services/rest-logo.png');
export const FUN_LOGO = require('../../../assets/images/services/fun-logo.png');

const place = (id, image, logo, name = 'Armenia hotel') => ({
  id,
  name,
  image,
  logo,
});

export const HOTELS = [
  place('h1', require('../../../assets/images/services/hotel-1.jpg'), HOTEL_LOGO),
  place('h2', require('../../../assets/images/services/hotel-2.jpg'), HOTEL_LOGO),
  place('h3', require('../../../assets/images/services/hotel-3.jpg'), HOTEL_LOGO),
  place('h4', require('../../../assets/images/services/hotel-4.jpg'), HOTEL_LOGO),
];

export const RESTAURANTS = [
  place('r1', require('../../../assets/images/services/rest-1.jpg'), REST_LOGO),
  place('r2', require('../../../assets/images/services/rest-2.jpg'), REST_LOGO),
  place('r3', require('../../../assets/images/services/rest-3.jpg'), REST_LOGO),
  place('r4', require('../../../assets/images/services/rest-4.jpg'), REST_LOGO),
];

export const ENTERTAINMENT = [
  place('e1', require('../../../assets/images/services/fun-1.jpg'), FUN_LOGO),
  place('e2', require('../../../assets/images/services/fun-2.jpg'), FUN_LOGO),
  place('e3', require('../../../assets/images/services/fun-3.jpg'), FUN_LOGO),
  place('e4', require('../../../assets/images/services/fun-4.jpg'), FUN_LOGO),
];

const CASCADE_COPY =
  'Կասկադը Երևանի ամենահայտնի ճարտարապետական համալիրներից է։ Այն բազմամակարդակ աստիճանավանդակային կառույց է՝ բաց պատշգամբներով, շատրվաններով և կանաչ տարածքներով։ Կասկադից բացվում է գեղեցիկ տեսարան դեպի Երևան և Արարատ լեռ։';

export const ATTRACTIONS = [
  {
    id: 'a1',
    title: 'Կասկադ',
    image: require('../../../assets/images/services/cascade.jpg'),
    description: 'Կասկադը Երևանի ամենահայտնի ճարտարապետական համալիրներից ...',
    full: CASCADE_COPY,
    location: 'Երևան, Աբովյան 14',
  },
  {
    id: 'a2',
    title: 'Կասկադ',
    image: require('../../../assets/images/services/republic.jpg'),
    description: 'Կասկադը Երևանի ամենահայտնի ճարտարապետական համալիրներից ...',
    full: CASCADE_COPY,
    location: 'Երևան, Աբովյան 14',
  },
];

const AVATAR = require('../../../assets/images/services/mem-avatar.png');

export const MEMORIES = [
  { id: 'm1', image: require('../../../assets/images/services/mem-1.jpg'), avatar: AVATAR, name: 'Աննա Գևորգ...' },
  { id: 'm2', image: require('../../../assets/images/services/mem-2.png'), avatar: AVATAR, name: 'Աննա Գևորգ...' },
  { id: 'm3', image: require('../../../assets/images/services/mem-3.png'), avatar: AVATAR, name: 'Աննա Գևորգ...' },
  { id: 'm4', image: require('../../../assets/images/services/mem-4.jpg'), avatar: AVATAR, name: 'Աննա Գևորգ...' },
  { id: 'm5', image: require('../../../assets/images/services/mem-5.png'), avatar: AVATAR, name: 'Աննա Գևորգ...' },
  { id: 'm6', image: require('../../../assets/images/services/mem-6.jpg'), avatar: AVATAR, name: 'Աննա Գևորգ...' },
  { id: 'm7', image: require('../../../assets/images/services/mem-7.jpg'), avatar: AVATAR, name: 'Աննա Գևորգ...' },
  { id: 'm8', image: require('../../../assets/images/services/mem-8.jpg'), avatar: AVATAR, name: 'Աննա Գևորգ...' },
  { id: 'm9', image: require('../../../assets/images/services/mem-9.jpg'), avatar: AVATAR, name: 'Աննա Գևորգ...' },
];

export const SHOPS = [
  { id: 'super', icon: 'shop_super', title: 'Սուպերմարկետներ' },
  { id: 'grocery', icon: 'shop_grocery', title: 'Մթերք' },
  { id: 'coffee', icon: 'shop_coffee', title: 'Սուրճ' },
  { id: 'beer', icon: 'shop_beer', title: 'Գարեջուր' },
  { id: 'candy', icon: 'shop_generic', title: 'Քաղցրավենիք' },
  { id: 'clothes', icon: 'shop_generic', title: 'Խանութներ' },
  { id: 'home', icon: 'shop_home', title: 'Կենցաղային պարագաներ' },
  { id: 'furniture', icon: 'shop_generic', title: 'Կահույք' },
  { id: 'power', icon: 'shop_power', title: 'Էլեկտրոնիկա' },
  { id: 'cosmetic', icon: 'shop_cosmetic', title: 'Կոսմետիկա և օծանելիք' },
  { id: 'kids', icon: 'shop_generic', title: 'Մանկական ապրանքներ' },
  { id: 'jewelry', icon: 'shop_jewelry', title: 'Զարդեր և աքսեսուարներ' },
  { id: 'flower', icon: 'shop_flower', title: 'Ծաղիկներ' },
  { id: 'build', icon: 'shop_generic', title: 'Շինանյութ' },
  { id: 'auto', icon: 'shop_auto', title: 'Ավտոպահեստամասեր' },
  { id: 'book', icon: 'shop_book', title: 'Գրախանութ' },
  { id: 'pet', icon: 'shop_pet', title: 'Կենդանիների համար' },
];

export const SERVICE_CATEGORIES = [
  { id: 'hair', icon: 'svc_hair', title: 'Վարսավիրանոց' },
  { id: 'beauty', icon: 'svc_beauty', title: 'Գեղեցկության սրահ' },
  { id: 'sport', icon: 'svc_generic', title: 'Սպորտ և ֆիտնես' },
  { id: 'course', icon: 'svc_course', title: 'Դասընթացներ' },
  { id: 'repair', icon: 'svc_generic', title: 'Վերանորոգում' },
  { id: 'smm', icon: 'svc_generic', title: 'SMM / դիզայն / մարքեթինգ' },
  { id: 'it', icon: 'svc_generic', title: 'IT(ՏՏ) ծառայություններ' },
  { id: 'print', icon: 'svc_print', title: 'Տպագրություն' },
  { id: 'build', icon: 'svc_generic', title: 'Շինարարություն' },
  { id: 'events', icon: 'svc_generic', title: 'Միջոցառումների կազմակերպում' },
  { id: 'clean', icon: 'svc_clean', title: 'Մաքրման ծառայություններ' },
  { id: 'security', icon: 'svc_security', title: 'Անվտանգություն' },
];

export const GRID_BY_KEY = {
  hotels: HOTELS,
  restaurants: RESTAURANTS,
  cafes: RESTAURANTS,
  entertainment: ENTERTAINMENT,
  tourism: HOTELS,
  rest: ENTERTAINMENT,
  transport: HOTELS,
  charging: HOTELS,
  production: HOTELS,
  medicine: HOTELS,
};
