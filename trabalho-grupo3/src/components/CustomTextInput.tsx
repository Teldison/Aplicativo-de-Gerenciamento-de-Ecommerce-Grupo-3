import { StyleSheet, View } from "react-native";

interface CustomTextInput {
    placeholder : string,
    value: string,
    onChangeText: string,
}

export const CustomTextInput = ({placeholder, value, onChangeText} : CustomTextInput) =>{
    return(
        <CustomTextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
        />
    )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
    borderRadius: 10,
    borderColor: "#ccc",
  },

})