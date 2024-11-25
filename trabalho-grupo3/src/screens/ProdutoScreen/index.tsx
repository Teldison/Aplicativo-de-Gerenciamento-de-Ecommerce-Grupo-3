import { Button, FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert, Modal, ActivityIndicator, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { createProdutos, getProdutos, deleteProdutos, updateProdutos } from '../../services/produtos/produtoService';
import { Produto, ProdutoEditado } from '../../types/types';
import { CustomButton } from '../../components/CustomButton';

// Importar imagens usando require

const madeira = require('../../../assets/images/madeira.png');
const imagem1 = require('../../../assets/images/imagem1.png');
const imagem2 = require('../../../assets/images/imagem2.png');
const imagem3 = require('../../../assets/images/imagem3.png');
const imagem4 = require('../../../assets/images/imagem4.png');


export const ProdutoScreen = () => {
  const [produto, setProduto] = useState<Produto>({
    id: undefined,
    nome: '',
    preco: 0,
    descricao: '',
    imagem: null
  });
  const [loading, setLoading] = useState(true);
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const [isEditing, setIsEditing] = useState<ProdutoEditado>({
    item: undefined,
    editando: false,
  });
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalImagensVisivel, setModalImagensVisivel] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Produto[]>([]);

  useEffect(() => {
    buscarProdutos();
  }, []);

  useEffect(() => {
    const fetchProdutos = async () => {
      const produtos = await getProdutos();
      setProduto(produto);
      setFilteredProducts(produtos);
    };
    fetchProdutos();
  }, []);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    const filtered = listaProdutos.filter((produto) =>
      produto.nome.toLowerCase().includes(text.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(text.toLowerCase()) ||
      produto.preco.toString().includes(text)
    );
    setFilteredProducts(filtered);
  };

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

      setProduto({ id: undefined, nome: '', preco: 0, descricao: '', imagem: null });
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
      setProduto({ id: undefined, nome: '', preco: 0, descricao: '', imagem: null });
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

  const selecionarImagem = (imagem: any) => {
    setProduto({ ...produto, imagem });
    setModalImagensVisivel(false);
  };

  return (
    <View style={styles.container}>
       <TextInput
        style={styles.input}
        placeholder="Buscar produto"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        style={styles.lista}
        data={listaProdutos}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
          <Image source={madeira} style={styles.backgroundImage} />
          {item.imagem ? (
            <Image source={item.imagem} style={styles.imagemProduto} />
          ) : (
            <View style={styles.semImagem}>
              <Text style={styles.semImagemTexto}>Sem imagem</Text>
            </View>
          )}
          <Text style={styles.itemNome} numberOfLines={1}>
            {item.nome}
          </Text>
          <Text style={styles.itemPreco} numberOfLines={1}>
            R$ {item.preco.toFixed(2)}
          </Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => editarProduto(item)}>
              <FontAwesome name="pencil" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => item.id !== undefined && deletarProduto(item.id)}>
              <FontAwesome name="trash" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        )}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()} 
      />
      <View style={styles.containerButton}>
        <CustomButton
          title='Adicionar Produto'
          onPress={() => {
            setProduto({ id: undefined, nome: '', preco: 0, descricao: '', imagem: null });
            setIsEditing({ item: undefined, editando: false });
            setModalVisivel(true);
          }}
        />
      </View>

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
            <CustomButton
              title='Selecionar Imagem'
              onPress={() => setModalImagensVisivel(true)}
            />
            {produto.imagem ? (
              <Image source={produto.imagem} style={styles.previewImagem} />
            ) : null}
            <CustomButton
              title={isEditing.editando ? 'Salvar Alterações' : 'Adicionar Produto'}
              onPress={isEditing.editando ? salvarEdicao : adicionarProduto}
            />
            <CustomButton
              title='Cancelar'
              onPress={() => {
                setModalVisivel(false);
                setIsEditing({ item: undefined, editando: false });
                setProduto({ id: undefined, nome: '', preco: 0, descricao: '', imagem: null });
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={modalImagensVisivel} animationType='slide' transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalImagensConteudo}>
            <ScrollView>
           
              <TouchableOpacity onPress={() => selecionarImagem(imagem1)}>
                <Image source={imagem1} style={styles.previewImagem} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selecionarImagem(imagem2)}>
                <Image source={imagem2} style={styles.previewImagem} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selecionarImagem(imagem3)}>
                <Image source={imagem3} style={styles.previewImagem} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selecionarImagem(imagem4)}>
                <Image source={imagem4} style={styles.previewImagem} />
              </TouchableOpacity>

            </ScrollView>
            <CustomButton
              title='Cancelar'
              onPress={() => setModalImagensVisivel(false)}
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
    padding: 19,
    marginTop: 0,
    justifyContent: 'flex-end',
    backgroundColor: '#6e2900',
  },
  containerButton: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginBottom: 6,
    padding: 8,
  },
  lista: {
    flex: 1,
    marginTop: 28,
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: '#3b1e00',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    overflow: 'hidden', 
    position: 'relative', 
  },
  imagemProduto: {
    width: '100%',
    height: '70%',
    borderRadius: 8,
    resizeMode: 'contain', 
  },
  semImagem: {
    width: '100%',
    height: '70%',
    borderRadius: 8,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  semImagemTexto: {
    color: '#999',
  },
  itemNome: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#ffffff',
    marginTop: 10,
    fontFamily: 'Georgia', 
  },
  itemPreco: {
    fontWeight: '500',
    fontSize: 20,
    color: '#292929',
    marginTop: 5,
    fontFamily: 'Georgia', 
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  iconButton: {
    marginHorizontal: 10, 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalConteudo: {
    margin: 20,
    backgroundColor: '#6e2900',
    borderRadius: 10,
    padding: 35,
    elevation: 5,
  },
  modalImagensConteudo: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  previewImagem: {
    width: '60%',
    height: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '110%',
    height: '110%',
    resizeMode: 'cover', 
    borderRadius: 8,
  },
});