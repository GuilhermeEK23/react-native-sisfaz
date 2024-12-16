import React, { useEffect, useState } from "react";
import {
  Text,
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
import ProductServices from "../services/ProductServices";
import GroupServices from "../services/GroupServices";

const ComandaMesa = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [subGroups, setSubGroups] = useState([]);
  const [selectedGroupHasSubGroup, setSelectedGroupHasSubGroup] =
    useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProductsData = await ProductServices.requestAllProducts();
      setAllProducts(allProductsData || []);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      const filteredProducts = allProducts.filter((product) =>
        product.Description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  }, [searchTerm, allProducts]);

  useEffect(() => {
    if (selectedGroup !== null) {
      const filteredProducts = allProducts.filter(
        (product) => product.IdGroup === selectedGroup
      );
      console.log(filteredProducts);
      setProducts(filteredProducts);
    }
  }, [selectedGroup]);

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleGroupClick = (group) => {
    setSearchTerm("");
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
              {products.length > 0 ? (
                products
                  .filter((product) =>
                    product.Description.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    )
                  )
                  .map((product, key) => (
                    <ProductItem
                      key={key}
                      product={product}
                      handleProductPress={handleProductPress}
                    />
                  ))
              ) : (
                <Text style={styles.noProductsText}>
                  Nenhum produto encontrado
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <GroupList
          handleGroupClick={handleGroupClick}
          handleSubGroupClick={handleSubGroupClick}
          selectedGroupHasSubGroup={selectedGroupHasSubGroup}
          allGroups={allGroups}
          setAllGroups={setAllGroups}
          setSubGroups={setSubGroups}
          subGroups={subGroups}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
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
