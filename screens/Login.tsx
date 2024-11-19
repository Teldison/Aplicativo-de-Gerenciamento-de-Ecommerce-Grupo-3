import React, { useState } from "react";
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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import axios from "axios"; // Ajuste o caminho conforme sua estrutura.

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: Props) => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const fazerLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://673c71de96b8dcd5f3fa1070.mockapi.io/cadastro");
      const cadastro = response.data;

      const user = cadastro.find(
        (user: { usuario: string; senha: string }) => 
          user.usuario === usuario && user.senha === senha
      );

      if (user) {
        Alert.alert("Login realizado com sucesso!", `Bem-vindo, ${user.usuario}`);
         // aqui carregar a proxima tela
      } else {
        Alert.alert("Login ou senha estão incorretos");
      }
    } catch (err) {
      Alert.alert("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}        
      />
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <Button title="Entrar" onPress={fazerLogin} />
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
  input: {
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    borderColor: "#ccc",
  },
  cadastrar: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});

export default Login;