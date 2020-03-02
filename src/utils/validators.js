import {
  USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from '../constants';

export const validate = value => {
  return {
    username: _ => charactersLimit(value, USERNAME_MAX_LENGTH),
    email: _ => charactersLimit(value, EMAIL_MAX_LENGTH),
    password: _ => charactersLimit(value, PASSWORD_MAX_LENGTH),
  };
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
