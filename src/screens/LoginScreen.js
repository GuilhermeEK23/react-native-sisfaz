import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importando o LinearGradient corretamente do Expo
import { Ionicons } from '@expo/vector-icons'; // Importando os ícones

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

          {/* Campo de usuário com ícone */}
          <Text style={styles.title}>Usuário</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome de usuário"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* Campo de senha com ícone */}
          <Text style={styles.title}>Senha</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

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
    marginBottom: 50, // Ajuste o espaçamento conforme necessário
  },
  logo: {
    width: 200, // Aumentando ainda mais a largura da logo
    height: 180, // Aumentando ainda mais a altura da logo
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
    fontWeight: 'bold',
    alignSelf: 'flex-start', // Alinha o título à esquerda
    paddingLeft: 50, // Mesma distância horizontal do input
  },
  inputContainer: {
    flexDirection: 'row', // Para alinhar o ícone e o input na horizontal
    alignItems: 'center', // Centralizar o conteúdo verticalmente
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 50,
    width: '80%', // Diminuindo a largura do campo de input
  },
  icon: {
    marginRight: 10, // Espaçamento entre o ícone e o input
  },
  input: {
    flex: 1, // O input ocupa o espaço restante ao lado do ícone
    height: '100%',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%', // Diminuindo a largura do botão para corresponder ao input
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
