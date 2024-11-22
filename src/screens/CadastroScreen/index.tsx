import React, { useState } from "react";
import { 
  Alert, 
  Button, 
  TextInput, 
  View, 
  StyleSheet, 
  ActivityIndicator,
  Text, 
  TouchableOpacity
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/rotas";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "Cadastro">;

export const Cadastro = ({ navigation }: Props) => {
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const fazerCadastro = async () => {
    if (!nome || !usuario || !email || !senha || !confirmaSenha) {
      Alert.alert("Por favor, preencha todos os campos!");
      return;
    }
    if (senha !== confirmaSenha) {
      Alert.alert("Os campos 'Senha' e 'Confirmar Senha' são diferentes!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://673c71de96b8dcd5f3fa1070.mockapi.io/cadastro", {
       nome,
       usuario,
       email,
       senha,
      });

      if (response.status === 201) {
        Alert.alert("Usuário cadastrado com sucesso!");
        navigation.navigate("Login"); // Volta para a tela de Login.
      } else {
        Alert.alert("Erro ao cadastrar", response.data.message || "Erro desconhecido");
      }
    } catch (err) {
      Alert.alert("Erro na conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textoForm}>Crie sua conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#AAA"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#AAA"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#AAA"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#AAA"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#AAA"
        secureTextEntry
        value={confirmaSenha}
        onChangeText={setConfirmaSenha}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={fazerCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Já possui conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#6e2900",
    alignItems: "center"
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#2C2C3A",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#444"
  },
  textoForm: {
    fontSize: 24,    
    marginBottom: 24,
    fontWeight: "bold",
    color: "#fff"
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF6F61",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 8    
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  loginText: {
    marginTop: 16,
    color: "#bbb",
    fontSize: 14,
    textDecorationLine: "underline"
  }
});