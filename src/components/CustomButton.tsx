import React from 'react';
import {Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {buttonStyles} from '../styles/CustomButtonStyles';

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

// style = {}: con esto evitamos que nos de error si viene undefined o null
export const CustomButton = ({title, onPress, style = {}}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        ...(style as any),
        ...buttonStyles.button,
      }}>
      <Text style={buttonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
