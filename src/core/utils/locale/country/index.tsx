const native = (code: string, lang: string) => {
  const regionNames = new Intl.DisplayNames([lang], { type: 'region' });
  return regionNames.of(code);
};

const countries = {
  default: 'EU',
  native,
};

export default countries;
