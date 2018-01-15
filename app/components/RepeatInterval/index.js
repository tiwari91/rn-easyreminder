import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { PropTypes } from 'prop-types';
import ChevronIcon from 'react-native-vector-icons/EvilIcons';
import NavIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

const RepeatInterval = props => (
  <View pointerEvents={props.pointerEvents}>
    <TouchableOpacity style={styles.dateTimePickerRow} onPress={props.onPress}>
      {props.text === 'Repetition Interval' ? (
        <View>
          <ChevronIcon color="white" size={20} name="chevron-up" />
          <ChevronIcon color="white" size={20} name="chevron-down" />
        </View>
      ) : (
        <NavIcon color="white" size={20} name="format-list-bulleted-type" />
      )}

      <View style={styles.dateContent}>
        <Text style={{ fontSize: 15, color: 'white' }}>{props.text}</Text>
        <Text style={{ fontSize: 15, color: 'white' }}>
          {props.text === 'Repetition Interval'
            ? props.repeatInterval
            : props.selectRepeatType}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

RepeatInterval.propTypes = {
  pointerEvents: PropTypes.string,
  text: PropTypes.string,
  onPress: PropTypes.func,
  repeatInterval: PropTypes.string,
  selectRepeatType: PropTypes.string,
};

export default RepeatInterval;
