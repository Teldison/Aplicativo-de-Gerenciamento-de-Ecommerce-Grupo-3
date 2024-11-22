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
import axios from "axios"; 
import { RootStackParamList } from "../../routes/rotas";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export const Login = ({ navigation }: Props) => {
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
    }
    catch (err) {
      Alert.alert("Erro de conexão com o servidor");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textoForm}>Seja Bem-vindo(a)</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#AAA"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#AAA"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}        
      />
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
      <TouchableOpacity style={styles.button} onPress={fazerLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
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
    alignItems: "center",
    padding: 20,
    backgroundColor: "#6e2900",
  },
  cadastrar: {
    color: "#bbb",
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#292929",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#FF6F61",
    borderRadius: 8,
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  textoForm: {
    fontSize: 24,    
    marginBottom: 24,
    fontWeight: "bold",
    color: "#fff"
  },
});