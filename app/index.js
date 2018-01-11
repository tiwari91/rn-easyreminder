import React from "react";
import Home from "./screens/Home";
import AddReminder from "./screens/AddReminder";

import EStyleSheet from "react-native-extended-stylesheet";

EStyleSheet.build({
  $primaryBlue: "#4F6D7A",

  $white: "#FFFFFF",
  $lightGray: "#F0F0F0",
  $border: "#979797",
  $inputText: "#797979"
});

export default () => <AddReminder />;
