import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const ModalButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text
        style={
        props.onPress === null
          ? styles.repeatTypeSelect
          : styles.repeatTypeInterval
      }
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default ModalButton;
