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
  }
  
  export type StackTypes = NativeStackNavigationProp<StackNavigation>;
  export type LoginProps = NativeStackScreenProps<StackNavigation, "Login">
  export type CadastroProps = NativeStackScreenProps<StackNavigation, "Cadastro">
  export type HomeProps = NativeStackScreenProps<StackNavigation, "Home">

  const { Navigator, Screen } = createNativeStackNavigator<StackNavigation>();
  
  const PublicRoutes = () => {
      return(
          <Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
            <Screen name="Home" component={Home} options={{headerShown:false, animation:"slide_from_left"}}/>
            <Screen name="Login" component={Login}/>
            <Screen name="Cadastro" component={Cadastro} options={{headerShown: false, animation:"slide_from_left"}}/>
          </Navigator>
      )
  }
  
  export default PublicRoutes;