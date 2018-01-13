import React, { Component } from "react";
import {
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import ActionButton from "react-native-action-button";

import { Header } from "../components/Header";
import { ListItem } from "../components/List";

const REMINDER_KEY_OBJ = "reminderKeyObj";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this._fetchData = this._fetchData.bind(this);
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData = () => {
    AsyncStorage.getAllKeys().then(keys => {
      keys.forEach(element => {
        // console.log(element);
        if (element !== REMINDER_KEY_OBJ) {
          AsyncStorage.getItem(element)
            .then(JSON.parse)
            .then(response => {
              this.setState({
                data: this.state.data.concat({
                  key: element,
                  title: response.inputText,
                  date: `${response.date} ${response.time}`,
                  duration: `Every ${response.repeatInterval} days`,
                  notify: response.notify,
                  avatar: "avatar"
                })
              });
            });
        }
      });
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#374046" }}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={10}>
          <Header />
          <ListItem renderData={this.state.data} />
        </KeyboardAvoidingView>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() =>
            this.props.navigation.navigate("AddReminder", {
              title: "Create a Reminder"
            })
          }
        />
      </SafeAreaView>
    );
  }
}

export default Home;
