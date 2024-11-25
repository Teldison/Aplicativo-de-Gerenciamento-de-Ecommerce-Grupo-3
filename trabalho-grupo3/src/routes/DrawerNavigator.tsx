import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '../screens/HomeScreen';
import {Sobre} from '../screens/SobreScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
  initialRouteName="Home"
  screenOptions={{
    drawerStyle: {
      backgroundColor: 'black', 
      width: 240, 
    },
    drawerLabelStyle: {
      fontSize: 18, 
    },
  }}
>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Sobre" component={Sobre} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;