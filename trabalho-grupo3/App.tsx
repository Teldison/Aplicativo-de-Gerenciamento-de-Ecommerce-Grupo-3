import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from "./src/screens/LoginScreen/index"
import { Cadastro } from './src/screens/CadastroScreen/index';
import { ProdutoScreen } from './src/screens/ProdutoScreen';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Produtos: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Produtos">
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Cadastro" component={Cadastro} />
        <Stack.Screen options={{ headerShown: false }} name="Produtos" component={ProdutoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


