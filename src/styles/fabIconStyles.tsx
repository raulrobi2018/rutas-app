import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  button: {
    zIndex: 9999,
    height: 50,
    width: 50,
    backgroundColor: 'rgba(89,89,89, 1)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4.65,
    shadowOpacity: 0.27,
    elevation: 6,
  },
});
