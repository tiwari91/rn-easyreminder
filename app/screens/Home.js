import React, { Component } from "react";
import {
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import ActionButton from "react-native-action-button";

import { Header } from "../components/Header";
import { Info } from "../components/Info";
import { ListItem } from "../components/List";

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
      //console.log(keys);
      keys.forEach(element => {
        AsyncStorage.getItem(element)
          .then(JSON.parse)
          .then(response => {
            //console.log(response);
            this.setState({
              data: this.state.data.filter(b => b.key !== element).concat({
                key: element,
                title: response.inputText,
                date: `${response.date} ${response.time}`,
                duration: `Every ${response.repeatInterval} days`,
                notify: response.notify,
                avatar: "avatar"
              })
            });
          });
      });
    });
  };

  handleOnNavigateBack = () => {
    this._fetchData();
  };

  handleOnGetData = () => {
    AsyncStorage.getAllKeys().then(keys => {
      console.log(keys);
      //keys.forEach(element => {
      this.setState(state => {
        //console.log(state.data.filter(b => b.key));
        //state: state.date.filter(b => b.key === element);
        let newState = state.data.filter(b => {
          return keys.includes(b.key);
        });
        console.log(newState);
        state: newState;
      });
    });
    //});
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#374046" }}>
        <StatusBar barStyle="light-content" />
        <Header />
        {this.state.data.length > 0 ? (
          <ListItem
            renderData={this.state.data}
            navigation={this.props.navigation}
            handleOnGetData={this.handleOnGetData}
          />
        ) : (
          <Info InfoText="Press on plus button to create reminders" />
        )}
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() =>
            this.props.navigation.navigate("AddReminder", {
              handleOnNavigateBack: this.handleOnNavigateBack
            })
          }
        />
      </SafeAreaView>
    );
  }
}

export default Home;
