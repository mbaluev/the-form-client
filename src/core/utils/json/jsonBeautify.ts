export const jsonBeautify = (str?: object, space?: number) => {
  return JSON.stringify(str, null, space);
};
