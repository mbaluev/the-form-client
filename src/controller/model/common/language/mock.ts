/* eslint-disable sonarjs/no-duplicate-string */
import { ILanguageItem } from '@model/common/language/index';

const LANGUAGE_EUROPE_1: ILanguageItem = {
  title: 'Europe',
  items: [
    {
      title: 'България',
      code: 'BG',
      languages: [
        {
          title: 'Български',
          code: 'bg',
        },
      ],
    },
    {
      title: 'Česko',
      code: 'CZ',
      languages: [
        {
          title: 'Čeština',
          code: 'cs',
        },
      ],
    },
    {
      title: 'Deutschland',
      code: 'DE',
      languages: [
        {
          title: 'Deutsch',
          code: 'de',
        },
      ],
    },
    {
      title: 'Ελλάδα',
      code: 'GR',
      languages: [
        {
          title: 'Ελληνικά',
          code: 'el',
        },
      ],
    },
  ],
};
const LANGUAGE_EUROPE_2: ILanguageItem = {
  title: '\u00A0',
  items: [
    {
      title: 'España',
      code: 'ES',
      languages: [
        {
          title: 'Española',
          code: 'es',
        },
      ],
    },
    {
      title: 'France',
      code: 'FR',
      languages: [
        {
          title: 'Français',
          code: 'fr',
        },
      ],
    },
    {
      title: 'Italia',
      code: 'IT',
      languages: [
        {
          title: 'Italiano',
          code: 'it',
        },
        {
          title: 'Deutsch',
          code: 'de',
        },
      ],
    },
    {
      title: 'Poland',
      code: 'PL',
      languages: [
        {
          title: 'Polski',
          code: 'pl',
        },
      ],
    },
  ],
};
const LANGUAGE_EUROPE_3: ILanguageItem = {
  title: '\u00A0',
  items: [
    {
      title: 'Portugal',
      code: 'PT',
      languages: [
        {
          title: 'Português',
          code: 'pt',
        },
      ],
    },
    {
      title: 'România',
      code: 'RO',
      languages: [
        {
          title: 'Română',
          code: 'ro',
        },
      ],
    },
    {
      title: 'Sverige',
      code: 'SE',
      languages: [
        {
          title: 'Svenska',
          code: 'sv',
        },
      ],
    },
    {
      title: 'Other Europe',
      code: 'EU',
      languages: [
        {
          title: 'English',
          code: 'en',
        },
      ],
    },
  ],
};
const LANGUAGE_MIDDLE_EAST: ILanguageItem = {
  title: 'Middle East',
  items: [
    {
      title: 'Jordan',
      code: 'JO',
      languages: [
        {
          title: 'English',
          code: 'en',
        },
        {
          title: 'اَلْعَرَبِيَّةُ',
          code: 'ar',
        },
      ],
    },
    {
      title: 'Israel',
      code: 'IL',
      languages: [
        {
          title: 'English',
          code: 'en',
        },
        {
          title: 'עִברִית',
          code: 'he',
        },
      ],
    },
    {
      title: 'Saudi Arabia',
      code: 'SA',
      languages: [
        {
          title: 'English',
          code: 'en',
        },
        {
          title: 'اَلْعَرَبِيَّةُ',
          code: 'ar',
        },
      ],
    },
    {
      title: 'UAE',
      code: 'AE',
      languages: [
        {
          title: 'English',
          code: 'en',
        },
        {
          title: 'اَلْعَرَبِيَّةُ',
          code: 'ar',
        },
      ],
    },
  ],
};
const LANGUAGE_NORTH_AMERICA: ILanguageItem = {
  title: 'North America',
  items: [
    {
      title: 'USA',
      code: 'US',
      languages: [
        {
          title: 'English',
          code: 'en',
        },
      ],
    },
    {
      title: 'Canada',
      code: 'CA',
      languages: [
        {
          title: 'English',
          code: 'en',
        },
        {
          title: 'Français',
          code: 'fr',
        },
      ],
    },
    {
      title: 'México',
      code: 'MX',
      languages: [
        {
          title: 'Española',
          code: 'es',
        },
      ],
    },
  ],
};
const LANGUAGE_ASIA_PACIFIC: ILanguageItem = {
  title: 'Asia Pacific',
  items: [
    {
      title: 'Singapore',
      code: 'SG',
      languages: [
        {
          title: 'English',
          code: 'en',
        },
      ],
    },
    {
      title: 'Australia',
      code: 'AU',
      languages: [
        {
          title: 'English',
          code: 'en',
        },
      ],
    },
    {
      title: 'New Zealand',
      code: 'NZ',
      languages: [
        {
          title: 'English',
          code: 'en',
        },
      ],
    },
  ],
};

export const MOCK_LANGUAGES = [
  LANGUAGE_NORTH_AMERICA,
  LANGUAGE_EUROPE_1,
  LANGUAGE_EUROPE_2,
  LANGUAGE_EUROPE_3,
  LANGUAGE_MIDDLE_EAST,
  LANGUAGE_ASIA_PACIFIC,
];
