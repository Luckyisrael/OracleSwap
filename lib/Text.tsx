/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Text as RNText, TextStyle, StyleSheet, Appearance } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors, fontSize } from '../constants/theme';

export interface TextProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.JSX.Element
    | string
    | string[]
    | React.JSX.Element[]
    | number
    | number[];
  size?: number;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

const Text = (props: TextProps) => {
  const { size, color, numberOfLines, style, children } = props;

  return (
    <RNText 
      style={[
        {
          fontSize: moderateScale(size || fontSize.large), 
          color: color || '#eeeeee', 
        },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};


export { Text };
