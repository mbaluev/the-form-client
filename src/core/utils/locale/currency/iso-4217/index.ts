import { ISO_3166_1_ALPHA_2_TO_ISO_4217 } from '@utils/locale/currency/iso-4217/iso-3166-1-alpha-2-to-iso-4217';
import { ISO_4217_NAMES } from '@utils/locale/currency/iso-4217/iso-4127-names';

export interface ICurrency {
  code: string;
  name: string;
  symbol?: string;
}

const map = ISO_4217_NAMES;
const countryCurrencies = ISO_3166_1_ALPHA_2_TO_ISO_4217;

const codes = Object.keys(map);
const currencies: ICurrency[] = codes.map((code) => {
  const symbol = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: code,
    currencyDisplay: 'narrowSymbol',
  })
    .formatToParts()
    .find((d) => d.type === 'currency')?.value;
  return {
    code,
    name: map[code as keyof typeof map],
    symbol: symbol,
  };
});

const iso4217 = {
  codes,
  currencies,
  map,
  codeForCountry: function (countryCode: string) {
    const code = countryCode as keyof typeof countryCurrencies;
    return countryCurrencies[code];
  },
  countries: function (currency: string) {
    const countries = [];
    for (const key in countryCurrencies) {
      const code = key as keyof typeof countryCurrencies;
      if (countryCurrencies[code] === currency) {
        countries.push(key);
      }
    }
    return countries;
  },
};

export default iso4217;
