import { createTheme, Shadows } from '@mui/material/styles';
import { darken, lighten } from '@mui/material';
import { Open_Sans } from 'next/font/google';
import {} from '@mui/lab/themeAugmentation';

declare module '@mui/material/styles' {
  interface PaletteColorCustom {
    100: string;
    70: string;
    40: string;
    20: string;
    10: string;
  }
  interface PaletteColorGrey {
    300: string;
    290: string;
    280: string;
    270: string;
    260: string;
    250: string;
    240: string;
    230: string;
    220: string;
    210: string;
    200: string;
    190: string;
    180: string;
    170: string;
    160: string;
    150: string;
    140: string;
    130: string;
    120: string;
    110: string;
    100: string;
    90: string;
    80: string;
    70: string;
    60: string;
    50: string;
    40: string;
    30: string;
    20: string;
    10: string;
  }
  interface Palette {
    greyDark: Palette['primary'];
    greyLight: Palette['primary'];
    accent: Palette['primary'];
    t1Primary: PaletteColorCustom;
    t1Secondary: PaletteColorCustom;
    t1Accent: PaletteColorCustom;
    t1Success: PaletteColorCustom;
    t1Warning: PaletteColorCustom;
    t1Error: PaletteColorCustom;
    t1Info: PaletteColorCustom;
    t1Grey: PaletteColorGrey;
  }
  interface PaletteOptions {
    greyDark: Palette['primary'];
    greyLight: Palette['primary'];
    accent: Palette['primary'];
    t1Primary: PaletteColorCustom;
    t1Secondary: PaletteColorCustom;
    t1Accent: PaletteColorCustom;
    t1Success: PaletteColorCustom;
    t1Warning: PaletteColorCustom;
    t1Error: PaletteColorCustom;
    t1Info: PaletteColorCustom;
    t1Grey: PaletteColorGrey;
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true;
    greyDark: true;
    greyLight: true;
  }
}
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    accent: true;
    greyDark: true;
    greyLight: true;
  }
}

const font = Open_Sans({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
});

const colors = {
  common: { white: '#ffffff', black: '#111419' },
  primary: { main: '#3A398C', contrastText: '#FFFFFF' },
  secondary: { main: '#308280', contrastText: '#FFFFFF' },
  accent: {
    main: '#5C5AFF',
    light: lighten('#5C5AFF', 0.2),
    dark: darken('#5C5AFF', 0.2),
    contrastText: '#FFFFFF',
  },
  greyDark: {
    main: '#616469',
    light: lighten('#616469', 0.2),
    dark: darken('#616469', 0.2),
    contrastText: '#FFFFFF',
  },
  greyLight: {
    main: '#a1a4a9',
    light: lighten('#a1a4a9', 0.2),
    dark: darken('#a1a4a9', 0.2),
    contrastText: '#FFFFFF',
  },
  success: { main: '#0B8148', contrastText: '#FFFFFF' },
  warning: { main: '#C86A00', contrastText: '#FFFFFF' },
  error: { main: '#D71105', contrastText: '#FFFFFF' },
  info: { main: '#2970DF', contrastText: '#FFFFFF' },
  t1Primary: {
    '100': '#3A398C',
    '70': '#7574AF',
    '40': '#B0B0D1',
    '20': '#D8D7E8',
    '10': '#EBEBF3',
  },
  t1Secondary: {
    '100': '#308280',
    '70': '#6EA7A6',
    '40': '#ACCDCC',
    '20': '#D6E6E6',
    '10': '#EAF3F2',
  },
  t1Accent: {
    '100': '#5C5AFF',
    '70': '#8D8BFF',
    '40': '#BEBDFF',
    '20': '#DEDEFF',
    '10': '#EFEFFF',
  },
  t1Success: {
    '100': '#0B8148',
    '70': '#54A77F',
    '40': '#ACE2C8',
    '20': '#D6F0E3',
    '10': '#EAF8F1',
  },
  t1Warning: {
    '100': '#C86A00',
    '70': '#9B84E8',
    '40': '#E9C399',
    '20': '#FFEBD5',
    '10': '#FFF5EA',
  },
  t1Error: {
    '100': '#D71105',
    '70': '#FF695F',
    '40': '#FFA9A4',
    '20': '#FFD4D1',
    '10': '#FFE9E8',
  },
  t1Info: {
    '100': '#2970DF',
    '70': '#72A0E7',
    '40': '#AFC9F1',
    '20': '#D7E4F8',
    '10': '#EBF1FB',
  },
  t1Grey: {
    '300': '#111419',
    '290': '#191c21',
    '280': '#212429',
    '270': '#292c31',
    '260': '#313439',
    '250': '#393c41',
    '240': '#414449',
    '230': '#494c51',
    '220': '#515459',
    '210': '#595c61',
    '200': '#616469',
    '190': '#696c71',
    '180': '#717479',
    '170': '#797c81',
    '160': '#818489',
    '150': '#898c91',
    '140': '#919499',
    '130': '#999ca1',
    '120': '#a1a4a9',
    '110': '#a9acb1',
    '100': '#b1b4b9',
    '90': '#b9bcc1',
    '80': '#c1c4c9',
    '70': '#c9ccd1',
    '60': '#d1d4d9',
    '50': '#d9dce1',
    '40': '#e1e4e9',
    '30': '#e9ecf1',
    '20': '#f1f4f9',
    '10': '#f9faff',
  },
};

export const theme = createTheme({
  spacing: 5,
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: font.style.fontFamily,
  },
  palette: {
    divider: colors.t1Grey['30'],
    common: colors.common,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    greyDark: colors.greyDark,
    greyLight: colors.greyLight,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    t1Primary: colors.t1Primary,
    t1Secondary: colors.t1Secondary,
    t1Accent: colors.t1Accent,
    t1Success: colors.t1Success,
    t1Warning: colors.t1Warning,
    t1Error: colors.t1Error,
    t1Info: colors.t1Info,
    t1Grey: colors.t1Grey,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          fontWeight: '600',
          textTransform: 'unset',
          boxShadow: 'none !important',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          minWidth: 'unset',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: 20,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 20,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: 20,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { color: colors.common.black, fontSize: '1rem' },
        action: { paddingTop: 2, paddingBottom: 2 },
        message: {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
        standardSuccess: { backgroundColor: colors.t1Success['10'] },
        standardError: { backgroundColor: colors.t1Error['10'] },
        standardWarning: { backgroundColor: colors.t1Warning['10'] },
        standardInfo: { backgroundColor: colors.t1Info['10'] },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.t1Grey['40'],
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.t1Grey['270'],
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
        bar: {
          borderRadius: 2,
        },
        colorPrimary: {
          backgroundColor: colors.t1Grey['50'],
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 40,
          position: 'relative',
          zIndex: 1,
        },
        indicator: {
          height: 2,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginRight: 20,
          minWidth: 'auto',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          minHeight: 40,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: colors.common.black,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: 0,
          marginTop: 5,
          fontSize: '0.9rem',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: colors.t1Grey[20],
            '& fieldset.MuiOutlinedInput-notchedOutline': {
              borderColor: colors.t1Grey[50],
            },
          },
          '&.Mui-error': {
            '& fieldset.MuiOutlinedInput-notchedOutline': {
              borderColor: colors.error.main,
            },
          },
        },
      },
    },
  },
  shadows: [
    ...createTheme({}).shadows.map((shadow, i) => {
      if (i === 3) return '0px 3px 12px 0px rgba(0,0,0,0.12)';
      return shadow;
    }),
  ] as Shadows,
});
