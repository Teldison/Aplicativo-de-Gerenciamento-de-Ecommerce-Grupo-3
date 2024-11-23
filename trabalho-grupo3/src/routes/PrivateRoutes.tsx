import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
    NativeStackScreenProps,
  } from "@react-navigation/native-stack";
import { ProdutoPrivateScreen } from "../screens/ProdutoPrivateScreen";

type StackNavigation = {
    Produtos: undefined;
    // Usuarios: undefined;
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>;
export type ProdutosProps = NativeStackScreenProps<StackNavigation, "Produtos">;
// export type UsuariosProps = NativeStackScreenProps<StackNavigation, "Usuarios">;

const { Navigator, Screen } = createNativeStackNavigator<StackNavigation>();

const PrivateRoutes = () =>{
    return(
        <Navigator initialRouteName="Produtos">
            <Screen name="Produtos" component={ProdutoPrivateScreen} options={{headerShown:false, animation:"slide_from_left"}}/>
            {/* <Screen name="Usuarios" component={Usuario} options={{headerShown:false, animation:"slide_from_left"}}/> */}
        </Navigator>
    )
}

export default PrivateRoutes;