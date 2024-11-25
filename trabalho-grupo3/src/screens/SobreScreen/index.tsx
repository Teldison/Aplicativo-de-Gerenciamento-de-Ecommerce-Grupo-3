import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Header } from '../../components/Header';
import { CustomText } from '../../components/CustomTexts';

const adm1 = require('../../../assets/lucas.jpg');
const adm2 = require('../../../assets/vinicius.jpg');
const adm3 = require('../../../assets/heytor.jpg');
const adm4 = require('../../../assets/rafael.jpg');
const adm5 = require('../../../assets/mateus.jpg');
const adm6 = require('../../../assets/samuel.jpg');

const administradores = [
  { id: 1, nome: 'Lucas Coco', imagem: adm1},
  { id: 2, nome: 'Vinicius Ramos', imagem: adm2},
  { id: 3, nome: 'Heytor Cantelmo', imagem: adm3},
  { id: 4, nome: 'Rafael Januzzi ', imagem: adm4},
  { id: 5, nome: 'Mateus Azevedo', imagem: adm5},
  { id: 6, nome: 'Samuel Teldison', imagem: adm6},
];

export function Sobre() {
  return (
    <>
      <Header/>
      <ScrollView contentContainerStyle={styles.sobreContainer}>
        <CustomText
          text='Sobre'
        />
        <Text style={styles.paragraph}>
          Fundada em 2024, nossa empresa é especializada na venda de bebidas
          artesanais de alta qualidade. Valorizamos ingredientes frescos, métodos
          tradicionais e inovação para oferecer aos nossos clientes uma
          experiência única em cada garrafa. Nosso compromisso é com a
          sustentabilidade e a satisfação dos nossos consumidores.
        </Text>

        <Text style={styles.subtitle}>Nossos Administradores</Text>
        <View style={styles.administradoresContainer}>
          {administradores.map((adm) => (
            <View key={adm.id} style={styles.administradorCard}>
              <Image source={adm.imagem} style={styles.admImage} />
              <Text style={styles.admName}>{adm.nome}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sobreContainer: {
    padding: 16,
    backgroundColor: '#3b2112',
    flexGrow: 1,
  },
  title: {
    marginTop: 14,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: "white",
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 24,
    color: 'white',
  },
  subtitle: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: "white",
  },
  administradoresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  administradorCard: {
    width: '48%',
    backgroundColor: '#6e2900',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  admImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  admName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#FFF',
  },
});