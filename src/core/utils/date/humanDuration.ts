// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const humanDuration = (str: string, lang: string) => {
  switch (str) {
    case 'P1Y':
      return '1 year';
    case 'P3Y':
      return '3 years';
    case 'P1M':
      return '1 month';
    default:
      return str;
  }
};
