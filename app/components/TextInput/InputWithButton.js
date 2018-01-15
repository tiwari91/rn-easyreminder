import React from 'react';
import { TextInput, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const InputWithButton = (props) => {
  const baseStyle = [styles.baseStyle];
  if (props.maxLength === 40) {
    baseStyle.push({
      fontSize: 30,
      borderBottomWidth: 1,
      marginHorizontal: 20,
      marginBottom: 80,
    });
  } else {
    baseStyle.push({ fontSize: 20 });
  }

  return (
    <TextInput
      style={baseStyle}
      placeholder={props.placeholderText}
      onChangeText={props.onChangeText}
      multiline
      maxLength={props.maxLength}
      placeholderTextColor="white"
      autoCorrect={false}
      autoCapitalize="none"
      underlineColorAndroid="transparent"
      onSubmitEditing={Keyboard.dismiss}
      value={props.text}
      keyboardAppearance="dark"
      keyboardType={props.keyboardType}
    />
  );
};

InputWithButton.propTypes = {
  onChangeText: PropTypes.func,
  maxLength: PropTypes.number,
  text: PropTypes.string,
  placeholderText: PropTypes.string,
};

export default InputWithButton;
