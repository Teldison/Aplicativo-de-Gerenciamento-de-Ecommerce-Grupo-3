import { Button, StyleSheet, View } from "react-native"
import { CustomText } from "../../components/CustomTexts"
import { Header } from "../../components/Header"

export const Home = () => {


    return(
        <View style={styles.container}>
            <Header/>
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