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
  Button
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

import Icon from "react-native-vector-icons/Ionicons";
import ChevronIcon from "react-native-vector-icons/EvilIcons";
import NavIcon from "react-native-vector-icons/MaterialCommunityIcons";
import NotifyIcon from "react-native-vector-icons/MaterialIcons";
import ActionButton from "react-native-action-button";

import Moment from "moment";
import { Dropdown } from "react-native-material-dropdown";
import { AsyncStorage } from "react-native";

const REMINDER_KEY = "@MySuperStore:reminderKey";

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
    dateText: "",
    timeText: "",

    todayDate: Moment().format("LL"),
    isDatePickerVisible: false,
    isTimePickerVisible: false,

    upIntervalCount: 0,
    switchValue: true,
    repeatDays: 0,

    notify: false,
    repeatInterval: 0
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
    //console.log("A date has been picked: ", date);
    this.setState({
      dateText: date
    });
    this._hideDatePicker();
  };

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });
  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });
  _handleTimePicked = time => {
    //console.log("A time has been picked: ", time);
    this.setState({
      timeText: time
    });
    this._hideTimePicker();
  };

  upCount = () => {
    this.setState({
      upIntervalCount: this.state.upIntervalCount + 1
    });
  };

  downCount = () => {
    if (this.state.upIntervalCount <= 0) {
      this.setState({
        upIntervalCount: 0
      });
    } else {
      this.setState({
        upIntervalCount: this.state.upIntervalCount - 1
      });
    }
  };

  _handleToggleSwitch = () => {
    this.setState({ switchValue: !this.state.switchValue });
  };

  _handlePickerVal = (itemValue, itemIndex) => {
    this.setState({
      repeatInterval: itemValue
    });
    console.log(itemValue, itemIndex);
  };

  deleteReminder = () => {
    console.log("delete reminder");
  };

  saveReminder = async () => {
    console.log("save reminder");

    console.log("textInput", this.state.text);
    console.log("notify", this.state.notify);
    console.log("date", this.state.dateText);
    console.log("time", this.state.timeText);
    console.log("repeatInterval", this.state.repeatInterval);
    console.log("upIntervalCount", this.state.upIntervalCount);

    let reminderObject = {
      inputText: this.state.text,
      notify: this.state.notify,
      date: this.state.dateText,
      time: this.state.timeText,
      repeatInterval: this.state.repeatInterval,
      upIntervalCount: this.state.upIntervalCount
    };

    AsyncStorage.getItem(REMINDER_KEY, (err, result) => {
      console.log(result);
      // if (result === null) {
      //   AsyncStorage.setItem(
      //     "@MySuperStore:reminderKey",
      //     JSON.stringify(reminderObject)
      //   );
      // }
    });
  };

  _handleNotification = () => {
    this.setState({
      notify: !this.state.notify
    });
  };

  render() {
    Moment.locale("en");

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
                  ? Moment(this.state.dateText).format("LL")
                  : this.state.todayDate}
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
                  ? Moment(this.state.timeText).format("hh:mm A")
                  : Moment(new Date(this.state.todayDate)).format("hh:mm A")}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.repeatRow}>
            <View style={{ flexDirection: "row" }}>
              <Icon color="white" size={26} name="ios-repeat" />
              <View
                style={{
                  width: 96,
                  height: 20,
                  marginLeft: 45,
                  top: -30
                }}
                pointerEvents={this.state.switchValue === true ? null : "none"}
              >
                <Dropdown
                  onChangeText={this._handlePickerVal}
                  label="Repeat"
                  textColor="white"
                  baseColor="white"
                  itemColor="white"
                  pickerStyle={{ backgroundColor: "#374046" }}
                  data={[
                    {
                      value: "1"
                    },
                    {
                      value: "2"
                    },
                    {
                      value: "3"
                    }
                  ]}
                />
              </View>
            </View>

            <Switch
              value={this.state.switchValue}
              disabled={false}
              onValueChange={this._handleToggleSwitch}
            />
          </View>

          <View style={styles.dateTimePickerRow}>
            <View>
              <TouchableOpacity onPress={this.upCount}>
                <ChevronIcon color="white" size={20} name="chevron-up" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.downCount}>
                <ChevronIcon color="white" size={20} name="chevron-down" />
              </TouchableOpacity>
            </View>

            <View style={styles.dateContent}>
              <Text style={{ fontSize: 15, color: "white" }}>
                Repetition Interval
              </Text>
              <Text style={{ fontSize: 15, color: "white" }}>
                {this.state.upIntervalCount}
              </Text>
            </View>
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#374046"
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
