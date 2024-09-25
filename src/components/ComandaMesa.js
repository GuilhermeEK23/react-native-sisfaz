import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
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
    { id: 20, name: 'Pepsi' },
  ];

  return (
    <View style={styles.contentArea}>
      <View style={styles.squareContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar produtos..."
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

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

        {/* Divider */}
        <View style={styles.divider} />

        {/* Grupos dentro do container */}
        <View style={styles.groupContainer}>
          <ScrollView horizontal style={styles.groupScroll} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.groupItem}>
              <Icon name="glass-cocktail" size={30} color="#fff" />
              <Text style={styles.groupText}>Drinks</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.groupItem}>
              <Icon name="glass-mug" size={30} color="#fff" />
              <Text style={styles.groupText}>Sucos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.groupItem}>
              <Icon name="bottle-soda" size={30} color="#fff" />
              <Text style={styles.groupText}>Refri</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.groupItem}>
              <Icon name="beer" size={30} color="#fff" />
              <Text style={styles.groupText}>Cervejas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.groupItem}>
              <Icon name="cup-water" size={30} color="#fff" />
              <Text style={styles.groupText}>Água/Café</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.groupItem}>
              <Icon name="ice-cream" size={30} color="#fff" />
              <Text style={styles.groupText}>Sorvetes</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    borderRadius: 5,
    width: '80%',
    alignSelf: 'center',
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  productContainer: {
    height: height * 0.4,
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
  divider: {
    height: 1,
    backgroundColor: '#cccccc',
    marginVertical: 10,
  },
  groupContainer: {
    paddingVertical: 10,
  },
  groupScroll: {
    paddingVertical: 10,
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
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
  squareContainer: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    flex: 1,
  },
});

export default ComandaMesa;
