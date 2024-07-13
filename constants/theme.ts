/* eslint-disable prettier/prettier */
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const theme = {
    primary: '#121212',
    secondary: '#222831',
    secondary100: '#31363f',
    secondary200: '#76abae',
    secondary300: '#eeeeee'   
} as const

export const fontSize = {
    extraSmall: 12,
    small:      14,
    medium:     16,
    large:      18,
    extraLarge: 20,

} as const

export const colors = {
    theme,
    fontSize,
    background: '#222831'
}