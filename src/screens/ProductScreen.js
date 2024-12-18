import React, { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";
import ComandaMesa from "../components/ComandaMesa";
import ConfirmarFechamento from "../components/ConfirmarFechamento";
import Conta from "../components/Conta";
import { HeaderContext } from "../components/HeaderContext";
import { OrderProvider } from "../components/OrderContext";

const Tab = createMaterialTopTabNavigator();

const CustomTabLabel = ({ label, comandaNumber, focused }) => (
  <View style={styles.tabLabelContainer}>
    <Text style={[styles.tabLabelText, focused && styles.activeTabLabel]}>
      {label}
    </Text>
    <View style={styles.numberBadge}>
      <Text style={[styles.comandaNumber, focused && styles.activeNumber]}>
        {comandaNumber}
      </Text>
    </View>
  </View>
);

const ProductScreen = ({ route }) => {
  const { isMenuHeader, resetMenuHeader } = useContext(HeaderContext);
  const { orderNumber, user } = route.params;

  return (
    <OrderProvider>
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={["rgb(91, 154, 85)", "rgba(0, 0, 0, 0.84)"]}
          style={styles.gradient}
        >
          <View style={styles.container}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarLabelStyle: styles.tabLabel,
                tabBarStyle: styles.tabBar,
                tabBarIndicatorStyle: styles.tabIndicator,
                swipeEnabled: true, // Desabilitar swipe entre as tabs
                animationEnabled: true, // Adiciona animação na transição
                tabBarActiveTintColor: "#fff", // Cor da label ativa
                tabBarInactiveTintColor: "rgba(255,255,255,0.5)", // Cor da label inativa
                tabBarPressOpacity: 1, // Remove efeito de opacidade ao pressionar
              })}
            >
              <Tab.Screen
                name="Comanda"
                component={ComandaMesa}
                initialParams={{ orderNumber, user }}
                options={{
                  tabBarLabel: ({ focused }) => (
                    <CustomTabLabel
                      label="Comanda"
                      comandaNumber={orderNumber}
                      focused={focused}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Confirmar Fechamento"
                component={ConfirmarFechamento}
              />
              <Tab.Screen name="Conta" component={Conta} />
            </Tab.Navigator>
          </View>
          {/* Camada de bloqueio quando o menu está aberto */}
          {isMenuHeader && (
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
                resetMenuHeader();
              }}
            >
              <View style={styles.overlayMenu} />
            </TouchableWithoutFeedback>
          )}
        </LinearGradient>
      </SafeAreaView>
    </OrderProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#3D3434",
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
  },
  tabLabelContainer: {
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    alignItems: "center",
    flexDirection: "column",
    height: "100%", // O conteúdo ocupa toda a altura da tabBar
  },
  tabLabelText: {
    fontSize: 14, // Mantém o tamanho original da fonte
    fontWeight: "bold", // Garante que o texto seja bold
    color: "rgba(255, 255, 255, 0.5)", // Texto inativo
  },
  activeTabLabel: {
    color: "#fff", // Texto ativo com cor branca
    fontWeight: "bold", // Garante que o texto ativo também seja bold
  },
  numberBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Fundo branco semitransparente
    borderRadius: 8, // Borda arredondada
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4, // Espaço entre o texto e o número
  },
  comandaNumber: {
    fontSize: 14, // Mantém o tamanho da fonte original
    color: "rgba(255, 255, 255, 0.5)", // Número inativo
    fontWeight: "bold", // Número em negrito (bold)
  },
  activeNumber: {
    color: "#fff", // Número ativo com cor branca
    fontWeight: "bold", // Número ativo também em negrito
  },
  tabBar: {
    backgroundColor: "#5B9A55",
    elevation: 0,
    height: 80, // Aumenta a altura da tabBar
    justifyContent: "center", // Centraliza o conteúdo na altura da tabBar
  },
  tabIndicator: {
    backgroundColor: "#fff",
    height: 4, // Indicador mais grosso
    borderRadius: 2, // Borda arredondada para o indicador
  },
  overlayMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10, // Certifique-se de que esteja acima de outros elementos
  },
});

export default ProductScreen;
