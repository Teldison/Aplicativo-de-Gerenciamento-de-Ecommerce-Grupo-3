import React, { useContext, useEffect, useState } from "react";
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
import usuarioService, { getUsuarios } from "../../services/usuarios/usuarioService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
 
export const Login = ({ navigation }: Props) => {
  const [usuario, setUsuario] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const authContext = useContext(AuthContext);
  
  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  const fazerLogin = async () => {
    if (!usuario || !senha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      const response = await getUsuarios();
      const user = response.find(
        (user: { nome: string; senha: string }) =>
          user.nome === usuario && user.senha === senha
      );

      if (!user) {
        Alert.alert('Erro', 'Usuário ou senha incorretos.');
      } else {
        Alert.alert('Sucesso', `Bem-vindo, ${user.nome}!`);
        console.log('Usuario logado: ' + user.nome);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        authContext?.singIn(user);
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      console.error(err);
    } 
    finally {
      setLoading(false);
    }
  };
  
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