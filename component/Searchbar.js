import React, {useState} from 'react'
import { TextInput } from "react-native"


export default function Search({text, onChange, value, style}){
    
    return(
    <TextInput
    style={style}
    placeholder={text}
    onChangeText={onChange}
    value={value}
  />)
}
