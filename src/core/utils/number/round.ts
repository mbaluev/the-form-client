export const round = (number: number, decimalCount: number) => {
  const factorOfTen = Math.pow(10, decimalCount);
  return Math.round(number * factorOfTen) / factorOfTen;
};
