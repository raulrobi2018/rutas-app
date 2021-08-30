import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: width - 20,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  details: {
    marginTop: 30,
  },
});
