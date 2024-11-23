import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import { CustomButton } from './CustomButton';
import { RootStackParamList } from '../types/rootStackParamList';
import { getUsuarios } from '../services/usuarioService';
import { AuthContext } from '../contexts/AuthContext';


export const Header: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn }:any = useContext(AuthContext);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const closeModal = () => {
    setModalVisible(false);
    setUsuario('');
    setSenha('');
  };

  const fazerLogin = async () => {
    if (!usuario || !senha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
        // const response = await getUsuarios();
        const response = await axios.get('https://673c71de96b8dcd5f3fa1070.mockapi.io/cadastro');
        const cadastro = response.data as { usuario: string; senha: string }[];

      const user = cadastro.find(
        (user) => user.usuario === usuario && user.senha === senha
      );
      if (!user){
        Alert.alert('Erro', 'Usuário ou senha incorretos.');
      }
      if (user) {
        Alert.alert('Sucesso', `Bem-vindo, ${user.usuario}!`);
        closeModal();
      }
    } 
    catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.marca}>
          <Text style={styles.title}>Bebidas</Text>
          <Text style={styles.title}>Show</Text>
        </View>
        {}
        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="person" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Entre na sua conta!</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Usuário"
                    value={usuario}
                    onChangeText={setUsuario}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  secureTextEntry={true}
                  value={senha}
                  onChangeText={setSenha}
                />
                <View style={styles.buttonContainer}>
                  {loading ? (
                    <ActivityIndicator size="large" color="#000" />
                  ) : (
                    <CustomButton
                      title="Entrar"
                      onPress={fazerLogin}
                    />
                  )}
                  <CustomButton
                    title="Cadastro"
                    onPress={() => {
                      closeModal();
                      navigation.navigate('Cadastro');
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000000c8',
        padding: 10,
    },
    marca: {
        flexDirection: 'row',
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconButton: {
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: '#D2B48C',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#8B4513', 
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
});