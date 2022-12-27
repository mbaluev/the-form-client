import iso4217 from '@utils/locale/currency/iso-4217';
import iso from 'iso-3166-1';

const all = iso.all().map((d) => {
  return d.alpha2;
});
const selectItems = iso.all().map((d) => {
  if (d.alpha2 === 'VA') {
    d.country = 'Holy See - Vatican';
  }
  return {
    value: d.alpha2,
    label: `${d.alpha2} - ${d.country}`,
  };
});
selectItems.sort((a, b) => {
  if (a.value > b.value) return 1;
  else if (a.value < b.value) return -1;
  else return 0;
});

const countries = {
  default: 'US',
  all,
  selectItems,
  getInfo: (code: string) => {
    return iso.whereAlpha2(code);
  },
  getByCurrency: (code: string) => {
    return iso4217.countries(code);
  },
};

export default countries;
