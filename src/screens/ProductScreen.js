import React from 'react';
import { SafeAreaView, StyleSheet, View, Platform, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import ComandaMesa from '../components/ComandaMesa';
import ConfirmarFechamento from '../components/ConfirmarFechamento';
import Conta from '../components/Conta';

const Tab = createMaterialTopTabNavigator();

const ProductScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['rgb(91, 154, 85)', 'rgba(0, 0, 0, 0.84)']}
        style={styles.gradient}
      >
        {/* Ajustando o marginTop para distanciar o conteúdo do header */}
        <View style={styles.container}>
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: styles.tabLabel,
              tabBarStyle: styles.tabBar,
              tabBarIndicatorStyle: styles.tabIndicator,
            }}
          >
            <Tab.Screen name="Comanda/Mesa" component={ComandaMesa} />
            <Tab.Screen name="Confirmar Fechamento" component={ConfirmarFechamento} />
            <Tab.Screen name="Conta" component={Conta} />
          </Tab.Navigator>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3D3434', // Mesma cor do header para suavizar transições
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight + 10, // Adiciona espaço no iOS para distanciar do header
  },
  tabLabel: {
    fontSize: 12,
    color: '#fff',
    paddingVertical: 10,
  },
  tabBar: {
    backgroundColor: '#5B9A55',
    elevation: 0,
  },
  tabIndicator: {
    backgroundColor: '#fff',
  },
});

export default ProductScreen;
