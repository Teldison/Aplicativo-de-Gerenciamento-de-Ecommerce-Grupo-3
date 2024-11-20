import { Button, FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from 'axios';

const URL = "https://673bbe8b96b8dcd5f3f74f7e.mockapi.io/api/produtos";

export const Produto = () => {
  const [produto, setProduto] = useState("");
  const [listaProdutos, setListaProdutos] = useState<any[]>([]);

  
  const buscarProdutos = async () => {
    try {
      const { data } = await axios.get(URL);
      setListaProdutos(data);
      console.log("Produtos carregados: ", data);
    } catch (err) {
      console.log("Erro ao carregar produtos: ", err);
    }
  };

  const adicionarProduto = async () => {
    if (produto === "") {
      Alert.alert("Atenção", "Por favor, insira um nome para o produto.");
      return;
    }

    const novoProduto = {
      titulo: produto, 
    };

    try {
      const { data } = await axios.post(URL, novoProduto);
      setListaProdutos([...listaProdutos, data]); 
      Alert.alert("Sucesso", "Produto adicionado com sucesso!");
      setProduto("");
    } catch (err) {
      console.log("Erro ao adicionar produto: ", err);
      Alert.alert("Erro", "Não foi possível adicionar o produto.");
    }
  };

  const deletarProduto = async (id: number) => {
    try {
      await axios.delete(`${URL}/${id}`);
      const listaFiltrada = listaProdutos.filter((item) => item.id !== id);
      setListaProdutos(listaFiltrada);
      Alert.alert("Sucesso", "Produto deletado com sucesso!");
    } catch (err) {
      console.log("Erro ao deletar produto: ", err);
      Alert.alert("Erro", "Não foi possível deletar o produto.");
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={produto}
          onChangeText={setProduto}
          placeholder="Nome do produto"
        />
        <Button title="Adicionar Produto" onPress={adicionarProduto} />
      </View>

      <FlatList
        style={styles.lista}
        data={listaProdutos}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText} numberOfLines={1}>
              {item.titulo}
            </Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <FontAwesome name="pencil" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletarProduto(item.id)}>
                <FontAwesome name="trash-o" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => (item?.id ? item.id.toString() : Math.random().toString())} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    
  },
  containerInput: {
   
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    
    marginBottom: 6,
  },
  lista: {
    marginTop: 8,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "steelblue",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontWeight: 500,
    fontSize: 18,
    color: "#fff",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
