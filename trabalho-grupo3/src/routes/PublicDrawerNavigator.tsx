import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Home} from '../screens/HomeScreen';
import {Login} from '../screens/LoginScreen';
import {Cadastro} from '../screens/CadastroScreen';
import {Sobre} from '../screens/SobreScreen';

const Drawer = createDrawerNavigator();

const PublicDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} options={{headerShown:false}} />
      <Drawer.Screen name="Sobre" component={Sobre} options={{headerShown:false}}/>
    </Drawer.Navigator>
  );
};

export default PublicDrawerNavigator;