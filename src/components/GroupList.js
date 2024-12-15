import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import GroupItem from "./GroupItem";
import SubGroupList from "./SubGroupList";
import GroupServices from "../services/GroupServices";

const GroupList = () => {
  const [allGroups, setAllGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [subGroups, setSubGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroupHasSubGroup, setSelectedGroupHasSubGroup] =
    useState(false);

  useEffect(() => {
    const fetchAllGroups = async () => {
      const allGroups = await GroupServices.requestAllGroups();
      setAllGroups(allGroups);
    };

    fetchAllGroups();
  }, []);

  useEffect(() => {
    const groups = GroupServices.filterGroups(allGroups);
    setGroups(groups);
  }, [allGroups]);

  const handleGroupClick = (group) => {
    if (selectedGroup === group.IdGroup) {
      // Fecha os subgrupos se o grupo já estiver selecionado
      setSelectedGroup(null);
      setSubGroups([]);
    } else {
      // Seleciona novo grupo e carrega os subgrupos
      setSelectedGroup(group.IdGroup);
      const subGroups = GroupServices.filterSubGroups(allGroups, group.IdGroup);
      if (subGroups.length > 0) {
        setSelectedGroupHasSubGroup(true);
        setSubGroups(subGroups);
      } else setSelectedGroupHasSubGroup(false);
    }
  };

  const handleSubGroupClick = (subGroup) => {
    setSelectedGroup(subGroup.IdGroup);
  };

  const handleCloseSubGroups = () => {
    // Fecha os subgrupos e redefine o grupo selecionado
    setSelectedGroup(null);
    setSubGroups([]);
  };

  return (
    <View style={styles.container}>
      {selectedGroup && selectedGroupHasSubGroup && (
        <>
          <SubGroupList
            subGroups={subGroups}
            onClose={handleCloseSubGroups}
            handleSubGroupClick={handleSubGroupClick}
          />
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
            {groups.length > 0 ? (
              groups.map((group) => (
                <GroupItem
                  key={group.IdGroup}
                  group={group}
                  onPress={handleGroupClick}
                />
              ))
            ) : (
              <Text>Nenhum grupo encontrado</Text>
            )}
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
