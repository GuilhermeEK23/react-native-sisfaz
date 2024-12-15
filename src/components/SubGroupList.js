import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import GroupItem from "./GroupItem";

const SubGroupList = ({ subGroups, handleSubGroupClick, onClose }) => {
  return (
    <View style={styles.subGroupContainer}>
      {/* Contêiner do texto e botão de fechar */}
      <View style={styles.closeButtonContainer}>
        <Text style={styles.closeButtonText}>Sub-grupos</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButtonIcon}>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        style={styles.subGroupScroll}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.subGroupContentContainer}
      >
        <TouchableWithoutFeedback>
          <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
            {subGroups.map((subGroup) => (
              <GroupItem
                key={subGroup.IdGroup}
                group={subGroup}
                onPress={handleSubGroupClick}
              />
            ))}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default SubGroupList;

const styles = StyleSheet.create({
  subGroupContainer: {
    position: "relative",
    alignItems: "center",
  },
  closeButtonContainer: {
    flexDirection: "row", // Coloca o texto e o ícone lado a lado
    alignItems: "center", // Centraliza verticalmente
    backgroundColor: "#fff", // Fundo branco
    paddingVertical: 5, // Espaçamento vertical
    paddingHorizontal: 10, // Espaçamento horizontal
    borderRadius: 8, // Bordas arredondadas
    elevation: 5, // Sombras para destaque no Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 10, // Distância dos elementos abaixo
    alignSelf: "center", // Posiciona o contêiner na extremidade direita
  },
  closeButtonText: {
    color: "#000",
    fontSize: 14,
    marginRight: 8,
  },
  closeButtonIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  subGroupScroll: {
    marginTop: 10,
  },
  subGroupItemContainer: {
    alignItems: "center",
    width: 70,
    marginHorizontal: 5,
  },
  subGroupItem: {
    width: 50,
    height: 50,
    backgroundColor: "#5B9A55",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#5B9A55",
    borderWidth: 1,
  },
  subGroupText: {
    marginTop: 5,
    color: "#333",
    fontSize: 12,
    textAlign: "center",
  },
});
