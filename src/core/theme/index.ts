import { createTheme, Shadows } from '@mui/material/styles';
import { JetBrains_Mono } from 'next/font/google';
import {} from '@mui/lab/themeAugmentation';

declare module '@mui/material/styles' {
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
    fGrey: PaletteColorGrey;
  }
  interface PaletteOptions {
    fGrey: PaletteColorGrey;
  }
}

const font = JetBrains_Mono({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
});

const colors = {
  common: { white: '#ffffff', black: '#111419' },
  secondary: {
    main: '#2F41CD',
    light: '6D7ADC',
    dark: '1E2A83',
    contrastText: '#FFFFFF',
  },
  primary: {
    main: '#167DFF',
    light: '5CA4FF',
    dark: '0E50A3',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#167DFF',
    light: '5CA4FF',
    dark: '0E50A3',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#00C075',
    light: '4DD39E',
    dark: '007B4B',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FD9B2C',
    light: 'FEB96B',
    dark: 'A2631C',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#EC3D7D',
    light: 'F277A4',
    dark: '972750',
    contrastText: '#FFFFFF',
  },
  fGrey: {
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
    divider: colors.fGrey['30'],
    common: colors.common,
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    fGrey: colors.fGrey,
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
        standardSuccess: { backgroundColor: colors.success.light },
        standardError: { backgroundColor: colors.error.light },
        standardWarning: { backgroundColor: colors.warning.light },
        standardInfo: { backgroundColor: colors.info.light },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.fGrey['40'],
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.fGrey['270'],
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
          backgroundColor: colors.fGrey['50'],
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
            backgroundColor: colors.fGrey[20],
            '& fieldset.MuiOutlinedInput-notchedOutline': {
              borderColor: colors.fGrey[50],
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
