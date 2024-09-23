import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ProductScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('comanda'); // controla a aba selecionada
  const [searchTerm, setSearchTerm] = useState('');

  // Dados estáticos para simulação de produtos e pedidos
  const staticProducts = [
    { id: 1, name: 'Refrigerante', group: 'Refri' },
    { id: 2, name: 'Suco de Laranja', group: 'Sucos' },
    { id: 3, name: 'Cerveja Pilsen', group: 'Cervejas' },
    { id: 4, name: 'Água com Gás', group: 'Água/Café' },
  ];

  const staticOrder = [
    { id: 1, name: 'Refrigerante', quantity: 2, price: 5.00 },
    { id: 2, name: 'Suco de Laranja', quantity: 1, price: 7.00 },
  ];

  const [order, setOrder] = useState(staticOrder);
  const [totalValue, setTotalValue] = useState(order.reduce((sum, item) => sum + item.price * item.quantity, 0));

  const increaseQuantity = (itemId) => {
    const updatedOrder = order.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setOrder(updatedOrder);
  };

  const decreaseQuantity = (itemId) => {
    const updatedOrder = order.map((item) => {
      if (item.id === itemId && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setOrder(updatedOrder);
  };

  const deleteItem = (itemId) => {
    const updatedOrder = order.filter((item) => item.id !== itemId);
    setOrder(updatedOrder);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'comanda':
        return (
          <View style={styles.contentArea}>
            {/* Input de busca */}
            <TextInput
              style={styles.input}
              placeholder="Pesquisar produtos..."
              placeholderTextColor="#888"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />

            {/* Produtos simulados */}
            <ScrollView>
              <View style={styles.productList}>
                {staticProducts.map((product) => (
                  <TouchableOpacity key={product.id} style={styles.productItem}>
                    <Text>{product.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Categorias com layout quadrado */}
            <ScrollView horizontal style={styles.groupScroll}>
              <TouchableOpacity style={styles.groupItem}>
                <Text>Drinks</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.groupItem}>
                <Text>Sucos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.groupItem}>
                <Text>Refri</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.groupItem}>
                <Text>Cervejas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.groupItem}>
                <Text>Água/Café</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.groupItem}>
                <Text>Sorvetes</Text>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Voltar para Home</Text>
            </TouchableOpacity>
          </View>
        );

      case 'fechamento':
        return (
          <View style={styles.contentArea}>
            <Text style={styles.totalText}>Total: R$ {totalValue.toFixed(2)}</Text>
            <TouchableOpacity style={styles.button} onPress={() => console.log('Enviar para cozinha')}>
              <Text style={styles.buttonText}>Enviar para Cozinha</Text>
            </TouchableOpacity>

            <ScrollView>
              <View style={styles.productList}>
                {order.map((item) => (
                  <View key={item.id} style={styles.orderItem}>
                    <View style={styles.orderQuantity}>
                      <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                        <Text style={styles.quantityButton}>-</Text>
                      </TouchableOpacity>
                      <Text>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                        <Text style={styles.quantityButton}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.orderName}>{item.name}</Text>
                    <TouchableOpacity onPress={() => deleteItem(item.id)}>
                      <Text style={styles.deleteButton}>Apagar</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Voltar para Home</Text>
            </TouchableOpacity>
          </View>
        );

      case 'conta':
        return (
          <View style={styles.contentArea}>
            <Text style={styles.totalText}>Total da Conta: R$ {totalValue.toFixed(2)}</Text>
            <TouchableOpacity style={styles.button} onPress={() => console.log('Imprimir Conta')}>
              <Text style={styles.buttonText}>Imprimir Conta</Text>
            </TouchableOpacity>

            <ScrollView>
              <View style={styles.productList}>
                {order.map((item) => (
                  <View key={item.id} style={styles.orderItem}>
                    <Text style={styles.orderQuantity}>{item.quantity}</Text>
                    <Text style={styles.orderName}>{item.name}</Text>
                    <Text style={styles.orderTotal}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Voltar para Home</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Abas superiores */}
      <View style={styles.upperRow}>
        <TouchableOpacity
          style={[styles.square, selectedTab === 'comanda' && styles.selectedSquare]}
          onPress={() => setSelectedTab('comanda')}
        >
          <Text style={styles.squareTitle}>Comanda/Mesa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.square, selectedTab === 'fechamento' && styles.selectedSquare]}
          onPress={() => setSelectedTab('fechamento')}
        >
          <Text style={styles.squareTitle}>Confirmar Fechamento</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.square, selectedTab === 'conta' && styles.selectedSquare]}
          onPress={() => setSelectedTab('conta')}
        >
          <Text style={styles.squareTitle}>Conta</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo dinâmico baseado na aba selecionada */}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5',
  },
  upperRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  square: {
    width: '30%',
    height: 100,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  selectedSquare: {
    backgroundColor: '#4CAF50',
  },
  squareTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center', // Alinhando o texto ao centro
  },
  contentArea: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  productList: {
    flexDirection: 'column',
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  groupScroll: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  groupItem: {
    width: 80, // Definindo largura e altura iguais para deixar quadrado
    height: 80,
    backgroundColor: '#e0f7fa',
    marginHorizontal: 5,
    borderRadius: 10,
    borderColor: '#ccc',
    marginTop: 200,
    borderWidth: 1,
    justifyContent: 'center', // Centraliza o texto verticalmente
    alignItems: 'center',      // Centraliza o texto horizontalmente
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  orderQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  orderName: {
    flex: 1,
    textAlign: 'center',
  },
  orderTotal: {
    textAlign: 'right',
  },
  deleteButton: {
    color: 'red',
  },
});

export default ProductScreen;
