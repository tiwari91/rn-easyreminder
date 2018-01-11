import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { List, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

class ListItem extends React.Component {
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
                  <Icon size={26} name="ios-notifications-outline" />
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
    );
  }
}

export default ListItem;
