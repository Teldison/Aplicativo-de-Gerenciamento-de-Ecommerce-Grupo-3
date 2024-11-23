import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps,
  } from "@react-navigation/native-stack";
  import { Login } from "../screens/LoginScreen";
  import { Cadastro } from "../screens/CadastroScreen";
import { Home } from "../screens/HomeScreen";
import { ProdutoPrivateScreen } from "../screens/ProdutoPrivateScreen";
  
  type StackNavigation = {
    Home: undefined,  
    Login: undefined,
    Cadastro: undefined,
    Produtos: undefined,
  }
  
  export type StackTypes = NativeStackNavigationProp<StackNavigation>;
  export type LoginProps = NativeStackScreenProps<StackNavigation, "Login">
  export type CadastroProps = NativeStackScreenProps<StackNavigation, "Cadastro">
  export type ProdutosProps = NativeStackScreenProps<StackNavigation, "Produtos">

  const { Navigator, Screen } = createNativeStackNavigator<StackNavigation>();
  
  const PublicRoutes = () => {
      return(
          <Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
            <Screen name="Login" component={Login}/>
            <Screen name="Cadastro" component={Cadastro} options={{headerShown: false, animation:"slide_from_left"}}/>
            <Screen name="Home" component={Home} options={{headerShown:false, animation:"slide_from_left"}}/>
            <Screen name="Produtos" component={ProdutoPrivateScreen}/>
          </Navigator>
      )
  }
  
  export default PublicRoutes;