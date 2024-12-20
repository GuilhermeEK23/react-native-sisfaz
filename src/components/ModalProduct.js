import { useContext, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { OptionalServices } from "../services/OptionalServices";
import { OrderContext } from "./OrderContext";

const ModalProduct = ({ modalVisible, handleCloseModal, selectedProduct }) => {
  const [observationTerm, setObservationTerm] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [optionalsVisible, setOptionalsVisible] = useState(false);
  const [optionals, setOptionals] = useState([]);
  const { order, setOrder } = useContext(OrderContext);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementOptional = (optionalId) => {
    setOptionals((prevOptionals) =>
      prevOptionals.map((optional) =>
        optional.IdProductGrill === optionalId
          ? { ...optional, quantity: optional.quantity + 1 }
          : optional
      )
    );
  };
  const decrementOptional = (optionalId) => {
    setOptionals((prevOptionals) =>
      prevOptionals.map((optional) =>
        optional.IdProductGrill === optionalId && optional.quantity > 0
          ? { ...optional, quantity: optional.quantity - 1 }
          : optional
      )
    );
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...selectedProduct,
      idProductInOrder: uuidv4(),
      quantity,
      Observations: observationTerm,
      optionals: optionals.filter((optional) => optional.quantity > 0),
    };
    setOrder({ ...order, products: [...order.products, productToAdd] });

    handleCloseModal();
  };
  const handleOptionals = async () => {
    if (optionalsVisible) {
      setOptionalsVisible(false);
    } else if (optionals.length > 0) {
      setOptionalsVisible(true);
    } else {
      setOptionalsVisible(!optionalsVisible);
      const optional = await OptionalServices.requestOptionalsByProduct(
        selectedProduct.IdProduct
      );
      setOptionals(optional.map((opt) => ({ ...opt, quantity: 0 })));
    }
  };

  const calculateTotal = () => {
    let productTotal = selectedProduct
      ? selectedProduct.SalePrice * quantity
      : 0;
    let optionalsTotal = optionals.reduce(
      (acc, optional) => acc + optional.SalePrice * optional.quantity,
      0
    );
    return (productTotal + optionalsTotal * quantity)
      .toFixed(2)
      .replace(".", ",");
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={[styles.modalContainer, { top: "10%" }]}>
              <Text style={styles.modalTitle}>
                {selectedProduct.Description}
              </Text>
              <Text style={styles.modalPrice}>
                R$ {selectedProduct.SalePrice.toFixed(2).replace(".", ",")}
              </Text>

              {/* Controle de quantidade */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={decrementQuantity}
                  style={styles.quantitysubButton}
                >
                  <Text style={styles.quantitysubText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityNumber}>{quantity}</Text>
                <TouchableOpacity
                  onPress={incrementQuantity}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.totalText}>Total: R$ {calculateTotal()}</Text>

              {/* Opcionais */}
              {optionalsVisible && (
                <ScrollView style={styles.optionalsContainer}>
                  <View style={styles.optionalsContainer}>
                    <Text style={styles.optionalsTitle}>Opcionais</Text>
                    {optionals.map((optional) => (
                      <TouchableWithoutFeedback key={optional.IdProductGrill}>
                        <View style={styles.optionalRow}>
                          <Text style={styles.optionalName}>
                            {optional.Description}
                          </Text>
                          <View style={styles.optionalPriceContainer}>
                            <Text style={styles.optionalPrice}>
                              R$ {optional.SalePrice.toFixed(2)}
                            </Text>
                            <View style={styles.quantityContainer}>
                              <TouchableOpacity
                                onPress={() =>
                                  decrementOptional(optional.IdProductGrill)
                                }
                                style={styles.quantitysubButton}
                              >
                                <Text style={styles.quantityText}>-</Text>
                              </TouchableOpacity>
                              <Text style={styles.quantityNumber}>
                                {optional.quantity}
                              </Text>
                              <TouchableOpacity
                                onPress={() =>
                                  incrementOptional(optional.IdProductGrill)
                                }
                                style={styles.quantityButton}
                              >
                                <Text style={styles.quantityText}>+</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    ))}

                    {/* Input de observações */}
                    <TextInput
                      style={styles.observationsInput}
                      placeholder="Observações (opcional)"
                      placeholderTextColor="#888"
                      value={observationTerm}
                      onChangeText={setObservationTerm}
                    />
                  </View>
                </ScrollView>
              )}

              {/* Botões */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  onPress={handleOptionals}
                  style={styles.optionalsButton}
                >
                  <Text style={styles.optionalsButtonText}>Opcionais</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleAddToCart}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flexGrow: 1,
    justifyContent: "flex-end",
    marginBottom: "16%", // Ajustado para melhor visualização
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%", // Definir uma largura menor para o modal
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10, // Reduzir o padding horizontal
    paddingVertical: 15, // Reduzir o padding vertical
    alignItems: "center",
    justifyContent: "flex-start", // Garantir que os elementos fiquem compactos no topo
  },

  modalTitle: {
    fontSize: 16, // Reduzir o tamanho do texto do título
    fontWeight: "bold",
    marginBottom: 5, // Diminuir a margem inferior
  },
  modalPrice: {
    fontSize: 14, // Reduzir o tamanho do preço
    marginBottom: 5, // Diminuir o espaçamento inferior
    color: "#333",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5, // Diminuir a distância entre o seletor de quantidade e o total
  },
  quantityButton: {
    backgroundColor: "#5B9A55",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  quantitysubButton: {
    backgroundColor: "#FF6347",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  quantitysubText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  quantityNumber: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 14, // Reduzir o tamanho do texto total
    fontWeight: "bold",
    marginBottom: 10, // Reduzir a margem inferior
    color: "#333",
  },
  optionalsContainer: {
    width: "100%",
  },
  optionalsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5, // Garantir um espaçamento melhor entre os itens
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  optionalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  optionalName: {
    fontSize: 14, // Diminuir a fonte do nome do opcional
    maxWidth: "48%",
  },
  optionalPrice: {
    fontSize: 14,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  optionalsButton: {
    backgroundColor: "#5B9A55",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  optionalsButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#5B9A55",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  optionalsContainer: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#ddd",
    height: "40%", // Ajustar a altura do container
  },
  observationsInput: {
    marginTop: 10,
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    height: 50, // Ajuste de altura para multiline
    textAlignVertical: "center", // Garantir que o texto comece no topo
  },
});

export default ModalProduct;
