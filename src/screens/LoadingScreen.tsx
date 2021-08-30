import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {styles} from '../styles/LoadingStyles';

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color="black" />
    </View>
  );
};
