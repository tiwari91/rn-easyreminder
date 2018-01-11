import React, { Component } from 'react';
import {
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import ActionButton from 'react-native-action-button';

import { Header } from '../components/Header';
import { ListItem } from '../components/List';

class Home extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={10}>
          <StatusBar backgroundColor="blue" barStyle="light-content" />
          <Header />
          <ListItem />
        </KeyboardAvoidingView>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() =>
            this.props.navigation.navigate('AddReminder', {
              title: 'Create a Reminder',
            })
          }
        />
      </SafeAreaView>
    );
  }
}

export default Home;
