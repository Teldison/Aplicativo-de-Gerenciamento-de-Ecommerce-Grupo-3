import { StyleSheet, View } from "react-native"
import { CustomText } from "../../components/CustomTexts"
import { CustomButton } from "../../components/CustomButton"

export const Usuario = () => {
    return (
        <View style={styles.container}>
            <CustomText text="Usuários" />
            <CustomButton title="Voltar" onPress={() => { }} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6e2900",
    },
})