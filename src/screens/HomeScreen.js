import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Importando o gradiente
import { Ionicons } from "@expo/vector-icons"; // Importando os ícones
import { HeaderContext } from "../components/HeaderContext";

const HomeScreen = ({ route, navigation }) => {
  const { isMenuHeader, resetMenuHeader } = useContext(HeaderContext);
  const { user } = route.params;
  const [comanda, setComanda] = useState(0);

  const handleCreateComanda = () => {
    if (comanda > 0) {
      navigation.navigate("Product", { comanda, user });
    } else {
      alert("Por favor, insira um número de comanda válido.");
    }
  };

  const validateComanda = (text) => {
    const filteredText = text.replace(/[^0-9]/g, "");
    if (filteredText.length <= 4) {
      setComanda(filteredText);
    }
  };

  const handleEnter = () => {
    console.log("Ícone de entrar clicado");
    // Aqui você pode adicionar qualquer ação desejada ao clicar no ícone
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["rgb(91, 154, 85)", "rgba(0, 0, 0, 0.84)"]} // Gradiente igual da tela de login
        style={styles.gradient}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Comanda</Text>

          <View style={styles.inputWithIconContainer}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="search-outline"
                size={24}
                color="#888"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Digite o número da comanda"
                placeholderTextColor="#888"
                value={comanda}
                onChangeText={validateComanda}
                keyboardType="numeric" // Exibe teclado numérico em Android e iOS
              />
            </View>

            <TouchableOpacity style={styles.iconButton} onPress={handleEnter}>
              <Ionicons name="enter-outline" size={24} color="#5B9A55" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCreateComanda}>
            <Text style={styles.buttonText}>Abrir Comanda</Text>
          </TouchableOpacity>
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 50,
  },
  inputWithIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%", // Mesma largura do botão
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    height: 50,
    flex: 1, // O input ocupará o restante do espaço
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  iconButton: {
    marginLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 25, // Forma de círculo
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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

export default HomeScreen;
