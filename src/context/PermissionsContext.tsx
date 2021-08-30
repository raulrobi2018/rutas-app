import React, {createContext, useState} from 'react';
import {useEffect} from 'react';
import {AppState, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  openSettings,
} from 'react-native-permissions';

//Como luce
export interface PermissionsState {
  locationStatus: PermissionStatus;
}

//Estado inicial
export const permissionsInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

//Tipo que se va a exponer
type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermissions: () => void;
  checkLocationPermissions: () => void;
};

//Información que expone el contexto hacia afuera
export const PermissionsContext = createContext({} as PermissionsContextProps);

//Este es un higher order component
export const PermissionsProvider = ({children}: any) => {
  const [permissions, setPermissions] = useState(permissionsInitState);

  //Este efecto se va a ejecutar una única vez, cuando el PermissionsProvider sea construido
  //Dispara un listener que estará escuchando si la aplicación está activa o no en todo momento
  useEffect(() => {
    checkLocationPermissions();
    AppState.addEventListener('change', state => {
      if (state !== 'active') return;

      checkLocationPermissions();
    });
  }, []);

  const askLocationPermissions = async () => {
    let permissionsStatus: PermissionStatus = 'denied';

    if (Platform.OS === 'ios') {
      //Si se quiere consultar por un permiso, se utiliza de esta manera
      // permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permissionsStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else if (Platform.OS === 'android') {
      // permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      permissionsStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }

    if (permissionsStatus === 'blocked') {
      openSettings();
    }

    setPermissions({...permissions, locationStatus: permissionsStatus});
  };

  const checkLocationPermissions = async () => {
    let permissionsStatus: PermissionStatus = 'denied';

    if (Platform.OS === 'ios') {
      //Si se quiere consultar por un permiso, se utiliza de esta manera
      // permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else if (Platform.OS === 'android') {
      // permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    setPermissions({...permissions, locationStatus: permissionsStatus});
  };

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        askLocationPermissions,
        checkLocationPermissions,
      }}>
      {children}
    </PermissionsContext.Provider>
  );
};
