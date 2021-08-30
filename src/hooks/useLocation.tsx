import {useState, useEffect, useRef} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Location} from '../interfaces/appInterfaces';

interface Props {}

export const useLocation = () => {
  // Para saber si muestro o no el mapa hasta tener las coordenadas
  const [hasLocation, setHasLocation] = useState(false);
  const [routeLines, setRouteLines] = useState<Location[]>([]);
  const [initialPosition, setInitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const [currentUserLocation, setCurrentUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const watchId = useRef<number>();

  //Se utiliza para controlar cuando el componente no está montado y evitar error de react
  //Al principio se que va a estar montado, por eso se inicializa en true
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    //Cuando se llame a este return, significa que el componente se está desmontando
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getCurrentLocation().then(location => {
      //Si el componente está desmontado, no se debe llamar a ninguna función
      if (!isMounted.current) return;

      setInitialPosition(location);
      setCurrentUserLocation(location);
      setHasLocation(true);
      //Tengo que tomar lo valores actuales y asignarlos con el spread
      setRouteLines(routeLines => [...routeLines, location]);
    });
  }, []);

  //Construimos este método para poder devolver una Promise que resuelve algo de tipo Location
  // ya que el getCurrentPosition nos devuelve un callback y no una Promise
  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => reject({err}),
        {enableHighAccuracy: true},
      );
    });
  };

  //   Función para seguir al usuario en el mapa cuando se mueve
  const followUser = () => {
    watchId.current = Geolocation.watchPosition(
      ({coords}) => {
        //Si el componente está desmontado, no se debe llamar a ninguna función
        if (!isMounted.current) return;

        const loc: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        // console.log({coords});
        setCurrentUserLocation(loc);
        //Tengo que tomar lo valores actuales y asignarlos con el spread
        setRouteLines(routeLines => [...routeLines, loc]);
      },
      err => console.log(err),
      //   Cada vez que pase 10 metros, me va a notificar
      {enableHighAccuracy: true, distanceFilter: 10},
    );
  };

  //Dejar de seguir al usuario
  const stopFollowUser = () => {
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current);
    }
  };

  return {
    getCurrentLocation,
    hasLocation,
    initialPosition,
    followUser,
    currentUserLocation,
    stopFollowUser,
    routeLines,
  };
};
