import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  Info: {
    backgroundColor: '#374046',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: width < 420 ? width - 20 : 400,
  },
});

export default styles;
