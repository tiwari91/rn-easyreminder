import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { List, Avatar } from 'react-native-elements';

import PropTypes from 'prop-types';
import NotifyIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const ListItem = ({ renderData }) => (
  <List containerStyle={{ borderTopWidth: 1, marginTop: 0 }}>
    <FlatList
      data={renderData}
      renderItem={({ item }) => (
        <View style={styles.listContainer}>
          <View style={styles.listLeft}>
            <Avatar medium rounded title={item.title.charAt(0)} />
            <View style={styles.contentDetail}>
              <Text style={styles.textContent}>{item.title}</Text>
              <Text style={styles.textContent}>{item.date}</Text>
              <Text style={styles.textContent}>{item.duration}</Text>
            </View>
          </View>

          <View style={styles.icon}>
            {item.notify === false ? (
              <TouchableOpacity>
                <NotifyIcon color="white" size={20} name="notifications-off" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <NotifyIcon color="white" size={20} name="notifications" />
              </TouchableOpacity>
            )}
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

ListItem.propTypes = {
  renderData: PropTypes.array.isRequired,
};

export default ListItem;
