import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Home} from '../screens/HomeScreen';
import {Sobre} from '../screens/SobreScreen';

const Drawer = createDrawerNavigator();

const PrivateDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} options={{headerShown:false}} />
      <Drawer.Screen name="Sobre" component={Sobre} options={{headerShown:false}}/>
    </Drawer.Navigator>
  );
};

export default PrivateDrawerNavigator;