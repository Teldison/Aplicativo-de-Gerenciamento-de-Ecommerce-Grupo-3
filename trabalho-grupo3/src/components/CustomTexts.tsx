import { StyleSheet, Text } from "react-native"

interface Texto {
    text: string
}

export const CustomText = ({ text }: Texto) => {
    return(
        <Text style={style.texto}>
            {text}
        </Text>
    )  
}

const style = StyleSheet.create({
    texto:{
        flex:1,
        textAlign:"center",
        fontSize: 20,
        fontWeight:"bold",
        
    }
})