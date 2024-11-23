import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Rotas } from './src/routes/rotas';
import AuthProvider from './src/contexts/AuthContext';
import * as SplashScreen from "expo-splash-screen"

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } 
      catch (err) {
        console.warn(err);
      } 
      finally {
        await SplashScreen.hideAsync();
      }
    }
  
    prepare();
  }, []);

  return (
    <NavigationContainer>
        <AuthProvider>
          {/*adicionar  netInfo*/}
            <Rotas/>
        </AuthProvider>
    </NavigationContainer>
  );
}