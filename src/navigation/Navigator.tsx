import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MapScreen} from '../screens/MapScreen';
import {PermissionsScreen} from '../screens/PermissionsScreen';
import {useContext} from 'react';
import {PermissionsContext} from '../context/PermissionsContext';
import {LoadingScreen} from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
  const {permissions} = useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      {
        // Si ya me dió los permisos, no tiene sentido mostrar la pantalla de permisos
        permissions.locationStatus === 'granted' ? (
          <Stack.Screen name="MapScreen" component={MapScreen} />
        ) : (
          <Stack.Screen
            name="PermissionsScreen"
            component={PermissionsScreen}
          />
        )
      }
    </Stack.Navigator>
  );
};
