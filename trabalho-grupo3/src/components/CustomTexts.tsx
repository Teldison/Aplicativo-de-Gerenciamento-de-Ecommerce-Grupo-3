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
        padding:10,
        color:"white",
        textAlign:"center",
        fontSize: 34,
        fontWeight:"bold",
        textTransform:"capitalize",
    }
})