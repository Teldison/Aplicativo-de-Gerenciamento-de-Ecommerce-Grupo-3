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
        height:"25%",
        textAlign:"center",
        fontSize: 45,
        fontWeight:"bold",
        
    }
})