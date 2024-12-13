import "react-native-gesture-handler"; // Deve ser a primeira importação
import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { HeaderProvider } from "./src/components/HeaderContext";

export default function App() {
  return (
    <HeaderProvider>
      <AppNavigator />
    </HeaderProvider>
  );
}
