import React from 'react';
import { Text, View, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles'

const RepeatSwitchView = props => (
  <View style={styles.repeatRow}>
    <View style={{ flexDirection: 'row' }}>
      <Icon color="white" size={26} name="ios-repeat" />
      <View style={{ marginLeft: 45 }}>
        <Text style={{ fontSize: 15, color: 'white' }}>Repeat</Text>
        <Text style={{ fontSize: 15, color: 'white' }}>
          {props.value === true
            ? `Every ${props.repeatInterval} ${props.selectRepeatType}(s)`
            : 'No Repeat'}
        </Text>
      </View>
    </View>

    <Switch
      value={props.value}
      disabled={false}
      onValueChange={props.onValueChange}
      tintColor="#ff0000"
    />
  </View>
);

export default RepeatSwitchView;
