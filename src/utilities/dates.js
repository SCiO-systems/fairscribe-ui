export const getDateFromFormat = (value) => {
  if (!value) {
    return new Date();
  }
  if (value instanceof Date) {
    return value;
  }
  return new Date(value);
};

export const convertDateToFormat = (date) => {
  if (!date) {
    return new Date();
  }
  const d = new Date(date);
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().split('T')[0];
};
