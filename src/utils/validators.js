import {
  USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from '../constants';

export const validate = {
  username: value => {
    return charactersLimit(value, USERNAME_MAX_LENGTH);
  },
  email: value => {
    return charactersLimit(value, EMAIL_MAX_LENGTH);
  },
  password: value => {
    return charactersLimit(value, PASSWORD_MAX_LENGTH);
  },
};

const charactersLimit = (input, maxCharacters) => {
  if (input.length > maxCharacters) {
    return {
      validateStatus: 'error',
      errorMsg: `Maksymalna liczba znaków to ${maxCharacters}`,
    };
  } else {
    return {
      validateStatus: 'correct',
    };
  }
};
