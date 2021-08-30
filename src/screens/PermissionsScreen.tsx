import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles/PermissionsStyles';
import {PermissionsContext} from '../context/PermissionsContext';
import {CustomButton} from '../components/CustomButton';

export const PermissionsScreen = () => {
  const {permissions, askLocationPermissions} = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Es necesario tener permisos para utilizar el GPS
      </Text>

      <CustomButton title="Permisos" onPress={askLocationPermissions} />

      <Text style={styles.details}>{JSON.stringify(permissions, null, 5)}</Text>
    </View>
  );
};
