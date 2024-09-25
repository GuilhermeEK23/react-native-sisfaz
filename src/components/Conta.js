import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Conta = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Conta</Text>
      {/* Exiba aqui os detalhes da conta */}
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
});

export default Conta;
