import 'react-native-gesture-handler'; // Deve ser a primeira importação
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
