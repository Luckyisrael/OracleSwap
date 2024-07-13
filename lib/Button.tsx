import { colors, fontSize, theme } from '~/constants/theme';
import React from 'react';
import { TouchableOpacity, View, Keyboard, StyleProp, ViewStyle, StyleSheet } from 'react-native';

import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Text } from './Text';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  length?: 'half' | 'full' | number | any;
  color?: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor?: string;
  borderColor?: string;
  onPress?: () => void;
  textSize?: number;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  variant,
  color,
  label,
  leftIcon,
  length,
  rightIcon,
  textColor,
  borderColor,
  textSize,
  onPress,
  disabled,
  style,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      onPress={() => {
        Keyboard.dismiss();
        if (onPress) onPress();
      }}
      style={[
        styles.buttonContainer({
          variant,
          length,
          color,
          leftIcon,
          rightIcon,
          borderColor,
          disabled,
        }),
        style,
      ]}>
      {leftIcon}
      <View>
        <Text
          size={textSize || 14}
          color={
            textColor
              ? textColor
              : variant === 'secondary'
                ? colors.theme.secondary200
                : colors.theme.secondary
          }>
          {label}
        </Text>
      </View>
      {rightIcon}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  variant: 'primary',
  length: 'full',
  color: '',
  label: '',
  leftIcon: null,
  rightIcon: null,
  onPress: () => {},
  textColor: '',
  borderColor: '',
  disabled: false,
};

const styles = StyleSheet.create({
  buttonContainer: ({
    variant,
    length,
    color,
    leftIcon,
    rightIcon,
    borderColor,
    disabled,
  }: ButtonProps) => ({
    flexDirection: 'row',
    height: verticalScale(40),
    backgroundColor: color
      ? color
      : disabled
        ? 'gray'
        : variant === 'primary'
          ? colors.theme.secondary200
          : variant === 'danger'
            ? '#FFDDE3'
            : 'transparent',
    borderColor: borderColor
      ? borderColor
      : variant === 'secondary'
        ? colors.theme.secondary200
        : 'transparent',
    width: length === 'full' ? '100%' : length === 'half' ? '50%' : length,
    alignItems: 'center',
    justifyContent: leftIcon !== null || rightIcon !== null ? 'space-between' : 'center',
    paddingHorizontal: moderateScale(20),
    //paddingVertical: verticalScale(12),
    borderRadius: moderateScale(12),
    borderWidth: 1,
  }),
});

export { Button };
