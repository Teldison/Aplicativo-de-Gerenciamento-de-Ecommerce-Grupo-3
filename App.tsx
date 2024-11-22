import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Rotas } from './src/routes/rotas';
import AuthProvider from './src/contexts/AuthContext';


export default function App() {
  return (
    <NavigationContainer>
        <AuthProvider>
            <Rotas/>
        </AuthProvider>
    </NavigationContainer>
  );
}


