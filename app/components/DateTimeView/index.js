import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const DateTimeView = (props) => {
  return (
    <TouchableOpacity style={styles.dateTimePickerRow} onPress={props.onPress}>
      <Icon color="white" size={26} name={props.IconName} />
      <View style={styles.dateContent}>
        <Text style={{ fontSize: 15, color: 'white' }}>{props.name}</Text>
        <Text style={{ fontSize: 15, color: 'white' }}>{props.dateText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DateTimeView;
