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

const successLogout = {
  visible: true,
  severity: 'success',
  message: 'Wylogowano',
};

const successSignUp = {
  visible: true,
  severity: 'success',
  message: 'Zarejestrowano i zalogowano pomyślnie',
};

const errorSignUpUserAlreadyExists = {
  visible: true,
  severity: 'error',
  message: 'Błąd w rejestracji, użytkownik o podanej nazwie już istnieje',
};

const errorSignUpFieldsFilledCorrectly = {
  visible: true,
  severity: 'error',
  message:
    'Błąd w rejestracji, upewnij się, że wypełniłeś poprawnie wszystkie pola',
};

const errorNewDay = {
  visible: true,
  severity: 'error',
  message:
    'Nie możesz rozpocząć nowego dnia, sprawa musi być rozwiązana już dzisiaj',
};

export const snackbars = {
  errorTravel,
  successExamine,
  errorExamine,
  successActionExecution,
  errorDifferentActionLocation,
  successLogin,
  errorLogin,
  successLogout,
  successSignUp,
  errorSignUpUserAlreadyExists,
  errorSignUpFieldsFilledCorrectly,
  errorNewDay,
};
