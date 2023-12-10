import '@utils/polyfill/currencies';
import iso4217 from '@utils/locale/currency/iso-4217';
import { ISelectItem } from '@components/fields/selectField/types';

const defaultCurrency = 'EUR';
const items: ISelectItem[] = iso4217.codes.map((code) => {
  const name = iso4217.map[code as keyof typeof iso4217.map];
  const symbol = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: code,
    currencyDisplay: 'narrowSymbol',
  })
    .formatToParts()
    .find((d) => d.type === 'currency')?.value;
  return {
    value: code,
    label: `${code} - ${symbol} ${name}`,
  };
});
const name = (currency?: string | null) => {
  return items.find((d) => d.value === currency)?.label;
};

const currencies = {
  default: defaultCurrency,
  unknown: 'N/A',
  items,
  name,
  getInfo: (currency: string) => {
    return iso4217.currencies.find((d) => d.code === currency);
  },
  getSymbol: (currency: string) => {
    return iso4217.symbol(currency);
  },
  getByCountry: (code: string) => {
    return iso4217.codeForCountry(code) || defaultCurrency;
  },
};

export default currencies;
