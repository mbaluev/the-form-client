export const declinationOfNumber = (n: number, text_forms: string[]) => {
  if (n === 1) {
    return text_forms[0];
  }
  return text_forms[1];
};
