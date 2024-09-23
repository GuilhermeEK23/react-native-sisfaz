import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importando o LinearGradient corretamente do Expo

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de login
    navigation.navigate('Home');
  };

  return (
    <ImageBackground
      source={require('../images/background.png')} // Imagem de fundo
      style={styles.background}
      resizeMode="cover" // Garante que a imagem cubra toda a tela
    >
      {/* Adicionando o gradiente sobre a imagem */}
      <LinearGradient
        colors={['rgb(91, 154, 85)', 'rgba(0, 0, 0, 0.84)']} // Gradiente de transparente no topo para preto na parte inferior
        style={styles.gradient}
      >
        <View style={styles.overlay}> 
          <View style={styles.logoContainer}>
            <Image
              source={require('../images/logo.png')} // Logo do SisFaz
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome de usuário"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.title}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ocupar a tela inteira
    width: '100%', // Largura total da tela
    height: '100%', // Altura total da tela
  },
  gradient: {
    flex: 1, // O gradiente cobre toda a tela
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 100, // Ajuste o espaçamento conforme necessário
  },
  logo: {
    width: 140, // Largura da logo (reduzida um pouco)
    height: 140, // Altura da logo (reduzida um pouco)
  },
  title: {
    fontSize: 18,
    color: '#fff',
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
    width: '100%', // Largura total do campo de input
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%', // Largura total do botão
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
