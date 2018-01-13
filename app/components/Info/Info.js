import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const Info = ({ InfoText }) => (
  <View style={styles.Info}>
    <Text style={{ color: '#ffffff' }}>{InfoText}</Text>
  </View>
);

export default Info;
