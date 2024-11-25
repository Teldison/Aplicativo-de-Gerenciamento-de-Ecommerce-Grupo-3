import React, { useContext, useEffect, useState } from 'react';
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
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp, DrawerActions } from '@react-navigation/native';
import { CustomButton } from './CustomButton';
import { RootStackParamList } from '../types/rootStackParamList';
import { getUsuarios } from '../services/usuarios/usuarioService';
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Header: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

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
        closeModal();
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      console.error(err);
    } 
    finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    authContext?.singOut();
    setUser(null);
    closeModal();
    Alert.alert("Sucesso","Usuário deslogado com sucesso")
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}/>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.dispatch(DrawerActions.openDrawer)}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.marca}>
          <Image
            source={{ uri: "https://i.imgur.com/zhLHvjs.png" }}
            style={styles.logo}
          />
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
          {user ? (
            <Ionicons name="person-circle" size={35} color="white" />
          ) : (
            <Ionicons name="person-add" size={30} color="white" />
          )}
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
                {user ? (
                  <>
                    <Ionicons name="person-circle" size={40} color="black" />
                    <Text style={styles.modalTitle}>Informações do Usuário</Text>
                    <Text style={styles.userInfo}>Nome: <Text style={styles.userInfoHighlight}>{user.usuario}</Text></Text>
                    <Text style={styles.userInfo}>Email: <Text style={styles.userInfoHighlight}>{user.email}</Text></Text>
                    <CustomButton title="Sair" onPress={handleLogout} />
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#141414',
    height: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 10,
  },
  marca: {
    flexDirection: 'row',
  },
  logo: {
    width: 70,
    height: 70,
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  userInfoHighlight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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