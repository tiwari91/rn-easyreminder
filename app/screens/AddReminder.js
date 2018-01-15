import React, { Component } from "react";
import {
  View,
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
  TouchableHighlight,
  TouchableWithoutFeedback
} from "react-native";
import DismissKeyboard from "dismissKeyboard";
import KeyboardSpacer from "react-native-keyboard-spacer";

import Modal from "react-native-simple-modal";

import Icon from "react-native-vector-icons/Ionicons";
import ChevronIcon from "react-native-vector-icons/EvilIcons";
import NavIcon from "react-native-vector-icons/MaterialCommunityIcons";
import NotifyIcon from "react-native-vector-icons/MaterialIcons";
import ActionButton from "react-native-action-button";

import Moment from "moment";
import MomentTZ from "moment-timezone";

import { AsyncStorage } from "react-native";
import { InputWithButton } from "../components/TextInput";

import DatePicker from "../components/DateTimePicker/index";
import DateTimeView from "../components/DateTimeView/index";

class AddReminder extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerTitle =
      params.data !== undefined ? "Edit reminder" : "Create a reminder";

    return {
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          {params.data !== undefined ? (
            <TouchableOpacity onPress={() => params.handleRemove()}>
              <NavIcon color="white" size={26} name="delete" />
            </TouchableOpacity>
          ) : null}

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
      headerTitle: headerTitle,
      headerTitleStyle: {
        right: 100,
        alignSelf: "flex-end"
      }
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      reminderKey: "",
      text: " ",
      dateText: "",
      timeText: "",
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
  }

  componentDidMount() {
    var data = this.props.navigation.state.params.data;

    if (data !== undefined) {
      data.map(x => {
        let timeTxt = x.date.split(" ");
        this.setState({
          reminderKey: x.key,
          text: x.title,
          dateText: timeTxt.slice(0, -2).join(" "),
          timeText:
            timeTxt[timeTxt.length - 2] + " " + timeTxt[timeTxt.length - 1],
          notify: x.notify,
          repeatInterval: x.duration.match(/\d/g).join(""),
          selectRepeatType: x.duration.split(" ")[2]
        });
      });
    } else {
      this.setState({
        timeText: MomentTZ()
          .tz("America/Los_Angeles")
          .format("hh:mm A"),
        dateText: MomentTZ()
          .tz("America/Los_Angeles")
          .format("LL"),
        text: "Please enter your text"
      });
    }

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

  _handleInputText = text => {
    this.setState({
      text
    });
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

    const CURRENT_KEY = Math.round(new Date().getTime() / 1000).toString();

    AsyncStorage.setItem(CURRENT_KEY, JSON.stringify(reminderObject)).done(
      () => {
        Alert.alert(
          "Saved",
          "Reminder added successfully",
          [{
              text: "OK",
              onPress: () => {
                this.props.navigation.state.params.handleOnNavigateBack();
                this.props.navigation.goBack();
              }
            }
          ],
          { cancelable: false }
        );
      }
    );
  };

  deleteReminder = () => {
    AsyncStorage.removeItem(this.state.reminderKey).done(() => {
      Alert.alert(
        "Delete",
        "Reminder delete successfully",
        [
          {
            text: "OK",
            onPress: () => {
              this.props.navigation.state.params.handleOnGetData();
              this.props.navigation.goBack();
            }
          }
        ],
        { cancelable: false }
      );
    });
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          DismissKeyboard();
        }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.topView}>
            <InputWithButton
              maxLength={40}
              onChangeText={this._handleInputText}
              text={this.state.text}
            />
            <ActionButton
              buttonColor="#65799b"
              onPress={this._handleNotification}
              offsetY={0}
              icon={
                this.state.notify === false ? (
                  <NotifyIcon
                    color="white"
                    size={20}
                    name="notifications-off"
                  />
                ) : (
                  <NotifyIcon color="white" size={20} name="notifications" />
                )
              }
            />
          </View>

          <View style={styles.bottomView}>
            <DateTimeView
              onPress={this._showDatePicker}
              IconName="ios-calendar-outline"
              dateText={this.state.dateText}
              name="Date"
            />

            <DateTimeView
              onPress={this._showTimePicker}
              IconName="ios-time-outline"
              dateText={this.state.timeText}
              name="Time"
            />

            <View style={styles.repeatRow}>
              <View style={{ flexDirection: "row" }}>
                <Icon color="white" size={26} name="ios-repeat" />
                <View style={{ marginLeft: 45 }}>
                  <Text style={{ fontSize: 15, color: "white" }}>Repeat</Text>
                  <Text style={{ fontSize: 15, color: "white" }}>
                    {this.state.switchValue === true
                      ? `Every ${this.state.repeatInterval} ${
                          this.state.selectRepeatType
                        }(s)`
                      : "No Repeat"}
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
              style={styles.dateTimePickerRow}
            >
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

            <DatePicker
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDatePicker}
              mode="date"
              minimumDate={new Date(this.state.todayDate)}
            />

            <DatePicker
              isVisible={this.state.isTimePickerVisible}
              onConfirm={this._handleTimePicked}
              onCancel={this._hideTimePicker}
              mode="time"
            />
          </View>

          <KeyboardSpacer />

          <Modal
            open={this.state.open}
            modalDidClose={() => this.setState({ open: false })}
            overlayBackground={"rgba(0, 0, 0, 0.50)"}
            modalStyle={{ backgroundColor: "#374046" }}
          >
            <View>
              <InputWithButton
                maxLength={10}
                onChangeText={this._handleSetInterval}
              />
            </View>
          </Modal>

          <Modal
            open={this.state.repeatType}
            modalDidClose={() => this.setState({ repeatType: false })}
            overlayBackground={"rgba(0, 0, 0, 0.50)"}
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
      </TouchableWithoutFeedback>
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
