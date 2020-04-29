import {
  USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from '../constants';

export const validate = value => {
  return {
    username: _ => charactersLimit(value, USERNAME_MAX_LENGTH),
    name: _ => charactersLimit(value, 3),

    email: _ => charactersLimit(value, EMAIL_MAX_LENGTH),
    password: _ => charactersLimit(value, PASSWORD_MAX_LENGTH),
  };
};

export const validateOnBlur = value => {
  return {
    name: _ => charactersMinimum(value, 5),
    username: _ => charactersMinimum(value, 5),
    password: _ => charactersMinimum(value, PASSWORD_MIN_LENGTH),
  };
};

const charactersLimit = (input, maxCharacters) => {
  if (input.length > maxCharacters) {
    return {
      validateStatus: 'error',
      continueInput: false,
      errorMsg: `Maksymalna liczba znaków to ${maxCharacters}`,
    };
  } else {
    return {
      validateStatus: 'correct',
    };
  }
};

const charactersMinimum = (input, minCharacters) => {
  if (input.length === 0)
    return {
      validateStatus: 'error',
      errorMsg: `Pole nie może być puste`,
    };
  if (input.length < minCharacters) {
    return {
      validateStatus: 'error',
      errorMsg: `Minimalna liczba znaków to ${minCharacters}`,
    };
  } else {
    return {
      validateStatus: 'correct',
    };
  }
};
