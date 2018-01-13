import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { List, Avatar } from 'react-native-elements';
import NotifyIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const REMINDER_KEY_OBJ = 'reminderKeyObj';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getAllKeys().then((keys) => {
      keys.forEach((element) => {
        // console.log(element);
        if (element !== REMINDER_KEY_OBJ) {
          AsyncStorage.getItem(element)
            .then(JSON.parse)
            .then((response) => {
              this.setState({
                data: this.state.data.concat({
                  key: element,
                  title: response.inputText,
                  date: `${response.date} ${response.time}`,
                  duration: `Every ${response.repeatInterval} days`,
                  notify: response.notify,
                  avatar: 'avatar',
                }),
              });
            });
        }
      });
    });
  }

  render() {
    const renderData = this.state.data;
    return (
      <List containerStyle={{ borderTopWidth: 1, marginTop: 0 }}>
        <FlatList
          data={renderData}
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
                {item.notify === false ?
                  <TouchableOpacity>
                    <NotifyIcon
                      color="white"
                      size={20}
                      name="notifications-off"
                    />
                  </TouchableOpacity> :
                  <TouchableOpacity>
                    <NotifyIcon
                      color="white"
                      size={20}
                      name="notifications"
                    />
                  </TouchableOpacity>
                }


              </View>
            </View>
          )}
          keyExtractor={item => item.key}
          ItemSeparatorComponent={() => (
            <View style={{ height: 0.5, backgroundColor: '#E5E5E5' }} />
          )}
        />
      </List>
    );
  }
}

export default ListItem;
