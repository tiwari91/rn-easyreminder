import React from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { List, ListItem, Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: "a",
          title: "Learn French",
          date: "01-08-2018 01:00pm",
          duration: "Every 5 min",
          avatar: "avatar"
        },
        {
          key: "b",
          title: "Take the dog to park",
          date: "01-09-2018 03:00pm",
          duration: "Every 2 day",
          avatar: "avatar"
        }
      ]
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navbar}>
          <Text style={{ color: "white" }}>Reminder</Text>
          <TouchableOpacity>
            <Icon size={22} name="md-more" />
          </TouchableOpacity>
        </View>

        <List containerStyle={{ borderTopWidth: 1, marginTop: 0 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <View style={styles.listContainer}>
                <View style={styles.listLeft}>
                  <Avatar medium rounded title="MT" />
                  <View style={styles.contentDetail}>
                    <Text style={styles.textContent}>{item.title}</Text>
                    <Text style={styles.textContent}>{item.date}</Text>
                    <Text style={styles.textContent}>{item.duration}</Text>
                  </View>
                </View>

                <View style={styles.icon}>
                  <TouchableOpacity>
                    {/* <Icon name="notifications" /> */}
                    <Icon size={22} name="ios-notifications-outline" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={item => item.key}
            ItemSeparatorComponent={() => (
              <View style={{ height: 0.5, backgroundColor: "#E5E5E5" }} />
            )}
          />
        </List>

        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => console.log("create new reminder")}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    height: 55,
    backgroundColor: "#57ca85",
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between"
  },

  container: {
    flex: 1
  },

  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15
    //backgroundColor: "#5D6874"
  },

  listLeft: {
    marginTop: 12,
    flexDirection: "row",
    marginBottom: 10
  },

  contentDetail: {
    marginLeft: 8,
    paddingHorizontal: 12
  },

  textContent: {
    //color: "white",
    fontSize: 14,
    paddingTop: 5
  },

  icon: {
    alignItems: "flex-end",
    marginTop: 12
  },

  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
