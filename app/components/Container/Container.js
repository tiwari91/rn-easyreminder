import React from "react";
import { SafeAreaView, StatusBar, KeyboardAvoidingView } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import ActionButton from "react-native-action-button";

const Container = ({ children }) => (
  <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={10}>
      {children}
    </KeyboardAvoidingView>
    <ActionButton
      buttonColor="rgba(231,76,60,1)"
      onPress={() => console.log("create new reminder")}
    />
  </SafeAreaView>
);

Container.propTypes = {
  children: PropTypes.any
};

export default Container;
