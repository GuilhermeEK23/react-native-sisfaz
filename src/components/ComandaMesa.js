import React, { useState } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const ComandaMesa = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para o produto selecionado
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [quantity, setQuantity] = useState(1); // Estado para controlar a quantidade

  const staticProducts = [
    { id: 1, name: 'Refrigerante', price: 5.0 },
    { id: 2, name: 'Suco de Laranja', price: 7.0 },
    { id: 3, name: 'Cerveja Pilsen', price: 10.0 },
    { id: 4, name: 'Água com Gás', price: 3.0 },
    { id: 5, name: 'Vinho Tinto', price: 25.0 },
    { id: 6, name: 'Café Expresso', price: 4.0 },
    { id: 7, name: 'Chá Gelado', price: 6.0 },
    { id: 8, name: 'Água Sem Gás', price: 2.5 },
    { id: 9, name: 'Milkshake', price: 12.0 },
    { id: 10, name: 'Whisky', price: 30.0 },
    { id: 11, name: 'Vodka', price: 28.0 },
    { id: 12, name: 'Gin Tônica', price: 22.0 },
    { id: 13, name: 'Tequila', price: 20.0 },
    { id: 14, name: 'Suco de Uva', price: 7.5 },
    { id: 15, name: 'Água de Coco', price: 5.0 },
    { id: 16, name: 'Cerveja Lager', price: 10.0 },
    { id: 17, name: 'Cerveja IPA', price: 12.0 },
    { id: 18, name: 'Coca-Cola', price: 5.5 },
    { id: 19, name: 'Refrigerante', price: 5.0 },
    { id: 20, name: 'Suco de Laranja', price: 7.0 },
    { id: 21, name: 'Cerveja Pilsen', price: 10.0 },
    { id: 22, name: 'Água com Gás', price: 3.0 },
    { id: 23, name: 'Vinho Tinto', price: 25.0 },
    { id: 24, name: 'Café Expresso', price: 4.0 },
    { id: 25, name: 'Chá Gelado', price: 6.0 },
    { id: 26, name: 'Água Sem Gás', price: 2.5 },
    { id: 27, name: 'Milkshake', price: 12.0 },
    { id: 28, name: 'Whisky', price: 30.0 },
    { id: 29, name: 'Vodka', price: 28.0 },
    { id: 30, name: 'Gin Tônica', price: 22.0 },
    { id: 31, name: 'Tequila', price: 20.0 },
    { id: 32, name: 'Suco de Uva', price: 7.5 },
    { id: 33, name: 'Água de Coco', price: 5.0 },
    { id: 34, name: 'Cerveja Lager', price: 10.0 },
    { id: 35, name: 'Cerveja IPA', price: 12.0 },
    { id: 36, name: 'Coca-Cola', price: 5.5 },
    { id: 37, name: 'Refrigerante', price: 5.0 },
    { id: 38, name: 'Suco de Laranja', price: 7.0 },
    { id: 39, name: 'Cerveja Pilsen', price: 10.0 },
    { id: 40, name: 'Água com Gás', price: 3.0 },
  ];

  // Função para lidar com o clique no produto e abrir o modal
  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setQuantity(1); // Resetar a quantidade ao abrir um novo modal
    setModalVisible(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  // Função para incrementar a quantidade
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Função para decrementar a quantidade
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Calcular o total com base na quantidade e no preço do produto
  const calculateTotal = () => {
    return selectedProduct ? (selectedProduct.price * quantity).toFixed(2) : '0.00';
  };

  // Função para adicionar o produto ao carrinho (a ser implementada)
  const handleAddToCart = () => {
    // Aqui você pode implementar a lógica para adicionar o produto ao carrinho
    // Por exemplo, atualizar um estado global ou navegar para outra tela
    console.log(`Adicionado: ${selectedProduct.name}, Quantidade: ${quantity}, Total: R$ ${calculateTotal()}`);
    handleCloseModal();
  };

  // Função para abrir opcionais (a ser implementada)
  const handleOptionals = () => {
    // Implementar lógica para lidar com opcionais
    console.log('Opcionais clicados');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <ScrollView style={styles.productContainer}>
            <View style={styles.productGrid}>
              {staticProducts
                .filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) // Filtrar produtos com base no termo de pesquisa
                .map((product) => (
                  <TouchableOpacity
                    key={product.id}
                    style={styles.productSquare}
                    onPress={() => handleProductPress(product)} // Abre o modal ao clicar no produto
                  >
                    <Text style={styles.productText}>{product.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>

          {/* Grupos dentro do container */}
          <View style={styles.groupContainer}>
            <ScrollView
              horizontal
              style={styles.groupScroll}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.groupItemContainer}>
                <TouchableOpacity style={styles.groupItem}>
                  <Icon name="glass-cocktail" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.groupText}>Drinks</Text>
              </View>

              <View style={styles.groupItemContainer}>
                <TouchableOpacity style={styles.groupItem}>
                  <Icon name="glass-mug" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.groupText}>Sucos</Text>
              </View>

              <View style={styles.groupItemContainer}>
                <TouchableOpacity style={styles.groupItem}>
                  <Icon name="bottle-soda" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.groupText}>Refri</Text>
              </View>

              <View style={styles.groupItemContainer}>
                <TouchableOpacity style={styles.groupItem}>
                  <Icon name="beer" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.groupText}>Cervejas</Text>
              </View>

              <View style={styles.groupItemContainer}>
                <TouchableOpacity style={styles.groupItem}>
                  <Icon name="cup-water" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.groupText}>Água/Café</Text>
              </View>

              <View style={styles.groupItemContainer}>
                <TouchableOpacity style={styles.groupItem}>
                  <Icon name="ice-cream" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.groupText}>Sorvetes</Text>
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Modal para exibir os detalhes do produto */}
        {selectedProduct && (
  <Modal
    animationType="none"
    transparent={true}
    visible={modalVisible}
    onRequestClose={handleCloseModal}
  >
    {/* TouchableWithoutFeedback para detectar cliques fora do modalContainer */}
    <TouchableWithoutFeedback onPress={handleCloseModal}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={() => {}}>
          {/* Isso impede que o clique dentro do modal feche o modal */}
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
            <Text style={styles.modalPrice}>
              R$ {selectedProduct.price.toFixed(2)}
            </Text>

            {/* Controle de quantidade */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={decrementQuantity}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityNumber}>{quantity}</Text>
              <TouchableOpacity
                onPress={incrementQuantity}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Exibição do total */}
            <Text style={styles.totalText}>
              Total: R$ {calculateTotal()}
            </Text>

            {/* Botão de opcionais e adicionar ao carrinho */}
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
)}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // ícone à esquerda e input à direita
    marginVertical: 8,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  searchIconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    fontSize: 16,
    width: '85%', // Ajustado para ocupar o espaço à direita
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 10, // Ajustado para melhor espaçamento
    paddingVertical: 10,
    backgroundColor: '#f5f5f5', // Fundo para melhor visualização
  },
  productContainer: {
    flex: 1,
    marginTop: 10,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productSquare: {
    backgroundColor: '#5B9A55',
    width: (width / 4.5) - 15,
    height: (width / 4.5) - 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  productText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  groupContainer: {
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: '#00000020',
    marginTop: 10,
  },
  groupScroll: {
    paddingVertical: 5,
  },
  groupItemContainer: {
    alignItems: 'center',
    width: 70, // Aumentado para melhor acomodar o texto
    marginHorizontal: 5,
  },
  groupItem: {
    width: 57,
    height: 60,
    backgroundColor: '#5B9A55',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  groupText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
    width: '100%',
    flexWrap: 'wrap',
  },
  squareContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
modalOverlay: {
  flex: 1,
  justifyContent: 'flex-end',
  marginBottom: 0, // Ajustado para melhor visualização
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContainer: {
  width: '100%',
  height: '25%', // Altura ajustada
  maxHeight: '50%',
  backgroundColor: '#f5f5f5',
  padding: 20,
  justifyContent: 'space-between',
  position: 'relative'
},
headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between', // Alinha os itens de ponta a ponta
  width: '100%',
},
leftColumn: {
  justifyContent: 'flex-start',
},
modalTitle: {
  fontSize: 14,
  fontWeight: 'bold',
  textAlign: 'left',
},
modalPrice: {
  fontSize: 16,
  color: '#333',
  marginTop: 5,
  textAlign: 'left',
},
rightColumn: {
  justifyContent: 'flex-start',
  alignItems: 'flex-end', // Alinha o total no topo à direita
},
totalText: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'right',
  position: 'absolute', // Isso permite mover o texto de forma precisa
  right: 20, // Para garantir que ele fique à direita
  zIndex: 10, // Garante que o texto fique acima de outros elementos
  marginTop: 20,
},
quantityContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center', // Centraliza o container de quantidade
  marginVertical: 10,
},
quantityButton: {
  backgroundColor: '#5B9A55',
  padding: 10,
  borderRadius: 5,
  marginHorizontal: 10,
},
quantityText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: 'bold',
},
quantityNumber: {
  fontSize: 14,
  fontWeight: 'bold',
},
buttonRow: {
  flexDirection: 'row',
  justifyContent: 'center', // Centraliza os botões
  width: '100%',
  marginTop: 10,
},
optionalsButton: {
  backgroundColor: '#FFA500',
  paddingVertical: 8,
  borderRadius: 5,
  flex: 1,
  marginRight: 5,
  alignItems: 'center',
},
optionalsButtonText: {
  color: '#fff',
  fontSize: 14,
},
addButton: {
  backgroundColor: '#5B9A55',
  paddingVertical: 8,
  borderRadius: 5,
  flex: 1,
  marginLeft: 5,
  alignItems: 'center',
},
addButtonText: {
  color: '#fff',
  fontSize: 14,
},

  
  
});

export default ComandaMesa;
