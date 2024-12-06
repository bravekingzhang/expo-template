/**
 * Themed components that automatically adapt to the current color scheme
 * @module Themed
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

/**
 * Theme props interface for components
 */
export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

/**
 * Extracts the appropriate theme colors based on the color scheme
 * @param {ThemeProps} props - Theme properties containing light and dark colors
 * @param {string} colorName - Name of the color in the theme
 * @returns {string} The appropriate color for the current theme
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
  return Colors[theme][colorName];
}

/**
 * Extended Text component props with theme support
 */
export type TextProps = ThemeProps & DefaultText['props'];

/**
 * Extended View component props with theme support
 */
export type ViewProps = ThemeProps & DefaultView['props'];

/**
 * Themed Text component that adapts to the current color scheme
 * @param {TextProps} props - Component properties
 * @returns {JSX.Element} Themed Text component
 */
export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

/**
 * Themed View component that adapts to the current color scheme
 * @param {ViewProps} props - Component properties
 * @returns {JSX.Element} Themed View component
 */
export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
