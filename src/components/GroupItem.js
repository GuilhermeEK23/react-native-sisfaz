import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const GroupItem = ({ group, onPress }) => {
  return (
    <View style={styles.groupItemContainer}>
      <TouchableOpacity style={styles.groupItem} onPress={() => onPress(group)}>
        <Image
          source={{ uri: group.Image }}
          style={{ width: 60, height: 60, borderRadius: 10 }}
        />
      </TouchableOpacity>
      <Text style={styles.groupText}>{group.Description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupItemContainer: {
    alignItems: "center",
    width: 70,
    marginHorizontal: 5,
  },
  groupItem: {
    width: 60,
    height: 60,
    backgroundColor: "#5B9A55",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  groupText: {
    marginTop: 5,
    color: "#000",
    fontSize: 12,
    textAlign: "center",
  },
});

export default GroupItem;
