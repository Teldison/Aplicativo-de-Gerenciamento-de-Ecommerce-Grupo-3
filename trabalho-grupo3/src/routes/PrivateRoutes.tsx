import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
    NativeStackScreenProps,
  } from "@react-navigation/native-stack";
import { ProdutoScreen } from "../screens/ProdutoScreen";
import { Usuario } from "../screens/UsuariosScreen";
import { Home } from "../screens/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Sobre } from "../screens/SobreScreen";


export type RootStackParamList = {
    Home: undefined;
    Produtos: undefined;
    Drawer: undefined;
  };
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const Drawer = createDrawerNavigator();
  

function DrawerNavigator() {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#6e2900', 
            width: 240, 
          },
          drawerLabelStyle: {
            fontSize: 18,
            color: 'white',
          },
          headerShown: false,
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Sobre" component={Sobre} />
      </Drawer.Navigator>
    );
}
    
function PrivateRoutes() {
    return (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }}/>
          <Stack.Screen options={{ headerShown: false }} name="Produtos" component={ProdutoScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={DrawerNavigator} />
        </Stack.Navigator>
      );
}

export default PrivateRoutes;