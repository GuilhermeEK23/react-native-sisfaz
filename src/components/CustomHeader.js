import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para ícones
import { Menu, Provider } from 'react-native-paper'; // Importar Menu da react-native-paper

const CustomHeader = ({ title, onLogoutPress, showMenu = true }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      {/* Ajustando o StatusBar */}
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
        backgroundColor="#3D3434"
      />

      {/* SafeAreaView para garantir que o header não invada a status bar */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <View style={styles.leftContainer}>
            <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.title}>{title}</Text>
          </View>

          {/* Exibir o menu apenas se showMenu for true */}
          {showMenu && (
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu}>
                  <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
                </TouchableOpacity>
              }
            >
              <Menu.Item onPress={onLogoutPress} title="Sair" />
            </Menu>
          )}
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: '#3D3434', // Cor de fundo do header para o SafeAreaView
  },
  headerContainer: {
    height: 55, // Altura do header
    backgroundColor: '#3D3434',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16, // Diminuindo o tamanho do texto
    marginLeft: 8,
  },
  icon: {
    marginRight: 5,
  },
});

export default CustomHeader;
