import iso4217 from '@utils/locale/currency/iso-4217';
import countries from '@utils/locale/country';

const all = iso4217.currencies.map((d: any) => {
  return d.code;
});

const selectItems = iso4217.currencies.map((d: any) => {
  const value = d.code;
  const symbol = d.symbol ? ` - ${d.symbol}` : ` - ${d.code}`;
  const name = d.name ? ` ${d.name}` : '';
  const label = `${value}${symbol}${name}`;
  const country = countries.getByCurrency(d.code).map((c) => {
    return countries.getInfo(c)?.country;
  });
  return {
    value,
    label,
    country,
  };
});
selectItems.sort((a, b) => {
  if (a.value > b.value) return 1;
  else if (a.value < b.value) return -1;
  else return 0;
});

export const NACurrency = 'N/A';
export const defaultCurrency = 'USD';

const currencies = {
  default: defaultCurrency,
  all,
  selectItems,
  getInfo: (currency: string) => {
    return iso4217.currencies.find((d) => d.code === currency);
  },
  getByCountry: (code: string) => {
    return iso4217.codeForCountry(code) || defaultCurrency;
  },
  getByName: (name: string) => {
    return iso4217.currencies.find((d) => d.name === name)?.code;
  },
};

export default currencies;
