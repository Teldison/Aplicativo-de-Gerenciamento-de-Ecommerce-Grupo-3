import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/rootStackParamList';
import { AuthContext } from '../contexts/AuthContext';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Rotas() {
  const {isLogged} : {isLogged:boolean} = useContext(AuthContext) ??{ isLogged:false };
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {isLogged ? (
      <Stack.Screen name="PrivateRoutes" component={PrivateRoutes} />
    ) : (
      <Stack.Screen name="PublicRoutes" component={PublicRoutes} />
    )}
  </Stack.Navigator>
    );
  };
export default Rotas;