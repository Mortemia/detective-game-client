const errorTravel = {
  visible: true,
  severity: 'error',
  message: 'Niewystarczająca liczba punktów ruchu',
};

const successExamine = {
  visible: true,
  severity: 'success',
  message: 'Przedmiot został zbadany',
};

const errorExamine = {
  visible: true,
  severity: 'error',
  message: 'Przedmiot został zbadany już wcześniej',
};

const successActionExecution = {
  visible: true,
  severity: 'success',
  message: 'Akcja została wykonana pomyślnie',
};

const errorDifferentActionLocation = {
  visible: true,
  severity: 'error',
  message: 'Musisz być w innej lokacji, aby wykonać akcję',
};

const successLogin = {
  visible: true,
  severity: 'success',
  message: 'Zalogowano pomyślnie',
};

const errorLogin = {
  visible: true,
  severity: 'error',
  message: 'Błędny login lub hasło',
};

export const snackbars = {
  errorTravel,
  successExamine,
  errorExamine,
  successActionExecution,
  errorDifferentActionLocation,
  successLogin,
  errorLogin,
};
