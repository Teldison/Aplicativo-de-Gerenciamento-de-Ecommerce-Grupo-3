import { useState } from "react"
import { StyleSheet, View } from "react-native";

interface TextInput {
    placeholder : string,
    value: string,
    onChangeText: string,
}

export const TextInput = ({placeholder, value, onChangeText} : TextInput) =>{
    return(
        <TextInput
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