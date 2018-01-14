import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const Header = () => (
  <View style={styles.navbar}>
    <Text
      style={{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Arial',
      }}
    >
      Reminder
    </Text>
    {/* <TouchableOpacity>
      <Icon size={26} name="md-more" color="#ffffff" />
    </TouchableOpacity> */}
  </View>
);

export default Header;
