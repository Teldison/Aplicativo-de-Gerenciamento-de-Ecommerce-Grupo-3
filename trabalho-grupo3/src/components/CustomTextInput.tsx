import { StyleSheet, View } from "react-native";

interface CustomTextInput {
    placeholder : string,
    value: string,
    onChangeText: (text: string)=> void,
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
    width: '100%',
    height: 40,
    borderColor: '#8B4513', 
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
},

})