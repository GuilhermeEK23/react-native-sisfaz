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

const GroupList = ({
  handleGroupClick,
  handleSubGroupClick,
  selectedGroupHasSubGroup,
  allGroups,
  setAllGroups,
  subGroups,
  setSubGroups,
  selectedGroup,
  setSelectedGroup,
}) => {
  const [groups, setGroups] = useState([]);

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
