import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ActivityIndicator, ColorValue, GestureResponderEvent, StyleProp, Text, TouchableNativeFeedback, View, ViewStyle } from 'react-native';
import { neutral, primary } from '../theme/palette';

interface IButton {
    title?: string;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    onClick?: (event: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
    fullWidth?: boolean;
}
const Button = (props: PropsWithChildren<IButton>) => {
  const disabled = props.loading || props.disabled


  const backgroundColor = disabled ? neutral[400] : primary.main
  const textColor = disabled ? calculateTextColor(backgroundColor) : neutral[50]
  const [rippleColor, setRippleColor] = useState<ColorValue>(neutral[50]);

  const updateRippleColor = () => {
    setRippleColor(calculateRippleColor(backgroundColor));
  };



  useEffect( () => {
    updateRippleColor();
  }, [] )

  return (
    <TouchableNativeFeedback
    onPress={props.onClick}
    disabled={disabled}
    background={TouchableNativeFeedback.Ripple(
      rippleColor,
      false,
    )}
    style={{
      ...props.fullWidth && {width: '100%'},
    }}
    >
        <View
        style={{
          backgroundColor,
          paddingHorizontal: 15,
          paddingVertical: 8,
          alignSelf: 'auto',
          borderRadius: 5,
          ...props.fullWidth && {width: '100%'},
          ...(props.style as Object)
      }}
        >
        {
        !props.loading ?
        (
          props.title ?
        <Text
        style={{
            color: textColor,
            fontWeight: '600',
            textAlign: 'center',
        }}
        >
        {props.title}
        </Text> :
        props.children
        ) :

        <View 
        style={{
          flexDirection: 'row', alignItems: 'center', alignSelf: 'center'
        }}
        >
        <ActivityIndicator size="small" color={textColor} />
        {props.loadingText && <Text style={{color: textColor}}>{props.loadingText}</Text>}
        </View>
        }
        </View>
    </TouchableNativeFeedback>
  );
};

export default Button;













const calculateRippleColor = (backgroundColor: string): ColorValue => {
  const rgb = parseInt(backgroundColor.replace('#', ''), 16);
  const luminance = (0.299 * ((rgb >> 16) & 255) + 0.587 * ((rgb >> 8) & 255) + 0.114 * (rgb & 255)) / 255;
  return luminance > 0.5 ? '#00000020' : '#ffffff40';
};

const calculateTextColor = (backgroundColor: string): ColorValue => {
  const rgb = parseInt(backgroundColor.replace('#', ''), 16);
  const luminance = (0.299 * ((rgb >> 16) & 255) + 0.587 * ((rgb >> 8) & 255) + 0.114 * (rgb & 255)) / 255;
  return luminance > 0.5 ? '#00000080' : '#ffffff80';
}