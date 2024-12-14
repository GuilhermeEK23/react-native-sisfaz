import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import GroupItem from "./GroupItem";
import SubGroupList from "./SubGroupList";
import { requestGroups, requestSubGroups } from "../services/GroupServices";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [subGroups, setSubGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await requestGroups();
      setGroups(response);
    };

    fetchGroups();
  }, []);

  const handleGroupClick = async (group) => {
    if (selectedGroup === group.id) {
      // Fecha os subgrupos se o grupo já estiver selecionado
      setSelectedGroup(null);
      setSubGroups([]);
    } else {
      // Seleciona novo grupo e carrega os subgrupos
      setSelectedGroup(group.id);
      const response = await requestSubGroups(group.id);
      setSubGroups(response);
    }
  };

  const handleCloseSubGroups = () => {
    // Fecha os subgrupos e redefine o grupo selecionado
    setSelectedGroup(null);
    setSubGroups([]);
  };

  return (
    <View style={styles.container}>
      {selectedGroup && (
        <>
          <SubGroupList subGroups={subGroups} onClose={handleCloseSubGroups} />
          <View style={styles.divider} />
        </>
      )}

      <ScrollView
        horizontal
        style={styles.groupScroll}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.groupContentContainer}
      >
        <TouchableWithoutFeedback>
          <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
            {groups.map((group) => (
              <GroupItem
                key={group.id}
                group={group}
                onPress={handleGroupClick}
              />
            ))}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default GroupList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9E9E9",
    paddingVertical: 15,
  },
  groupScroll: {
    marginBottom: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "#00000020",
    marginVertical: 10,
  },
});
