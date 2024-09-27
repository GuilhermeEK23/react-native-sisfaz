import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const ComandaMesa = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const staticProducts = [
    { id: 1, name: 'Refrigerante' },
    { id: 2, name: 'Suco de Laranja' },
    { id: 3, name: 'Cerveja Pilsen' },
    { id: 4, name: 'Água com Gás' },
    { id: 5, name: 'Vinho Tinto' },
    { id: 6, name: 'Café Expresso' },
    { id: 7, name: 'Chá Gelado' },
    { id: 8, name: 'Água Sem Gás' },
    { id: 9, name: 'Milkshake' },
    { id: 10, name: 'Whisky' },
    { id: 11, name: 'Vodka' },
    { id: 12, name: 'Gin Tônica' },
    { id: 13, name: 'Tequila' },
    { id: 14, name: 'Suco de Uva' },
    { id: 15, name: 'Água de Coco' },
    { id: 16, name: 'Cerveja Lager' },
    { id: 17, name: 'Cerveja IPA' },
    { id: 18, name: 'Coca-Cola' },
    { id: 19, name: 'Fanta' },
    { id: 21, name: 'Pepsi' },
    { id: 22, name: 'Pepsi' },
    { id: 23, name: 'Pepsi' },
    { id: 24, name: 'Pepsi' },
    { id: 25, name: 'Pepsi' },
    { id: 26, name: 'Pepsi' },
    { id: 27, name: 'Pepsi' },
    { id: 28, name: 'Pepsi' },
    { id: 29, name: 'Pepsi' },
    { id: 30, name: 'Pepsi' },
    { id: 31, name: 'Pepsi' },
    { id: 32, name: 'Pepsi' },
    { id: 33, name: 'Pepsi' },
    { id: 34, name: 'Pepsi' },
    { id: 35, name: 'Pepsi' },
    { id: 36, name: 'Pepsi' },
    { id: 37, name: 'Pepsi' },
    { id: 38, name: 'Pepsi' },
    { id: 39, name: 'Pepsi' },
    { id: 40, name: 'Pepsi' },
    { id: 41, name: 'Pepsi' },
    { id: 42, name: 'Pepsi' },
    { id: 43, name: 'Pepsi' },
    { id: 44, name: 'Pepsi' },
    { id: 45, name: 'Pepsi' },
    { id: 46, name: 'Pepsi' },
    { id: 47, name: 'Pepsi' },
    { id: 48, name: 'Pepsi' },
    { id: 49, name: 'Pepsi' },
    { id: 50, name: 'Pepsi' },
    { id: 51, name: 'Pepsi' },
    { id: 52, name: 'Pepsi' },
    { id: 53, name: 'Pepsi' },
    { id: 54, name: 'Pepsi' },
    { id: 55, name: 'Pepsi' },
    { id: 56, name: 'Pepsi' },
  ];

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
              {staticProducts.map((product) => (
                <TouchableOpacity key={product.id} style={styles.productSquare}>
                  <Text style={styles.productText}>{product.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Grupos dentro do container */}
          <View style={styles.groupContainer}>
            <ScrollView horizontal style={styles.groupScroll} showsHorizontalScrollIndicator={false}>
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
    paddingHorizontal: 0, // Removido para ocupar 100% da largura
    paddingVertical: 0,
  },
  productContainer: {
    height: height * 0.7, // Maior área para produtos
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
    paddingVertical: 0,
  },
  groupScroll: {
    paddingVertical: 8,
  },
  groupItemContainer: {
    alignItems: 'center',
    width: 57,
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
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 10,
  },
});

export default ComandaMesa;
