import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ConfirmarFechamento = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmar Fechamento</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Fechar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ConfirmarFechamento;
