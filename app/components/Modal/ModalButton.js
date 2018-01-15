import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  repeatTypeInterval: {
    color: "white",
    fontSize: 15,
    paddingHorizontal: 10,
    padding: 10
  },
  repeatTypeSelect: {
    color: "white",
    fontSize: 20,
    paddingHorizontal: 10,
    padding: 10
  }
});

const ModalButton = props => (
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

export default ModalButton;
