import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MomentTZ from 'moment-timezone';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const DateTimeView = (props) => {
  const dateTime = () => {
    if (props.dateTimeCheck) {
      return props.dateText
        ? props.dateText
        : MomentTZ()
          .tz('America/Los_Angeles')
          .format('LL');
    }
    return props.timeText
      ? props.timeText
      : MomentTZ()
        .tz('America/Los_Angeles')
        .format('hh:mm A');
  };

  return (
    <TouchableOpacity style={styles.dateTimePickerRow} onPress={props.onPress}>
      <Icon color="white" size={26} name={props.IconName} />
      <View style={styles.dateContent}>
        <Text style={{ fontSize: 15, color: 'white' }}>{props.name}</Text>
        <Text style={{ fontSize: 15, color: 'white' }}>{dateTime()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DateTimeView;
