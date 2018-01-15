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
import NavIcon from "react-native-vector-icons/MaterialCommunityIcons";
import NotifyIcon from "react-native-vector-icons/MaterialIcons";
import ActionButton from "react-native-action-button";

import Moment from "moment";
import MomentTZ from "moment-timezone";

import { AsyncStorage } from "react-native";
import { InputWithButton } from "../components/TextInput";

import DatePicker from "../components/DateTimePicker/index";
import DateTimeView from "../components/DateTimeView/index";
import RepeatSwitchView from "../components/RepeatSwitchView/";
import RepeatInterval from "../components/RepeatInterval";
import ModalButton from "../components/Modal/ModalButton";

class AddReminder extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerTitle =
      params.item !== undefined ? "Edit reminder" : "Create a reminder";

    return {
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          {params.item !== undefined ? (
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
      todayDate: this.dateInit(),
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
    let data = this.props.navigation.state.params.item;
    if (data !== undefined) {
      let timeTxt = data.date.split(" ");
      this.setState({
        reminderKey: data.key,
        text: data.title,
        dateText: timeTxt.slice(0, -2).join(" "),
        timeText:
          timeTxt[timeTxt.length - 2] + " " + timeTxt[timeTxt.length - 1],
        notify: data.notify,
        repeatInterval: data.duration.match(/\d/g).join(""),
        selectRepeatType: data.duration.split(" ")[2]
      });
    } else {
      this.setState({
        timeText: this.timeInit(),
        dateText: this.dateInit(),
        text: ""
      });
    }

    this.props.navigation.setParams({
      handleRemove: this.deleteReminder,
      handleSave: this.saveReminder
    });
  }

  dateInit = date => {
    return MomentTZ(date)
      .tz("America/Los_Angeles")
      .format("LL");
  };

  timeInit = time => {
    return MomentTZ(time)
      .tz("America/Los_Angeles")
      .format("hh:mm A");
  };

  _showDatePicker = () => this.setState({ isDatePickerVisible: true });
  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });
  _handleDatePicked = date => {
    this.setState({
      dateText: this.dateInit(date)
    });
    this._hideDatePicker();
  };

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });
  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });
  _handleTimePicked = time => {
    this.setState({
      timeText: this.timeInit(time)
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

    let CURRENT_KEY;

    if (this.state.reminderKey !== "") {
      CURRENT_KEY = this.state.reminderKey;
    } else {
      CURRENT_KEY = Math.round(new Date().getTime() / 1000).toString();
    }

    AsyncStorage.setItem(CURRENT_KEY, JSON.stringify(reminderObject)).done(
      () => {
        Alert.alert(
          "Saved",
          "Reminder added successfully",
          [
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
      }
    );
  };

  deleteReminder = () => {
    AsyncStorage.removeItem(this.state.reminderKey).done(() => {
      Alert.alert(
        "Delete",
        "Reminder deleted successfully",
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

  _handleModalText = text => {
    this.setState({
      selectRepeatType: text,
      repeatType: false
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
              placeholderText="Enter your text"
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

            <RepeatSwitchView
              value={this.state.switchValue}
              onValueChange={this._handleToggleSwitch}
              repeatInterval={this.state.repeatInterval}
              selectRepeatType={this.state.selectRepeatType}
            />

            <RepeatInterval
              switchValue={this.state.switchValue}
              repeatInterval={this.state.repeatInterval}
              onPress={() => this.setState({ open: true })}
              text="Repetition Interval"
            />

            <RepeatInterval
              switchValue={this.state.switchValue}
              repeatInterval={this.state.repeatInterval}
              selectRepeatType={this.state.selectRepeatType}
              onPress={() => this.setState({ repeatType: true })}
              text="Types of Repeats"
            />

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
                keyboardType="numeric"
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
              <ModalButton onPress={() => null} text="Select Repetition Type" />
              <ModalButton
                onPress={() => this._handleModalText("Minute")}
                text="Minute"
              />
              <ModalButton
                onPress={() => this._handleModalText("Hour")}
                text="Hour"
              />
              <ModalButton
                onPress={() => this._handleModalText("Day")}
                text="Day"
              />
              <ModalButton
                onPress={() => this._handleModalText("Week")}
                text="Week"
              />
              <ModalButton
                onPress={() => this._handleModalText("Month")}
                text="Month"
              />
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

  topView: {
    backgroundColor: "#65799b",
    flex: 1,
    justifyContent: "flex-end"
  },

  bottomView: {
    flex: 2,
    justifyContent: "space-around"
  }
});

export default AddReminder;
