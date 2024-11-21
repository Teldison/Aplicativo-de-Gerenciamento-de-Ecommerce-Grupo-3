import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/screens/LoginScreen';
import { Cadastro } from './src/screens/CadastroScreen';
import { Home } from './src/screens/HomeScreen';
import { Produto } from './src/screens/ProdutoScreen';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  Produtos: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Cadastro" component={Cadastro} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home}/>
        <Stack.Screen options={{ headerShown: false }} name="Produtos" component={Produto}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


