import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Image,
  Dimensions,
  Button,
  Alert,
  TouchableHighlight
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Modal from "react-native-simple-modal";

import Icon from "react-native-vector-icons/Ionicons";
import ChevronIcon from "react-native-vector-icons/EvilIcons";
import NavIcon from "react-native-vector-icons/MaterialCommunityIcons";
import NotifyIcon from "react-native-vector-icons/MaterialIcons";
import ActionButton from "react-native-action-button";

import Moment from "moment";
import MomentTZ from "moment-timezone";

import { Dropdown } from "react-native-material-dropdown";
import { AsyncStorage } from "react-native";

const REMINDER_KEY = "reminderKey";
const REMINDER_KEY_OBJ = "reminderKeyObj";

class AddReminder extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => params.handleRemove()}>
            <NavIcon color="white" size={26} name="delete" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 20, right: 10 }}
            onPress={() => params.handleSave()}
          >
            <NavIcon color="white" size={26} name="check" />
          </TouchableOpacity>
        </View>
      ),
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#374046"
      },
      headerTitle: params.title,
      headerTitleStyle: {
        right: 100,
        alignSelf: "flex-end"
      }
    };
  };

  state = {
    text: " ",
    dateText: MomentTZ()
      .tz("America/Los_Angeles")
      .format("LL"),
    timeText: MomentTZ()
      .tz("America/Los_Angeles")
      .format("hh:mm A"),

    todayDate: MomentTZ()
      .tz("America/Los_Angeles")
      .format("LL"),
    isDatePickerVisible: false,
    isTimePickerVisible: false,

    switchValue: true,
    notify: false,

    repeatInterval: 0,
    open: false,
    repeatType: false,

    selectRepeatType: "Minute"
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleRemove: this.deleteReminder,
      handleSave: this.saveReminder
    });
  }

  _showDatePicker = () => this.setState({ isDatePickerVisible: true });
  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });
  _handleDatePicked = date => {
    this.setState({
      dateText: MomentTZ(date)
        .tz("America/Los_Angeles")
        .format("LL")
    });
    this._hideDatePicker();
  };

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });
  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });
  _handleTimePicked = time => {
    this.setState({
      timeText: MomentTZ(time)
        .tz("America/Los_Angeles")
        .format("hh:mm A")
    });
    this._hideTimePicker();
  };

  _handleToggleSwitch = () => {
    this.setState({ switchValue: !this.state.switchValue });
  };

  deleteReminder = () => {
    console.log("delete reminder");
  };

  saveReminder = () => {
    let reminderObject = {
      inputText: this.state.text,
      notify: this.state.notify,
      date: this.state.dateText,
      time: this.state.timeText,
      repeatInterval: this.state.repeatInterval,
      selectRepeatType: this.state.selectRepeatType
    };

    const CURRENT_KEY =
      REMINDER_KEY + "_" + Math.floor(Math.random() * 1000000) + 1;

    AsyncStorage.getItem(REMINDER_KEY_OBJ, (err, result) => {
      const restoredArray = JSON.parse(result);
      if (restoredArray !== null) {
        if (restoredArray.indexOf(CURRENT_KEY) === -1) {
          restoredArray.push(CURRENT_KEY);
          AsyncStorage.setItem(REMINDER_KEY_OBJ, JSON.stringify(restoredArray));
          AsyncStorage.setItem(CURRENT_KEY, JSON.stringify(reminderObject));
        }
      } else {
        AsyncStorage.setItem(
          REMINDER_KEY_OBJ,
          JSON.stringify(new Array(CURRENT_KEY))
        );
        AsyncStorage.setItem(CURRENT_KEY, JSON.stringify(reminderObject));
      }
    }).done(() => {
      Alert.alert(
        "Reminder saving",
        "reminder added successfully",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              this.props.navigation.state.params.handleOnNavigateBack();
              this.props.navigation.goBack();
            }
          }
        ],
        { cancelable: false }
      );
    });
  };

  _handleNotification = () => {
    this.setState({
      notify: !this.state.notify
    });
  };

  _handleSetInterval = text => {
    this.setState({
      repeatInterval: text
      //open: false
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topView}>
          <TextInput
            style={styles.inputText}
            placeholder="Enter your text"
            onChangeText={text => this.setState({ text })}
            multiline={true}
            maxLength={40}
            placeholderTextColor="white"
            autoCorrect={false}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />
          <ActionButton
            buttonColor="#65799b"
            onPress={this._handleNotification}
            offsetY={0}
            icon={
              this.state.notify === false ? (
                <NotifyIcon color="white" size={20} name="notifications-off" />
              ) : (
                <NotifyIcon color="white" size={20} name="notifications" />
              )
            }
          />
        </View>

        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.dateTimePickerRow}
            onPress={this._showDatePicker}
          >
            <Icon color="white" size={26} name="ios-calendar-outline" />
            <View style={styles.dateContent}>
              <Text style={{ fontSize: 15, color: "white" }}>Date</Text>
              <Text style={{ fontSize: 15, color: "white" }}>
                {this.state.dateText
                  ? this.state.dateText
                  : MomentTZ()
                      .tz("America/Los_Angeles")
                      .format("LL")}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateTimePickerRow}
            onPress={this._showTimePicker}
          >
            <Icon color="white" size={26} name="ios-time-outline" />
            <View style={styles.dateContent}>
              <Text style={{ fontSize: 15, color: "white" }}>Time</Text>
              <Text style={{ fontSize: 15, color: "white" }}>
                {this.state.timeText
                  ? this.state.timeText
                  : MomentTZ()
                      .tz("America/Los_Angeles")
                      .format("hh:mm A")}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.repeatRow}>
            <View style={{ flexDirection: "row" }}>
              <Icon color="white" size={26} name="ios-repeat" />
              <View style={{ marginLeft: 45 }}>
                <Text style={{ fontSize: 15, color: "white" }}>Repeat</Text>
                <Text style={{ fontSize: 15, color: "white" }}>
                  Every {this.state.repeatInterval}{" "}
                  {this.state.selectRepeatType}(s)
                </Text>
              </View>
            </View>

            <Switch
              value={this.state.switchValue}
              disabled={false}
              onValueChange={this._handleToggleSwitch}
              tintColor="#ff0000"
            />
          </View>

          <View
            pointerEvents={this.state.switchValue === true ? null : "none"}
            style={styles.dateTimePickerRow}
          >
            <TouchableOpacity onPress={() => this.setState({ open: true })}>
              <ChevronIcon color="white" size={20} name="chevron-up" />
              <ChevronIcon color="white" size={20} name="chevron-down" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setState({ open: true })}>
              <View style={styles.dateContent}>
                <Text style={{ fontSize: 15, color: "white" }}>
                  Repetition Interval
                </Text>
                <Text style={{ fontSize: 15, color: "white" }}>
                  {this.state.repeatInterval}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            pointerEvents={this.state.switchValue === true ? null : "none"}
            style={styles.dateTimePickerRow}>
            <TouchableOpacity
              onPress={() => this.setState({ repeatType: true })}
            >
              <NavIcon
                color="white"
                size={20}
                name="format-list-bulleted-type"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ repeatType: true })}
            >
              <View style={styles.dateContent}>
                <Text style={{ fontSize: 15, color: "white" }}>
                  Types of Repeats
                </Text>
                <Text style={{ fontSize: 15, color: "white" }}>
                  {this.state.selectRepeatType}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <DateTimePicker
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDatePicker}
            mode="date"
            minimumDate={new Date(this.state.todayDate)}
          />

          <DateTimePicker
            isVisible={this.state.isTimePickerVisible}
            onConfirm={this._handleTimePicked}
            onCancel={this._hideTimePicker}
            mode="time"
          />
        </View>

        <Modal
          open={this.state.open}
          modalDidClose={() => this.setState({ open: false })}
          modalStyle={{ backgroundColor: "#374046" }}
        >
          <View>
            <TextInput
              style={{
                padding: 10,
                fontSize: 20,
                color: "white"
              }}
              placeholder="Enter your text"
              onChangeText={this._handleSetInterval}
              keyboardType="numeric"
              maxLength={10}
              placeholderTextColor="white"
              autoCorrect={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
            />
          </View>
        </Modal>

        <Modal
          open={this.state.repeatType}
          modalDidClose={() => this.setState({ repeatType: false })}
          modalStyle={{
            backgroundColor: "#374046"
          }}
        >
          <View>
            <TouchableOpacity onPress={() => null}>
              <Text style={styles.repeatTypeSelect}>
                Select Repetition Type
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.setState({
                  selectRepeatType: "Minute",
                  repeatType: false
                })
              }
            >
              <Text style={styles.repeatTypeInterval}>Minute</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.setState({
                  selectRepeatType: "Hour",
                  repeatType: false
                })
              }
            >
              <Text style={styles.repeatTypeInterval}>Hour</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.setState({
                  selectRepeatType: "Day",
                  repeatType: false
                })
              }
            >
              <Text style={styles.repeatTypeInterval}>Day </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.setState({
                  selectRepeatType: "Week",
                  repeatType: false
                })
              }
            >
              <Text style={styles.repeatTypeInterval}>Week </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.setState({
                  selectRepeatType: "Month",
                  repeatType: false
                })
              }
            >
              <Text style={styles.repeatTypeInterval}>Month </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#374046",
    justifyContent: "center"
  },

  repeatTypeSelect: {
    color: "white",
    fontSize: 20,
    paddingHorizontal: 10,
    padding: 10
  },

  repeatTypeInterval: {
    color: "white",
    fontSize: 15,
    paddingHorizontal: 10,
    padding: 10
  },

  topView: {
    backgroundColor: "#65799b",
    flex: 1,
    justifyContent: "flex-end"
  },

  bottomView: {
    flex: 2,
    justifyContent: "space-around"
    //marginTop: 50
  },

  inputText: {
    //marginTop: 170,
    padding: 10,
    fontSize: 30,
    color: "white",
    borderBottomWidth: 1,
    //backgroundColor: "red",
    marginHorizontal: 20,
    marginBottom: 80
  },

  dateTimePickerRow: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 20,
    marginTop: 20
    //backgroundColor: "red"
    // height: 100,
    // alignItems: "center"
  },

  dateContent: {
    marginLeft: 20,
    paddingHorizontal: 22
  },

  repeatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 20,
    marginTop: 20
    //backgroundColor: "red"
    //height: 100,
    //alignItems: "center"
  }
});

export default AddReminder;
