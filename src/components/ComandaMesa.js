import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Importando os componentes personalizados
import GroupList from "./GroupList";
import { ProductItem } from "./ProductItem";
import ModalProduct from "./ModalProduct";

const ComandaMesa = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  return (
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
          <TouchableWithoutFeedback>
            <View style={styles.productGrid}>
              {staticProducts
                .filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product, key) => (
                  <ProductItem
                    key={key}
                    product={product}
                    handleProductPress={handleProductPress}
                  />
                ))}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <GroupList />
      </View>

      {/* Modal para o produto selecionado */}
      {selectedProduct && (
        <ModalProduct
          modalVisible={modalVisible}
          handleCloseModal={handleCloseModal}
          selectedProduct={selectedProduct}
        />
      )}
    </View>
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
});

export default ComandaMesa;
