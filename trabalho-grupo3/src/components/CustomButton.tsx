import { StyleSheet, TouchableOpacity, Text } from "react-native"

interface CustomButtonProps {
    title: string,
    onPress: () => void,
}

export const CustomButton = ({ title, onPress }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        
    },
})