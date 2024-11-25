import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Rotas } from './src/routes/rotas';
import {AuthProvider} from './src/contexts/AuthContext';
import * as SplashScreen from "expo-splash-screen"
import { SafeAreaView } from 'react-native-safe-area-context';
import NetworkStatus from './src/components/NetworkStatus/NetworkStatus';
import DrawerNavigator from './src/routes/DrawerNavigator';

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
    <AuthProvider>
      <NavigationContainer>
        <NetworkStatus />
        <Rotas/>
      </NavigationContainer>
    </AuthProvider>

  );
}