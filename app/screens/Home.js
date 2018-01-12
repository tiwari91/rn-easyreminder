import React, { Component } from 'react';
import { StatusBar, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import ActionButton from 'react-native-action-button';

import { Header } from '../components/Header';
import { ListItem } from '../components/List';

class Home extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#374046' }}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={10}>
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
