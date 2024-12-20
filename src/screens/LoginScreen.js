import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import UserServices from "../services/UserServices";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (username.trim().length < 1 || password.length < 1) {
      return alert("Preencha todos os campos.");
    }
    setIsLoading(true);
    const user = await UserServices.login(username.trim(), password);

    setIsLoading(false);

    if (user === undefined || user === null) {
      return;
    }

    setUsername("");
    setPassword("");
    navigation.navigate("Home", { user });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../images/background.png")}
          style={styles.background}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgb(91, 154, 85)", "rgba(0, 0, 0, 0.84)"]}
            style={styles.gradient}
          >
            <View style={styles.overlay}>
              <View style={styles.logoContainer}>
                <Image
                  source={require("../images/logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.title}>Usuário</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu nome de usuário"
                  placeholderTextColor="#888"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>

              <Text style={styles.title}>Senha</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#888"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={!isLoading ? handleLogin : null}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Text style={styles.buttonText}>Entrar</Text>
                )}
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 50,
  },
  logo: {
    width: 200,
    height: 180,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 50,
    width: "80%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
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
});

export default LoginScreen;
