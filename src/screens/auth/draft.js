const empty = () => ({
  email: '',
  password: '',
  city: null,
  emotions: [],
  name: '',
  username: '',
  birthday: '',
  gender: '',
});

let draft = empty();

const setRegistration = patch => {
  draft = { ...draft, ...patch };
};

const getRegistration = () => draft;

export { setRegistration, getRegistration };
