import React, {useEffect} from 'react';
import {useState} from 'react';
import {useRef} from 'react';

import MapView, {Marker, Polyline} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';
import {styles} from '../styles/mapScreenStyles';
import {FabIcon} from './FabIcon';

interface Props {
  markers?: Marker[];
}

export const Map = ({markers}: Props) => {
  const [showPolyline, setShowPolyline] = useState(true);

  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUser,
    currentUserLocation,
    stopFollowUser,
    routeLines,
  } = useLocation();

  //Utilizo un useRef porque necesito solo mantener la referencia, no preciso actualizarla cada vez
  //que cambia algo
  //La declaro de tipo MapView, por lo tanto solo va a ser de ese tipo
  const mapViewRef = useRef<MapView>();

  const following = useRef<boolean>();

  useEffect(() => {
    followUser();

    //En caso de salir y volver a entrar a la aplicación,
    //se destruye para no generar desbordamiento de memoria
    return () => {
      stopFollowUser();
    };
  }, []);

  useEffect(() => {
    //Si el usuario está buscando otra ubicación, o sea arrastrando el mapa
    //que retorne y no haga nada
    if (!following.current) return;

    const {latitude, longitude} = currentUserLocation;
    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
      zoom: 15,
    });
  }, [currentUserLocation]);

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();

    //Si luego de deshabilitar el following porque arrastró el mapa buscando otra ubicación, se presiona
    //el botón de centrar, entonces se vuelve a habilitar el following
    following.current = true;

    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
      zoom: 15,
    });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        style={{flex: 1}}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => (following.current = false)}>
        {/* Se muestra si está habilitado a mostrarse */}
        {showPolyline && (
          <Polyline
            coordinates={routeLines}
            strokeColor="gray"
            strokeWidth={3}
          />
        )}

        {/* <Marker
          image={require('../assets/green-marker.png')}
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          title="Marcador"
          description="Descripción del marcador"
          
        /> */}
      </MapView>

      <FabIcon
        iconName="filter-center-focus"
        onPress={() => centerPosition()}
        style={styles.centerIcon}
      />

      <FabIcon
        iconName="polymer"
        onPress={() => setShowPolyline(!showPolyline)}
        style={styles.polylineIcon}
      />
    </>
  );
};
