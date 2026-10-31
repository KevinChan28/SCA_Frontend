/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import '@/global.css';
import { Platform, StyleSheet } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  zero: 0,
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
  seven: 80,
  eigth: 80,
  btn1: 200,
  btn2: 150
} as const;
export const Styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "transparent", // Permite ver la imagen de fondo
  },
  titleContainer: {
    padding: Spacing.two,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: Spacing.three,
    color: "#fff", // Para que resalte sobre el fondo si es oscuro
  },
  titleStatus: {
    alignItems: "center",
    marginVertical: 10,
  },
  webButtonStatus: {
    padding: '20px',
    cursor: 'pointer',
    borderRadius: '6px',
    backgroundColor: '#f8f9fa',
  },
  webButtonStatus2: {
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '6px',
    backgroundColor: '#f8f9fa',
    marginRight: '8px'
  },
  webButtonTable: {
    
    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '15px', paddingBottom: '10px'
  },
});

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
