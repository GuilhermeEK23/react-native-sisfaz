import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ModalAdditional from "./ModalAdditional";
import { OrderContext } from "./OrderContext";

const ConfirmarFechamento = ({ navigation }) => {
  const { order, setOrder } = useContext(OrderContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleIncrement = (productId) => {
    setOrder({
      ...order,
      products: order.products.map((product) =>
        product.IdProduct === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ),
    });
  };

  const handleDecrement = (productId) => {
    setOrder({
      ...order,
      products: order.products.map((product) =>
        product.IdProduct === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      ),
    });
  };

  const handleRemove = (productId) => {
    setOrder({
      ...order,
      products: order.products.filter(
        (product) => product.idProductInOrder !== productId
      ),
    });
  };

  const calculateTotal = () => {
    let total = 0;
    order.products.forEach((product) => {
      let productTotal = product.SalePrice * product.quantity || 0;
      let optionalsTotal = product.optionals.reduce(
        (acc, optional) => acc + optional.SalePrice * optional.quantity,
        0
      );
      total += productTotal + optionalsTotal * product.quantity;
    }) || 0;

    return total.toFixed(2).replace(".", ",");
  };

  const sendButtonHandler = () => {
    console.log(JSON.stringify(order, null, 2));
    // setProductsInOrder([])
    // navigation.navigate("Home")
  };

  return (
    <View style={styles.contentArea}>
      {/* Modal de Adicionais */}
      <ModalAdditional
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      {/* Linha de Total e Botões */}
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total: R$ {calculateTotal()}</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.adicionaisButton}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="plus" size={15} color="#fff" />
            <Text style={styles.adicionaisText}>Adicionais</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => sendButtonHandler()}
          >
            <Icon name="send" size={15} color="#fff" />
            <Text style={styles.sendText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider entre Total e Tabela */}
      <View style={styles.divider} />

      {/* Tabela de Produtos */}
      {order.products.length > 0 ? (
        <View>
          {/* Cabeçalho da Tabela */}
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Qtde.</Text>
            <Text style={styles.headerText}>Nome</Text>
            <Text style={styles.headerText}>Apagar</Text>
          </View>

          {/* Tabela de Produtos */}
          <ScrollView
            style={styles.tableContainer}
            showsVerticalScrollIndicator={false}
          >
            {order.products.map((product, key) => (
              <View key={key} style={styles.tableRow}>
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    style={styles.decrementButton}
                    onPress={() => handleDecrement(product.IdProduct)}
                  >
                    <Text style={styles.controlText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{product.quantity}</Text>
                  <TouchableOpacity
                    style={styles.incrementButton}
                    onPress={() => handleIncrement(product.IdProduct)}
                  >
                    <Text style={styles.controlText}>+</Text>
                  </TouchableOpacity>
                </View>

                {/* Nome Centralizado */}
                <Text style={styles.productName}>{product.Description}</Text>

                {/* Ícone de Lixeira Distanciado da Borda */}
                <TouchableOpacity
                  style={styles.trashIcon}
                  onPress={() => handleRemove(product.idProductInOrder)}
                >
                  <Icon name="trash-can-outline" size={24} color="#888" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <Text>Nenhum produto adicionado</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contentArea: {
    flex: 1,
    padding: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  totalText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    paddingRight: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  sendButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5A9A55",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  sendText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
  },
  adicionaisButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5A9A55", // Cor ajustada
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  adicionaisText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#cccccc",
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#555",
    flex: 1,
    textAlign: "center",
  },
  tableContainer: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
  productName: {
    flex: 2,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    marginLeft: "20%",
  },
  trashIcon: {
    paddingRight: 25,
    flex: 1,
    alignItems: "flex-end",
  },
});

export default ConfirmarFechamento;
