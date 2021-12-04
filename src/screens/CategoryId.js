import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator } from "react-native";
import HomeHeaderView from "../component/HomeHeaderView";
import Header from '../component/Header'
import pic from '../assets/pic.png'
import { Rating } from 'react-native-ratings';
import { db } from "../firebase";
import { useSelector } from "react-redux"
import jaypee from "../assets/jaypee.jpeg"


const STAR = require('../assets/star.png')

export default function CategoryId({ navigation }) {
    const [loading, setLoading] = useState(false)
    const sel = useSelector(s => s)


    return (
        <View>
            <Image style={style.img_cat} source={jaypee} />
            
            <View style={{marginTop: 40}}>
            <ActivityIndicator/>
            <Text>Name</Text>
            </View>
        
         </View>)
}

const style = StyleSheet.create({
    img_cat: {
        height: 320,
        width: "100%",
    },
    textside: {
        paddingLeft: 120,
        paddingTop: 80,
        paddingRight: 13,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    img_prop: {
        left: -60,
        position: 'absolute'

    },
    pos: {
        position: "absolute",
        bottom: 5,
        left: '40%'
    }
})