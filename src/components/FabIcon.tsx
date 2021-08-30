import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {View} from 'react-native';
import {styles} from '../styles/fabIconStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const FabIcon = ({iconName, onPress, style = {}}) => {
  return (
    <View style={style}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.button}>
        <Icon name={iconName} color="white" size={35} />
      </TouchableOpacity>
    </View>
  );
};
