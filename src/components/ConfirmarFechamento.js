import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ConfirmarFechamento = ({ navigation }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Coca Cola', quantity: 1 },
    { id: 2, name: 'Água com Gás', quantity: 1 },
    { id: 3, name: 'Produto 1', quantity: 1 },
    { id: 4, name: 'Produto 2', quantity: 1 },
    { id: 5, name: 'Produto 3', quantity: 1 },
    { id: 6, name: 'Produto 4', quantity: 1 },
    { id: 7, name: 'Produto 5', quantity: 1 },
    { id: 8, name: 'Produto 6', quantity: 1 },
    { id: 9, name: 'Produto 7', quantity: 1 },
    { id: 10, name: 'Produto 8', quantity: 1 },
    { id: 11, name: 'Produto 9', quantity: 1 },
    { id: 12, name: 'Produto 10', quantity: 1 },
    { id: 13, name: 'Produto 11', quantity: 1 },
    { id: 14, name: 'Produto 12', quantity: 1 },
  ]);

  const handleIncrement = (productId) => {
    setProducts(
      products.map(product =>
        product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const handleDecrement = (productId) => {
    setProducts(
      products.map(product =>
        product.id === productId && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 } : product
      )
    );
  };

  const handleRemove = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <View style={styles.contentArea}>
      {/* Linha de Total e Botão de Enviar */}
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total: R$ 150,00</Text>
        <TouchableOpacity style={styles.sendButton}>
          <Icon name="send" size={20} color="#fff" />
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      {/* Divider entre Total e Tabela */}
      <View style={styles.divider} />

      {/* Cabeçalho da Tabela */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Qtde.</Text>
        <Text style={styles.headerText}>Nome</Text>
        <Text style={styles.headerText}>Apagar</Text>
      </View>

      {/* Tabela de Produtos */}
      <ScrollView style={styles.tableContainer}>
        {products.map(product => (
          <View key={product.id} style={styles.tableRow}>
            <View style={styles.quantityControl}>
              <TouchableOpacity style={styles.decrementButton} onPress={() => handleDecrement(product.id)}>
                <Text style={styles.controlText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{product.quantity}</Text>
              <TouchableOpacity style={styles.incrementButton} onPress={() => handleIncrement(product.id)}>
                <Text style={styles.controlText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Nome Centralizado */}
            <Text style={styles.productName}>{product.name}</Text>

            {/* Ícone de Lixeira Distanciado da Borda */}
            <TouchableOpacity style={styles.trashIcon} onPress={() => handleRemove(product.id)}>
              <Icon name="trash-can-outline" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentArea: {
    flex: 1,
    padding: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5A9A55',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  sendText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#cccccc',
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
    flex: 1,
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  decrementButton: {
    backgroundColor: '#FF6347',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  incrementButton: {
    backgroundColor: '#5A9A55',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  controlText: {
    color: '#fff',
    fontSize: 18,
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
  },
  productName: {
    flex: 2,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  trashIcon: {
    paddingRight: 25, // Distanciando a lixeira da borda
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default ConfirmarFechamento;
