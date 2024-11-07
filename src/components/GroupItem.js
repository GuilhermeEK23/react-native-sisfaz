import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GroupItem = ({ group, onPress }) => {
  return (
    <View style={styles.groupItemContainer}>
      <TouchableOpacity style={styles.groupItem} onPress={() => onPress(group)}>
        <Icon name={group.icon || "food"} size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.groupText}>{group.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupItemContainer: {
    alignItems: 'center',
    width: 70,
    marginHorizontal: 5,
  },
  groupItem: {
    width: 50,
    height: 50,
    backgroundColor: '#5B9A55',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  groupText: {
    marginTop: 5,
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default GroupItem;
