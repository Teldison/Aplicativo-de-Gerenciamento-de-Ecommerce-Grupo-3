import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps,
  } from "@react-navigation/native-stack";
  import { Login } from "../screens/LoginScreen";
  import { Cadastro } from "../screens/CadastroScreen";
import { Home } from "../screens/HomeScreen";
import { ProdutoScreen } from "../screens/ProdutoScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Sobre } from "../screens/SobreScreen";
import { NavigationContainer } from "@react-navigation/native";
  
export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  Produtos: undefined;
  Drawer: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
return (
  <Drawer.Navigator screenOptions={{headerShown: false,}}>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Sobre" component={Sobre} />
  </Drawer.Navigator>
);
}

function PublicRoutes() {
return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }}/>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="Cadastro" component={Cadastro} />
      <Stack.Screen options={{ headerShown: false }} name="Home" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}

export default PublicRoutes;