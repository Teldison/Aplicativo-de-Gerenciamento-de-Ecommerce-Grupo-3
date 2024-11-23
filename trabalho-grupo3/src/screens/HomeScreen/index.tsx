import { Button, StyleSheet, Text, View } from "react-native"
import { Header } from "../../components/Header"
import { CustomButton } from "../../components/CustomButton"
import { RootStackParamList } from "../../types/rootStackParamList";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CustomText } from "../../components/CustomTexts";

export const Home = () => {

const navigation = useNavigation<NavigationProp<RootStackParamList>>();    

return(
        <View style={styles.container}>
            <Header/>
            <CustomText
                text="GESTÃO DO ESTOQUE DE BEBIDAS VIKING'S BAR"
            />
            <CustomButton
                title="Produtos"
                onPress={()=> navigation.navigate("Produtos")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#6e2900",
    },
    header:{
        
    },
})