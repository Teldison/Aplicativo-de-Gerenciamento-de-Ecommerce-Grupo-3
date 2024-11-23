import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/rootStackParamList';
import { AuthContext } from '../contexts/AuthContext';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Rotas() {
  const {isLogged} : {isLogged:boolean} = useContext(AuthContext) ??{
    isLogged:false,
  };
  return <>{!isLogged ? <PublicRoutes /> : <PrivateRoutes/>}</>;

};
export default Rotas;