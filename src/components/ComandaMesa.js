import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Importando os componentes personalizados
import GroupList from "./GroupList";
import { HeaderContext } from "./HeaderContext";

const { width, height } = Dimensions.get("window");

const ComandaMesa = ({ navigation }) => {
  const { resetMenuHeader } = useContext(HeaderContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [observationTerm, setObservationTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [optionalsVisible, setOptionalsVisible] = useState(false);
  const [optionals, setOptionals] = useState([
    { id: 1, name: "Adicional de Carne", price: 6.0, quantity: 0 },
    { id: 2, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 3, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 4, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 5, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 6, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 7, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 8, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 9, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 10, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 11, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 12, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 13, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 14, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 15, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
  ]);

  const staticProducts = [
    { id: 1, name: "Refrigerante", price: 5.0 },
    { id: 2, name: "Suco de Laranja", price: 7.0 },
    { id: 3, name: "Cerveja Pilsen", price: 10.0 },
    { id: 4, name: "Água com Gás", price: 3.0 },
    { id: 5, name: "Vinho Tinto", price: 25.0 },
    { id: 6, name: "Café Expresso", price: 4.0 },
    { id: 7, name: "Chá Gelado", price: 6.0 },
    { id: 8, name: "Água Sem Gás", price: 2.5 },
    { id: 9, name: "Milkshake", price: 12.0 },
    { id: 10, name: "Whisky", price: 30.0 },
    { id: 11, name: "Água", price: 30.0 },
    { id: 12, name: "Água", price: 30.0 },
    { id: 13, name: "Água", price: 30.0 },
    { id: 14, name: "Água", price: 30.0 },
    { id: 15, name: "Água", price: 30.0 },
    { id: 16, name: "Água", price: 30.0 },
    { id: 17, name: "Água", price: 30.0 },
    { id: 18, name: "Água", price: 30.0 },
    { id: 19, name: "Água", price: 30.0 },
    { id: 20, name: "Água", price: 30.0 },
    { id: 21, name: "Água", price: 30.0 },
    { id: 22, name: "Água", price: 30.0 },
    { id: 23, name: "Água", price: 30.0 },
    { id: 24, name: "Água", price: 30.0 },
    { id: 25, name: "Água", price: 30.0 },
    { id: 26, name: "Água", price: 30.0 },
    { id: 27, name: "Água", price: 30.0 },
    { id: 28, name: "Água", price: 30.0 },
    { id: 29, name: "Água", price: 30.0 },
    { id: 30, name: "Água", price: 30.0 },
    { id: 32, name: "Água", price: 30.0 },
    { id: 33, name: "Água", price: 30.0 },
    { id: 34, name: "Água", price: 30.0 },
    { id: 35, name: "Água", price: 30.0 },
    { id: 36, name: "Água", price: 30.0 },
    { id: 37, name: "Água", price: 30.0 },
  ];

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalVisible(true);
    setOptionalsVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

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
        optional.id === optionalId
          ? { ...optional, quantity: optional.quantity + 1 }
          : optional
      )
    );
  };
  const decrementOptional = (optionalId) => {
    setOptionals((prevOptionals) =>
      prevOptionals.map((optional) =>
        optional.id === optionalId && optional.quantity > 0
          ? { ...optional, quantity: optional.quantity - 1 }
          : optional
      )
    );
  };
  const calculateTotal = () => {
    let productTotal = selectedProduct ? selectedProduct.price * quantity : 0;
    let optionalsTotal = optionals.reduce(
      (acc, optional) => acc + optional.price * optional.quantity,
      0
    );
    return (productTotal + optionalsTotal).toFixed(2);
  };
  const handleAddToCart = () => {
    console.log(
      `Adicionado: ${
        selectedProduct.name
      }, Quantidade: ${quantity}, Total: R$ ${calculateTotal()}`
    );
    handleCloseModal();
  };
  const handleOptionals = () => {
    setOptionalsVisible(!optionalsVisible);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        resetMenuHeader();
      }}
    >
      <View style={styles.contentArea}>
        <View style={styles.squareContainer}>
          {/* Search input com ícone de pesquisa fora do input */}
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchIconWrapper}>
              <Icon name="magnify" size={24} color="#5B9A55" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Pesquisar produtos..."
              placeholderTextColor="#888"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {/* Grid de produtos */}
          <ScrollView
            style={styles.productContainer}
            showsVerticalScrollIndicator={false}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
                resetMenuHeader();
              }}
            >
              <View style={styles.productGrid}>
                {staticProducts
                  .filter((product) =>
                    product.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((product) => (
                    <TouchableOpacity
                      key={product.id}
                      style={styles.productSquare}
                      onPress={() => handleProductPress(product)}
                    >
                      <Text style={styles.productText}>{product.name}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
          <GroupList />
        </View>

        {/* Modal para o produto selecionado */}
        {selectedProduct && (
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
                      {selectedProduct.name}
                    </Text>
                    <Text style={styles.modalPrice}>
                      R$ {selectedProduct.price.toFixed(2)}
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

                    <Text style={styles.totalText}>
                      Total: R$ {calculateTotal()}
                    </Text>

                    {/* Opcionais */}
                    {optionalsVisible && (
                      <ScrollView style={styles.optionalsContainer}>
                        <View style={styles.optionalsContainer}>
                          <Text style={styles.optionalsTitle}>Opcionais</Text>
                          {optionals.map((optional) => (
                            <TouchableWithoutFeedback key={optional.id}>
                              <View style={styles.optionalRow}>
                                <Text style={styles.optionalName}>
                                  {optional.name}
                                </Text>
                                <Text style={styles.optionalPrice}>
                                  R$ {optional.price.toFixed(2)}
                                </Text>
                                <View style={styles.quantityContainer}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      decrementOptional(optional.id)
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
                                      incrementOptional(optional.id)
                                    }
                                    style={styles.quantityButton}
                                  >
                                    <Text style={styles.quantityText}>+</Text>
                                  </TouchableOpacity>
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
                        <Text style={styles.optionalsButtonText}>
                          Opcionais
                        </Text>
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
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // ícone à esquerda e input à direita
    marginVertical: 8,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 16,
  },
  searchIconWrapper: {
    backgroundColor: "#fff",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    fontSize: 16,
    width: "85%", // Ajustado para ocupar o espaço à direita
  },
  contentArea: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Fundo para melhor visualização
  },
  productContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20, // Ajustado para melhor espaçamento
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  productSquare: {
    backgroundColor: "#5B9A55",
    width: width / 4.5 - 15,
    height: width / 4.5 - 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  productText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },

  groupText: {
    color: "#000",
    textAlign: "center",
    fontSize: 12,
    marginTop: 5,
    width: "100%",
    flexWrap: "wrap",
  },
  squareContainer: {
    flex: 1,
  },
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
  optionalName: {
    fontSize: 14, // Diminuir a fonte do nome do opcional
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

export default ComandaMesa;
