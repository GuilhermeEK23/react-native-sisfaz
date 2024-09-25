import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importando o gradiente
import { Ionicons } from '@expo/vector-icons'; // Importando os ícones

const HomeScreen = ({ navigation }) => {
  const [comanda, setComanda] = useState('');

  const handleCreateComanda = () => {
    console.log(`Comanda/Mesa: ${comanda}`);
    navigation.navigate('Product');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['rgb(91, 154, 85)', 'rgba(0, 0, 0, 0.84)']} // Gradiente igual da tela de login
        style={styles.gradient}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Comanda/Mesa</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="search-outline" size={24} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Digite o número da comanda/mesa"
              placeholderTextColor="#888"
              value={comanda}
              onChangeText={setComanda}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCreateComanda}>
            <Text style={styles.buttonText}>Criar</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 50,
    width: '80%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
