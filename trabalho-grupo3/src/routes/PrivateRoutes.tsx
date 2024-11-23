import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
    NativeStackScreenProps,
  } from "@react-navigation/native-stack";
import { ProdutoPrivateScreen } from "../screens/ProdutoPrivateScreen";
import { Usuario } from "../screens/UsuariosScreen";
import { Home } from "../screens/HomeScreen";

type StackNavigation = {
    Home: undefined,  
    Produtos: undefined;
    Usuarios: undefined;
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>;
export type HomeProps = NativeStackScreenProps<StackNavigation, "Home">;
export type UsuariosProps = NativeStackScreenProps<StackNavigation, "Usuarios">;
export type ProdutosProps = NativeStackScreenProps<StackNavigation, "Produtos">

const { Navigator, Screen } = createNativeStackNavigator<StackNavigation>();

const PrivateRoutes = () =>{
    return(
        <Navigator initialRouteName="Home">
            <Screen name="Home" component={Home} options={{headerShown:false, animation:"slide_from_left"}}/>
            <Screen name="Produtos" component={ProdutoPrivateScreen} options={{headerShown:false, animation:"slide_from_left"}}/>
            <Screen name="Usuarios" component={Usuario} options={{headerShown:false, animation:"slide_from_left"}}/>
        </Navigator>
    )
}

export default PrivateRoutes;