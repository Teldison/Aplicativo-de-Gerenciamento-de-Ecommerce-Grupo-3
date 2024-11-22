import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/LoginScreen';
import { Cadastro } from '../screens/CadastroScreen';
import { Home } from "../screens/HomeScreen/index"
import { ProdutoScreen } from '../screens/ProdutoScreen';

export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Home: undefined;
    Requestes: undefined;
    Produtos: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export function Rotas() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Cadastro" component={Cadastro} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home}/>
        <Stack.Screen options={{ headerShown: false }} name="Produtos" component={ProdutoScreen}/>
      </Stack.Navigator>
  );
}

