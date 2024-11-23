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
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#8B4513',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#5A2D0C',
    },
    title: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
})