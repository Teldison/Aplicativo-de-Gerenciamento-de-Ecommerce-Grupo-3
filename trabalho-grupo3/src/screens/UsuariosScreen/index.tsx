import { StyleSheet, View } from "react-native"
import { CustomText } from "../../components/CustomTexts"
import { CustomButton } from "../../components/CustomButton"
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/rootStackParamList";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";



export const Usuario = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();    
    const {isLogged} : {isLogged:boolean} = useContext(AuthContext) ??{
        isLogged:false,
    };
    
    return (
        <View style={styles.container}>
            <CustomText text="Usuários" />
            <CustomButton title="Voltar" onPress={()=> navigation.navigate("Home")} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6e2900",
    },
})