import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Image, TouchableOpacity, Button } from 'react-native';

import Home from '../screens/Home';
import AddReminder from '../screens/AddReminder';

export default StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: () => null,
        // headerTitle: 'rEMINDLY',

      },
    },
    AddReminder: {
      screen: AddReminder,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
      }),
    },
  },
  {
    mode: 'modal',
    cardStyle: { paddingTop: StatusBar.currentHeight },
  },
);
