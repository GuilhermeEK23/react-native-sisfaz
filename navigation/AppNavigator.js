import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../src/screens/LoginScreen';
import HomeScreen from '../src/screens/HomeScreen';
import ProductScreen from '../src/screens/ProductScreen';
import CustomHeader from '../src/components/CustomHeader';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            header: () => <CustomHeader title="Login" showMenu={false} />, // Não exibir o menu
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => <CustomHeader title="Comandas/Mesas" showMenu={true} />, // Exibir o menu
          }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{
            header: () => <CustomHeader title="Produtos/Lançamentos" showMenu={true} />, // Exibir o menu
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
