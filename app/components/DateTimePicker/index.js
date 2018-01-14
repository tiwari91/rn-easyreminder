import React from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import PropTypes from "prop-types";

const DatePicker = props => (
  <DateTimePicker
    isVisible={props.isVisible}
    onConfirm={props.onConfirm}
    onCancel={props.onCancel}
    mode={props.mode}
    minimumDate={props.minimumDate}
  />
);

// DatePicker.propTypes = {
//   onChangeText: PropTypes.func,
//   maxLength: PropTypes.number
// };

export default DatePicker;
