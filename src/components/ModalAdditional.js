import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

const ModalAdditional = ({ modalVisible, setModalVisible }) => {
  const [adicionais, setAdicionais] = useState([
    { id: 1, name: "Copo", quantity: 1 },
    { id: 2, name: "Prato", quantity: 1 },
    { id: 3, name: "Talher", quantity: 1 },
    { id: 4, name: "Talher", quantity: 1 },
    { id: 5, name: "Talher", quantity: 1 },
    { id: 6, name: "Talher", quantity: 1 },
    { id: 7, name: "Talher", quantity: 1 },
    { id: 8, name: "Talher", quantity: 1 },
    { id: 9, name: "Talher", quantity: 1 },
    { id: 10, name: "Talher", quantity: 1 },
    { id: 11, name: "Talher", quantity: 1 },
    { id: 12, name: "Talher", quantity: 1 },
    { id: 13, name: "Talher", quantity: 1 },
    { id: 14, name: "Talher", quantity: 1 },
  ]);

  const handleAdicionalIncrement = (adicionalId) => {
    setAdicionais(
      adicionais.map((adicional) =>
        adicional.id === adicionalId
          ? { ...adicional, quantity: adicional.quantity + 1 }
          : adicional
      )
    );
  };

  const handleAdicionalDecrement = (adicionalId) => {
    setAdicionais(
      adicionais.map((adicional) =>
        adicional.id === adicionalId && adicional.quantity > 0
          ? { ...adicional, quantity: adicional.quantity - 1 }
          : adicional
      )
    );
  };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        {/* O TouchableWithoutFeedback captura o toque fora do modal */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalDismissArea} />
        </TouchableWithoutFeedback>

        {/* Conteúdo do modal */}
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Adicionais</Text>

          {/* ScrollView para garantir o scroll nos adicionais */}
          <ScrollView
            style={styles.adicionaisList}
            showsVerticalScrollIndicator={false}
          >
            {adicionais.map((adicional) => (
              <View key={adicional.id} style={styles.tableRow}>
                <Text style={styles.productName}>{adicional.name}</Text>
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    style={styles.decrementButton}
                    onPress={() => handleAdicionalDecrement(adicional.id)}
                  >
                    <Text style={styles.controlText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{adicional.quantity}</Text>
                  <TouchableOpacity
                    style={styles.incrementButton}
                    onPress={() => handleAdicionalIncrement(adicional.id)}
                  >
                    <Text style={styles.controlText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeModalText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalDismissArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  adicionaisList: {
    maxHeight: 250, // Ajuste a altura conforme necessário
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  productName: {
    flex: 2,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    marginLeft: "20%",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  decrementButton: {
    backgroundColor: "#FF6347",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  incrementButton: {
    backgroundColor: "#5A9A55",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  controlText: {
    color: "#fff",
    fontSize: 18,
  },
  quantityText: {
    fontSize: 16,
    color: "#333",
  },
  closeModalButton: {
    backgroundColor: "#5A9A55",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  closeModalText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ModalAdditional;
