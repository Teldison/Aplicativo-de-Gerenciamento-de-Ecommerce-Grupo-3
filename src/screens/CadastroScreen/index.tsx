import React, { useState } from "react";
import { 
  Alert, 
  Button, 
  TextInput, 
  View, 
  StyleSheet, 
  ActivityIndicator 
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
       confirmaSenha
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
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmaSenha}
        onChangeText={setConfirmaSenha}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <Button title="Cadastrar" onPress={fazerCadastro} />
      )}
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
});