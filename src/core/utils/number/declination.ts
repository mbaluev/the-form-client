export const declination = (n: number, textForms: string[]) => {
  if (n === 1) {
    return textForms[0];
  }
  return textForms[1];
};
