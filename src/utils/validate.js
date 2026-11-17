const MIN_PASSWORD = 6;
const MIN_AGE = 13;
const MAX_AGE = 120;
const NAME_PATTERN = /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u;

const emailError = value => {
  const email = String(value || '').trim();
  if (!email) return 'Մուտքագրեք էլ. հասցեն';
  const parts = email.match(/^([^@\s]+)@([^@\s]+)$/);
  if (!parts) return 'Մուտքագրեք վավեր էլ. հասցե';
  const [, local, domain] = parts;
  if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) {
    return 'Մուտքագրեք վավեր էլ. հասցե';
  }
  const labels = domain.split('.');
  const tld = labels[labels.length - 1];
  const labelOk = label => /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/.test(label);
  if (labels.length < 2 || !/^[A-Za-z]{2,}$/.test(tld) || labels.some(label => !labelOk(label))) {
    return 'Մուտքագրեք վավեր էլ. հասցե';
  }
  return '';
};

const passwordError = value => {
  const password = String(value || '');
  if (!password.trim()) return 'Մուտքագրեք գաղտնաբառը';
  if (password.length < MIN_PASSWORD) return 'Գաղտնաբառը պետք է լինի առնվազն 6 նիշ';
  return '';
};

const passwordConfirmError = (password, confirm) => {
  if (!String(confirm || '')) return 'Կրկնեք գաղտնաբառը';
  if (password !== confirm) return 'Գաղտնաբառերը չեն համընկնում';
  return '';
};

const personNameError = (value, kind) => {
  const name = String(value || '').trim().replace(/\s+/g, ' ');
  const empty = {
    first: 'Մուտքագրեք անունը',
    last: 'Մուտքագրեք ազգանունը',
    name: 'Մուտքագրեք ձեր անունը',
  };
  const short = {
    first: 'Անունը պետք է լինի առնվազն 2 տառ',
    last: 'Ազգանունը պետք է լինի առնվազն 2 տառ',
    name: 'Անունը պետք է պարունակի առնվազն 2 տառ',
  };
  const letters = {
    first: 'Անունը կարող է պարունակել միայն տառեր',
    last: 'Ազգանունը կարող է պարունակել միայն տառեր',
    name: 'Անունը կարող է պարունակել միայն տառեր և բացատ',
  };
  const long = {
    first: 'Անունը չափազանց երկար է',
    last: 'Ազգանունը չափազանց երկար է',
    name: 'Անունը չափազանց երկար է',
  };
  if (!name) return empty[kind] || empty.name;
  if (name.length < 2) return short[kind] || short.name;
  if (name.length > 40) return long[kind] || long.name;
  if (!NAME_PATTERN.test(name)) return letters[kind] || letters.name;
  return '';
};

const usernameError = value => {
  const username = String(value || '').trim().replace(/^@/, '');
  if (!username) return 'Մուտքագրեք օգտանունը';
  if (username.length < 3) return 'Օգտանունը պետք է լինի առնվազն 3 նիշ';
  if (username.length > 15) return 'Օգտանունը պետք է լինի առավելագույնը 15 նիշ';
  if (!/^[\p{L}0-9_.]+$/u.test(username)) return 'Օգտանունը կարող է պարունակել միայն տառ, թիվ, կետ կամ _';
  if (/^[_.]|[_.]$/.test(username)) return 'Օգտանունը չի կարող սկսվել կամ ավարտվել կետով կամ _';
  return '';
};

const ageOf = date => {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const month = today.getMonth() - date.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < date.getDate())) age -= 1;
  return age;
};

const birthdateError = value => {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    return 'Ընտրեք վավեր ծննդյան ամսաթիվ';
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = new Date(value.getFullYear(), value.getMonth(), value.getDate());
  if (day > today) return 'Ծննդյան ամսաթիվը չի կարող ապագայում լինել';
  const age = ageOf(day);
  if (age < MIN_AGE) return 'Դուք պետք է լինեք առնվազն 13 տարեկան';
  if (age > MAX_AGE) return 'Ծննդյան ամսաթիվը իրական չէ';
  return '';
};

const filledErrors = errors => {
  const next = Object.fromEntries(Object.entries(errors).filter(([, message]) => message));
  return Object.keys(next).length ? next : null;
};

export {
  MIN_PASSWORD,
  emailError,
  passwordError,
  passwordConfirmError,
  personNameError,
  usernameError,
  birthdateError,
  filledErrors,
};
