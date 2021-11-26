import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import HomeHeaderView from "../component/HomeHeaderView";
import Header from '../component/Header'
import pic from '../assets/pic.png'
import { Rating } from 'react-native-ratings';

const STAR = require('../assets/star.png')

export default function Category({ navigation }) {

    return (
        <HomeHeaderView navigation={navigation}>
            <View >
                <Header>
                    Recommeded
                </Header>
                <View style={style.category}>
                    <Image style={style.img_prop} source={pic} />
                    <View style={style.pos}>
                        <Text>Rating</Text>
                        <Rating
                            type="custom"
                            imageSize={10}
                            onFinishRating={(value) => console.log(value)}
                            style={{ paddingVertical: 10 }}
                        />
                        <Text>Rate</Text>

                    </View>
                </View>


                <View style={style.category}>
                    <Image style={style.img_prop} source={pic} />
                    <View style={style.textside}>
                        <View>
                            <Text style={{ fontSize: 14 }}>Rating</Text>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <Rating
                                    type="custom"
                                    imageSize={14}
                                    ratingImage={STAR}
                                    style={{ paddingVertical: 10, left: -4 }}
                                    ratingBackgroundColor="#f4f4f4"
                                    ratingColor="blue"
                                    ratingCount={1}
                                    readonly={true}
                                />
                                <Text>4.9</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 14 }}>Rate</Text>
                        </View>
                    </View>
                </View>
            </View>
        </HomeHeaderView>
    )
}

const style = StyleSheet.create({
    category: {
        backgroundColor: '#F4F4F4',
        height: 134,
        width: 300,
        marginTop: 20,
        marginLeft: 40,
        left: 16,
        position: 'relative'
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