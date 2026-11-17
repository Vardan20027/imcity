export const formatBirthday = value => {
  if (!value) return '';
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const dd = String(value.getDate()).padStart(2, '0');
    const mm = String(value.getMonth() + 1).padStart(2, '0');
    return `${dd}.${mm}.${value.getFullYear()}`;
  }
  const text = String(value).trim();
  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[3]}.${iso[2]}.${iso[1]}`;
  const local = text.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (local) {
    return `${local[1].padStart(2, '0')}.${local[2].padStart(2, '0')}.${local[3]}`;
  }
  return text;
};

export const parseBirthday = value => {
  const shown = formatBirthday(value);
  const match = shown.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return null;
  return new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
};

export const birthdayForApi = value => {
  const shown = formatBirthday(value);
  const match = shown.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return shown;
  return `${match[3]}-${match[2]}-${match[1]}`;
};
