import { deviceInfo } from '../deviceInfo';
import { normalize } from '../deviceInfo/normalize';

export const COLORS = {
  white: '#ffffff',
  black: {
    50: '#000000',
    100: '#2C2C2C',
    200: '#818195',
  },
  green: {
    50: '#eff8ea',
    100: '#cdeabf',
    200: '#b4df9f',
    300: '#92d174',
    400: '#7dc859',
    500: '#5BC852',
    600: '#12B900',
    700: '#428421',
    800: '#33661a',
    900: '#274e14',
  },
  grey: {
    50: '#e9e9e9',
    100: '#bcbcbc',
    200: '#9b9b9b',
    300: '#6e6e6e',
    400: '#515151',
    500: '#262626',
    600: '#232323',
    700: '#1b1b1b',
    800: '#151515',
    900: '#101010',
    1000: '#F3F3F3',
    1100: '#E3E3E3',
    1200: '#818195',
  },
  oxford_blue: {
    25: '#F9FAFB',
    30: '#F5F5F5',
    50: '#e7e9ec',
    100: '#b3bbc4',
    200: '#8e9ba7',
    300: '#5b6d7f',
    400: '#3b5166',
    500: '#0a2540',
    600: '#09223a',
    700: '#071a2d',
    800: '#061423',
    900: '#04101b',
  },
  blue: {
    50: '#edf5fb',
    100: '#c8def3',
    200: '#aecfee',
    300: '#89b9e6',
    400: '#72abe1',
    500: '#4f96d9',
    600: '#4889c5',
    700: '#386b9a',
    800: '#2b5377',
    900: '#213f5b',
  },
  orange: {
    50: '#fff5eb',
    100: '#fee0c2',
    200: '#fed1a4',
    300: '#fdbb7b',
    400: '#fdae61',
    500: '#e06536',
    600: '#e58c35',
    700: '#b36d29',
    800: '#8b5520',
    900: '#6a4118',
  },
  purple: {
    200: '#E0DFFD',
    400: '#7766C6',
    500: '#613d98',
    700: '#7566a8',
  },
  yellow: {
    200: '#FFCE41',
    500: '#FFC212',
  },
  red: {
    50: '#ffeced',
    100: '#fec5c6',
    200: '#fea9aa',
    300: '#fd8284',
    400: '#fd696c',
    500: '#fc4447',
    600: '#e53e41',
    700: '#e53e41',
    800: '#8b2527',
    900: '#6a1d1e',
  },
  overlay: '#00000099', // play / volume / badge circles
  glass: '#FFFFFF66', // date + countdown pills over media
  mediaPlaceholder: '#3C3C3C',
  tabInactive: '#616161',
  orangeBg: '#FF870026',
  pink: '#F4466E',
  pinkBg: '#F4466E26',
  purpleBg: '#DA61FF26',
  gold: '#FFC201',
  primary: '#FF8700',
  primaryLight: '#EFF6FF',
  primaryGray: '#979797',
  accent: '#F59E0B',
  accentLight: '#FFBD7333',
  accentBorder: '#FF931A',
  background: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#D0D0D0',
  buttonDisabled: '#DADADA',
  buttonDisabledText: '#9CA3AF',
  primary_green: '#dbe050',
  secondary_purple: '#ff00ff',
  secondary_green: '#b8d153',
  secondary_orange: '#e06536',
  secondary_light_green: '#28aaaf',
  primary_green_024: 'rgba(93, 186, 47, 0.5)',
  shadow: '#00000007',
  black_tint: '#262626',
  black_tint_5: '#555555',
  black_tint_84: '#848484',
  black_tint_c1: '#C1C1C1',
  blue_tint: '#0A2540',
  blue_tint_d1: '#D1DFEC',
  blue_tint_ec: '#ECF3FB',
  blue_tint_f6: '#F6F9FC',
  gray: '#D9D9D9',
  lilac: '#A347FF',
};

export const Fonts = {
  arm: {
    black: 'Montserratarm2-Black',
    bold: 'Montserratarm2-Bold',
    medium: 'Montserratarm2-Medium',
    regular: 'Montserratarm2-Regular',
    semi_bold: 'Montserratarm2-SemiBold',
  },
};

export const styles = {
  flex_1: {
    flex: 1,
  },
  flex_align_center: {
    flex: 1,
    alignItems: 'center',
  },
  flex_justify_center: {
    flex: 1,
    justifyContent: 'center',
  },
  flex_center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mh16: {
    marginHorizontal: normalize(16),
  },
  ph16: {
    paddingHorizontal: normalize(16),
  },
};

export const FontStyle = {
  display_h1: {
    regular: {
      fontFamily: Fonts.arm.regular,
      fontWeight: '400',
      fontSize: normalize(72),
      lineHeight: deviceInfo?.ios ? 0 : 90,
      letterSpacing: -2,
    },
    medium: {
      fontFamily: Fonts.arm.medium,
      fontWeight: '500',
      fontSize: normalize(72),
      lineHeight: deviceInfo?.ios ? 0 : 90,
      letterSpacing: -2,
    },
    semi_bold: {
      fontFamily: Fonts.arm.semi_bold,
      fontWeight: '600',
      fontSize: normalize(72),
      lineHeight: deviceInfo?.ios ? 0 : 90,
      letterSpacing: -2,
    },
    bold: {
      fontFamily: Fonts.arm.bold,
      fontWeight: '700',
      fontSize: normalize(72),
      lineHeight: deviceInfo?.ios ? 0 : 90,
      letterSpacing: -2,
    },
  },
  display_h2: {
    regular: {
      fontFamily: Fonts.arm.regular,
      fontWeight: '400',
      fontSize: normalize(60),
      lineHeight: deviceInfo?.ios ? 0 : 72,
      letterSpacing: -2,
    },
    medium: {
      fontFamily: Fonts.arm.medium,
      fontWeight: '500',
      fontSize: normalize(60),
      lineHeight: deviceInfo?.ios ? 0 : 72,
      letterSpacing: -2,
    },
    semi_bold: {
      fontFamily: Fonts.arm.semi_bold,
      fontWeight: '600',
      fontSize: normalize(60),
      lineHeight: deviceInfo?.ios ? 0 : 72,
      letterSpacing: -2,
    },
    bold: {
      fontFamily: Fonts.arm.bold,
      fontWeight: '700',
      fontSize: normalize(60),
      lineHeight: deviceInfo?.ios ? 0 : 72,
      letterSpacing: -2,
    },
  },
  display_h3: {
    regular: {
      fontFamily: Fonts.arm.regular,
      fontWeight: '400',
      fontSize: normalize(48),
      lineHeight: deviceInfo?.ios ? 0 : 60,
      letterSpacing: -2,
    },
    medium: {
      fontFamily: Fonts.arm.medium,
      fontWeight: '500',
      fontSize: normalize(48),
      lineHeight: deviceInfo?.ios ? 0 : 60,
      letterSpacing: -2,
    },
    semi_bold: {
      fontFamily: Fonts.arm.semi_bold,
      fontWeight: '600',
      fontSize: normalize(48),
      lineHeight: deviceInfo?.ios ? 0 : 60,
      letterSpacing: -2,
    },
    bold: {
      fontFamily: Fonts.arm.bold,
      fontWeight: '700',
      fontSize: normalize(48),
      lineHeight: deviceInfo?.ios ? 0 : 60,
      letterSpacing: -2,
    },
  },
  display_h4: {
    regular: {
      fontFamily: Fonts.arm.regular,
      fontWeight: '400',
      fontSize: normalize(36),
      lineHeight: deviceInfo?.ios ? 0 : 44,
    },
    medium: {
      fontFamily: Fonts.arm.medium,
      fontWeight: '500',
      fontSize: normalize(36),
      lineHeight: deviceInfo?.ios ? 0 : 44,
    },
    semi_bold: {
      fontFamily: Fonts.arm.semi_bold,
      fontWeight: '600',
      fontSize: normalize(36),
      lineHeight: deviceInfo?.ios ? 0 : 44,
    },
    bold: {
      fontFamily: Fonts.arm.bold,
      fontWeight: '700',
      fontSize: normalize(36),
      lineHeight: deviceInfo?.ios ? 0 : 44,
    },
  },
  display_h5: {
    regular: {
      fontFamily: Fonts.arm.regular,
      fontWeight: '400',
      fontSize: normalize(30),
      lineHeight: deviceInfo?.ios ? 0 : 38,
    },
    medium: {
      fontFamily: Fonts.arm.medium,
      fontWeight: '500',
      fontSize: normalize(30),
      lineHeight: deviceInfo?.ios ? 0 : 38,
    },
    semi_bold: {
      fontFamily: Fonts.arm.semi_bold,
      fontWeight: '600',
      fontSize: normalize(30),
      lineHeight: deviceInfo?.ios ? 0 : 38,
    },
    bold: {
      fontFamily: Fonts.arm.bold,
      fontWeight: '700',
      fontSize: normalize(30),
      lineHeight: deviceInfo?.ios ? 0 : 38,
    },
  },
  display_h6: {
    regular: {
      fontFamily: Fonts.arm.regular,
      fontWeight: '400',
      fontSize: normalize(24),
      lineHeight: deviceInfo?.ios ? 0 : 32,
    },
    medium: {
      fontFamily: Fonts.arm.medium,
      fontWeight: '500',
      fontSize: normalize(24),
      lineHeight: deviceInfo?.ios ? 0 : 32,
    },
    semi_bold: {
      fontFamily: Fonts.arm.semi_bold,
      fontWeight: '600',
      fontSize: normalize(24),
      lineHeight: deviceInfo?.ios ? 0 : 32,
    },
    bold: {
      fontFamily: Fonts.arm.bold,
      fontWeight: '700',
      fontSize: normalize(24),
      lineHeight: deviceInfo?.ios ? 0 : 32,
    },
  },
  text_h2: {
    regular: {
      fontFamily: Fonts.arm.regular,
      fontWeight: '400',
      fontSize: normalize(20),
      lineHeight: deviceInfo?.ios ? 0 : 30,
    },
    medium: {
      fontFamily: Fonts.arm.medium,
      fontWeight: '500',
      fontSize: normalize(20),
      lineHeight: deviceInfo?.ios ? 0 : 30,
    },
    semi_bold: {
      fontFamily: Fonts.arm.semi_bold,
      fontWeight: '600',
      fontSize: normalize(20),
      lineHeight: deviceInfo?.ios ? 0 : 30,
    },
    bold: {
      fontFamily: Fonts.arm.bold,
      fontWeight: '700',
      fontSize: normalize(20),
      lineHeight: deviceInfo?.ios ? 0 : 30,
    },
  },
  text_h3: {
    regular: {
      fontFamily: Fonts.arm.regular,
      fontWeight: '400',
      fontSize: normalize(18),
      lineHeight: deviceInfo?.ios ? 0 : 28,
    },
    medium: {
      fontFamily: Fonts.arm.medium,
      fontWeight: '500',
      fontSize: normalize(18),
      lineHeight: deviceInfo?.ios ? 0 : 28,
    },
    semi_bold: {
      fontFamily: Fonts.arm.semi_bold,
      fontWeight: '600',
      fontSize: normalize(18),
      lineHeight: deviceInfo?.ios ? 0 : 28,
    },
    bold: {
      fontFamily: Fonts.arm.bold,
      fontWeight: '700',
      fontSize: normalize(18),
      lineHeight: deviceInfo?.ios ? 0 : 28,
    },
  },
  text_h4: {
    regular: {
      fontFamily: Fonts.arm.regular,
      fontWeight: '400',
      fontSize: normalize(16),
      lineHeight: deviceInfo?.ios ? 0 : 24,
    },
    medium: {
      fontFamily: Fonts.arm.medium,
      fontWeight: '500',
      fontSize: normalize(16),
      lineHeight: deviceInfo?.ios ? 0 : 24,
    },
    semi_bold: {
      fontFamily: Fonts.arm.semi_bold,
      fontWeight: '600',
      fontSize: normalize(16),
      lineHeight: deviceInfo?.ios ? 0 : 24,
    },
    bold: {
      fontFamily: Fonts.arm.bold,
      fontWeight: '700',
      fontSize: normalize(16),
      lineHeight: deviceInfo?.ios ? 0 : 24,
    },
  },
  text_h5: {
    regular: {
      fontFamily: Fonts.arm.regular,
      fontWeight: '400',
      fontSize: normalize(14),
      lineHeight: deviceInfo?.ios ? 0 : 20,
    },
    medium: {
      fontFamily: Fonts.arm.medium,
      fontWeight: '500',
      fontSize: normalize(14),
      lineHeight: deviceInfo?.ios ? 0 : 20,
    },
    semi_bold: {
      fontFamily: Fonts.arm.semi_bold,
      fontWeight: '600',
      fontSize: normalize(14),
      lineHeight: deviceInfo?.ios ? 0 : 20,
    },
    bold: {
      fontFamily: Fonts.arm.bold,
      fontWeight: '700',
      fontSize: normalize(14),
      lineHeight: deviceInfo?.ios ? 0 : 20,
    },
  },
  text_h6: {
    regular: {
      fontFamily: Fonts.arm.regular,
      fontWeight: '400',
      fontSize: normalize(12),
      lineHeight: deviceInfo?.ios ? 0 : 18,
    },
    medium: {
      fontFamily: Fonts.arm.medium,
      fontWeight: '500',
      fontSize: normalize(12),
      lineHeight: deviceInfo?.ios ? 0 : 18,
    },
    semi_bold: {
      fontFamily: Fonts.arm.semi_bold,
      fontWeight: '600',
      fontSize: normalize(12),
      lineHeight: deviceInfo?.ios ? 0 : 18,
    },
    bold: {
      fontFamily: Fonts.arm.bold,
      fontWeight: '700',
      fontSize: normalize(12),
      lineHeight: deviceInfo?.ios ? 0 : 18,
    },
  },
};

export const IconSize = {
  small: normalize(9),
  medium: normalize(18),
};

export const Padding = {
  horizontal: normalize(20),
};

export const Shadow = {
  shadowColor: deviceInfo?.android ? '#000' : COLORS.oxford_blue['100'],
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.53,
  shadowRadius: 13.97,

  elevation: deviceInfo?.android ? 21 : 3,
};

export const BorderStyles = {
  widths: {
    normal: 1,
    border2: 2,
    border3: 3,
  },
  radius: {
    xs: 8,
    s: 10,
    ss: 12,
    sm: 16,
    md: 30,
    lg: 60,
    circle: 90,
  },
  color: {
    gray: 'rgba(11, 43, 62,.2)',
  },
};

export const fullScreen = {
  width: deviceInfo.deviceWidth,
  height: deviceInfo.deviceHeight,
};
