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
import DeleteIcon from "react-native-vector-icons/MaterialCommunityIcons";

class AddReminder extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <TouchableOpacity onPress={() => params.handleRemove()}>
          <DeleteIcon color="white" size={26} name="delete" />
        </TouchableOpacity>
      ),

      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#374046",
        elevation: null
      }
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({ handleRemove: this.deleteReminder });
  }

  deleteReminder = () => {
    console.log('reminder')
  };

  state = {
    text: " ",
    isDatePickerVisible: false,
    isTimePickerVisible: false
  };

  _showDatePicker = () => this.setState({ isDatePickerVisible: true });
  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });
  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this._hideDatePicker();
  };

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });
  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });
  _handleTimePicked = time => {
    console.log("A time has been picked: ", time);
    this._hideTimePicker();
  };

  onChangeRepeat = () => {};

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topView}>
          <TextInput
            style={styles.inputText}
            placeholder="Enter your text"
            onChangeText={text => this.setState({ text })}
            editable={true}
            multiline={true}
            maxLength={40}
            placeholderTextColor="white"
            autoCorrect={false}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
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
              <Text style={{ fontSize: 15, color: "white" }}>DateText</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateTimePickerRow}
            onPress={this._showTimePicker}
          >
            <Icon color="white" size={26} name="ios-time-outline" />
            <View style={styles.dateContent}>
              <Text style={{ fontSize: 15, color: "white" }}>Time</Text>
              <Text style={{ fontSize: 15, color: "white" }}>TimeText</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.repeatRow}>
            <View style={{ flexDirection: "row" }}>
              <Icon color="white" size={26} name="ios-repeat" />

              <View style={{ marginLeft: 45 }}>
                <Text style={{ fontSize: 15, color: "white" }}>Repeat</Text>
                <Text style={{ fontSize: 15, color: "white" }}>
                  Every 2 days
                </Text>
              </View>
            </View>

            <Switch
              value={true}
              disabled={false}
              onValueChange={this.onChangeRepeat}
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
              <Text style={{ fontSize: 15, color: "white" }}>2</Text>
            </View>
          </View>

          <DateTimePicker
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDatePicker}
            mode="date"
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
    marginBottom: 10
  },
  dateTimePickerRow: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 20,
    marginTop: 20
    // backgroundColor: "red"
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
    //  backgroundColor: "red"
    //height: 100,
    //alignItems: "center"
  }
});

export default AddReminder;
