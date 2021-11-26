import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import HomeHeaderView from "../component/HomeHeaderView";
import BusinessNearYou from "../contexts/HomeScreen/BusinessNearYou";


export default function Home({ navigation }) {
   
    return (
        <HomeHeaderView navigation={navigation}>
         
                <BusinessNearYou/>
         
          </HomeHeaderView>
    )
}

const style = StyleSheet.create({
  
})