import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [comanda, setComanda] = useState('');

  const handleCreateComanda = () => {
    // Aqui você pode adicionar a lógica para criar a comanda/mesa
    console.log(`Comanda/Mesa: ${comanda}`);
    // Navegar para a próxima tela
    navigation.navigate('Product');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comanda/Mesa</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o número da comanda ou mesa"
        placeholderTextColor="#888"
        value={comanda}
        onChangeText={setComanda}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateComanda}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
    fontWeight: 'bold',
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
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
