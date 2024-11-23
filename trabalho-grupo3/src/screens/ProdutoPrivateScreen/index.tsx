import { Button, FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert, Modal, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { createProdutos, getProdutos, deleteProdutos, updateProdutos } from '../../services/produtoService';
import { Produto, ProdutoEditado } from '../../types/types';
import { CustomButton } from '../../components/CustomButton';

export const ProdutoPrivateScreen = () => {
  const [produto, setProduto] = useState<Produto>({
    id: undefined,
    nome: '',
    preco: 0,
    descricao: '',
  });
  const [loading, setLoading] = useState(true);
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const [isEditing, setIsEditing] = useState<ProdutoEditado>({
    item: undefined,
    editando: false,
  });
  const [modalVisivel, setModalVisivel] = useState(false);
  
  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    setLoading(true);
    try {
      const produtosApi = await getProdutos();
      setListaProdutos(produtosApi);
      console.log('Produtos: ', produtosApi);
    } 
    catch (err) {
      console.log('Erro ao carregar produtos: ', err);
      Alert.alert('Erro', 'Não foi possível carregar a lista de produtos');
    }
    setLoading(false);
  };

  const adicionarProduto = async () => {
    if (produto.nome === '') {
      Alert.alert('Atenção', 'Por favor, insira um nome para o produto.');
      return;
    }

    try {
      const novoProdutoApi = await createProdutos(produto);
      setListaProdutos([...listaProdutos, novoProdutoApi]);

      setProduto({ id: undefined, nome: '', preco: 0, descricao: '' });
      setModalVisivel(false);
      Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
    } 
    catch (err) {
      console.log('Erro ao adicionar produto: ', err);
      Alert.alert('Erro', 'Não foi possível adicionar o produto.');
    }
  };

  const deletarProduto = async (id: number) => {
    try {
      await deleteProdutos(id);
      const listaFiltrada = listaProdutos.filter(
          (item) => item.id !== id
      );
      setListaProdutos(listaFiltrada);
      Alert.alert('Sucesso', 'Produto deletado com sucesso!');
    } 
    catch (err) {
      console.log('Erro ao deletar produto: ', err);
      Alert.alert('Erro', 'Não foi possível deletar o produto.');
    }
  };

  const editarProduto = (itemProduto: Produto) => {
    setIsEditing({
      item: itemProduto,
      editando: true,
    });
    setProduto(itemProduto);
    setModalVisivel(true);
  };

  const salvarEdicao = async () => {
    if (!produto.id) {
      console.error('Erro: o id do produto com id não existe');
      return;
    }
    try {
      const produtoEditado = await updateProdutos(produto);
      const listaAtualizada = listaProdutos.map((item) => {
        return item.id === produto.id ? produtoEditado : item;
      });
      setListaProdutos(listaAtualizada);
      setProduto({ id: undefined, nome: '', preco: 0, descricao: '' });
      setIsEditing({
        item: undefined,
        editando: false,
      });
      setModalVisivel(false);
      Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao salvar edição de produto: ' + err);
      Alert.alert('Erro', 'Não foi possível atualizar o produto.');
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.containerInput}>
          <Button title="Adicionar Produto" onPress={() => {
            setProduto({ id: undefined, nome: '', preco: 0, descricao: '' });
            setIsEditing({ item: undefined, editando: false });
            setModalVisivel(true);
          }} 
          />
        </View>
          {loading?
          (<ActivityIndicator size="large" color="#000" />)
          :(
            <FlatList
              style={styles.lista}
              data={listaProdutos}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText} numberOfLines={2}>
                    {item.nome}
                    {item.preco}
                  </Text>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => editarProduto(item)}>
                      <FontAwesome name="pencil" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => item.id !== undefined && deletarProduto(item.id)}>
                      <FontAwesome name="trash-o" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id?.toString() || Math.random().toString()} 
            />)}

        <Modal visible={modalVisivel} animationType='slide' transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalConteudo}>
              <Text>Nome do Produto</Text>
              <TextInput
                style={styles.input}
                value={produto.nome}
                onChangeText={(text) => setProduto({ ...produto, nome: text })}
                placeholder="Nome do produto"
              />
              <Text>Preço do Produto</Text>
              <TextInput
                style={styles.input}
                value={produto.preco ? produto.preco.toString() : ''}
                onChangeText={(text) => setProduto({ ...produto, preco: parseFloat(text) || 0 })}
                placeholder="Preço do produto"
                keyboardType="numeric"
              />
              <Text>Descrição do Produto</Text>
              <TextInput
                style={styles.input}
                value={produto.descricao}
                onChangeText={(text) => setProduto({ ...produto, descricao: text })}
                placeholder="Descrição do produto"
              />
              <Button
                title={isEditing.editando ? 'Salvar Alterações' : 'Adicionar Produto'}
                onPress={isEditing.editando ? salvarEdicao : adicionarProduto}
              />
              <Button
                title="Cancelar"
                onPress={() => {
                  setModalVisivel(false);
                  setIsEditing({ item: undefined, editando: false });
                  setProduto({ id: undefined, nome: '', preco: 0, descricao: '' });
                }}
              />
            </View>
          </View>
        </Modal>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50
  },
  containerInput: {},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 6,
    padding: 8,
  },
  lista: {
    marginTop: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'steelblue',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontWeight: '500',
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalConteudo: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    elevation: 5,
  },
});