import React, { useContext, useState } from "react";
import { 
  Alert, 
  Button, 
  TextInput, 
  View, 
  StyleSheet,
  ActivityIndicator, 
  TouchableOpacity, 
  Text,
} from "react-native";
import axios from "axios"; 
import { RootStackParamList } from "../../types/rootStackParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthContext } from "../../contexts/AuthContext";
import usuarioService, { getUsuarios } from "../../services/usuarioService";
import Usuario from "../../models/Usuario";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
 export const Login = ({ navigation }: Props) => {
   const [usuario, setUsuario] = useState<string>(""); 
   const [senha, setSenha] = useState<string>(""); 
   const [loading, setLoading] = useState<boolean>(false); 
   const { signIn }:any = useContext(AuthContext); 
   
   const fazerLogin = async () => { 
      if (!usuario || !senha) {
        Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
        return;
      }
      setLoading(true);
  
      try {
        const response = await getUsuarios();
        const user = response.find(
          (user: { usuario: string; senha: string }) =>
            user.usuario === usuario && user.senha === senha
        );
  
        if (user) {
          Alert.alert('Login realizado com sucesso!', `Bem-vindo, ${user.usuario}`);
          signIn();
          navigation.navigate('Home');
          return;
        } else {
          Alert.alert('Login ou senha estão incorretos');
        }
      }
      catch (err) {
        Alert.alert('Erro de conexão com o servidor');
        console.error(err);
      } 
      finally {
        setLoading(false);
      }
  };

  
    //   setLoading(true); 
  //   try { 
  //     const user: Usuario | null = await usuarioService.login({ email: usuario, senha });
      
  //     if (user) {
  //         signIn(user);
  //         Alert.alert("Login realizado com sucesso!", `Bem-vindo, ${user}`); 
  //         navigation.navigate("Home"); 
  //     } 
  //     else {
  //        Alert.alert("Login ou senha estão incorretos");
  //        } 
  //     } 
  //     catch (err) {
  //         console.error("Erro ao fazer login: ", err);
  //         Alert.alert("Erro de conexão com o servidor"); 
  //     } 
  //     finally {
  //        setLoading(false);
  //     }
  
      // const response = await axios.get("https://673c71de96b8dcd5f3fa1070.mockapi.io/cadastro");
      // const response = await getUsuarios();
      // const cadastro = response.data;
      
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}        
      />
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <Button title="Entrar" onPress={fazerLogin}/>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.cadastrar}>Ainda não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  cadastrar: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});