import { Button, StyleSheet, Text, View } from "react-native"
import { Header } from "../../components/Header"
import { CustomButton } from "../../components/CustomButton"
import { RootStackParamList } from "../../types/rootStackParamList";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CustomText } from "../../components/CustomTexts";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Home = () => {

const navigation = useNavigation<NavigationProp<RootStackParamList>>();    
    const {isLogged} : {isLogged:boolean} = useContext(AuthContext) ??{
        isLogged:false,
    };

return(
        <View style={styles.container}>
            <Header/>
            {!isLogged ? (
                <View style={styles.naoLogado}>
                    <Text style={styles.Alerta}>Faça Login para ter acesso ao painel de controle</Text>
                    <CustomButton
                        title="Login"
                        onPress={()=> navigation.navigate("Login")}
                    />
                </View>
            ):(               
                <View style={styles.logado}>
                    <CustomText text="painel de controle interno"/>
                    <CustomText text="escolha um dos menus"/>
                    <CustomButton
                        title="Produtos"
                        onPress={()=> navigation.navigate("Produtos")}
                    />
                    <CustomButton
                        title="Usuarios"
                        onPress={()=> navigation.navigate("Usuarios")}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#6e2900",
    },
    naoLogado:{
        flex:0.9,
        justifyContent: "center",
        alignItems: "center",        margin:10,
    },
    Alerta:{
        color: "#ff0000",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
    logado:{
        flex:0.5,
        justifyContent: "center",
        alignItems: "center",
    },
})