const _patterns = {
  LOGIN_PATTERN: /^(?=.*\d?)(?=.*[-_A-Za-z]).{3,20}$/,
  // eslint-disable-next-line no-useless-escape
  EMAIL_PATTERN: /^[-_\.a-z0-9]+@([-_a-z0-9]+\.)+[a-z]+$/,
  FIRST_NAME_PATTERN: /(^[A-Z][-a-z]{1,20}$)|(^[А-ЯЁ][-а-яё]{1,20}$)/,
  SECOND_NAME_PATTERN: /(^[A-Z][-a-z]{1,20}$)|(^[А-ЯЁ][-а-яё]{1,20}$)/,
  PHONE_PATTERN: /^\+?[\d]{10,15}$/,
  MESSAGE_PATTERN: /^.+$/,
  // eslint-disable-next-line no-useless-escape
  PASSWORD_PATTERN: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-!@#&()[{}\]:;',?\/*~$^+=<>]).{8,20}$/,
}
export default _patterns
