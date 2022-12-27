const digitAll = [
  'latn',
  'arab',
  'arabext',
  'bali',
  'beng',
  'deva',
  'gujr',
  'guru',
  'hanidec',
  'khmr',
  'knda',
  'laoo',
  'limb',
  'mlym',
  'mong',
  'mymr',
  'orya',
  'tamldec',
  'telu',
  'thai',
  'tibt',
];

const digits = {
  default: 'latn',
  all: digitAll,
  selectItems: (locale: string) => {
    return digitAll.map((value: any) => {
      const options = {
        numberingSystem: value,
        useGrouping: false,
      } as Intl.NumberFormatOptions;
      const label = new Intl.NumberFormat(locale, options).format(1234567890);
      return {
        value,
        label,
      };
    });
  },
  getByLocale: (locale: string) => {
    return new Intl.NumberFormat(locale).resolvedOptions().numberingSystem;
  },
};

export default digits;
