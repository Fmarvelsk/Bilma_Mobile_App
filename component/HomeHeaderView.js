import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import bell from '../assets/bell.png'
import sech from '../assets/search.png'
import Search from "./Searchbar";
import CustomImage from "./CustomImage";
import Header from "./Header";

const { width } = Dimensions.get("window")
const height = width * 0.23

const image = [
    {
        url: "https://master--angry-easley-9e0fe2.netlify.app/nextimg/%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg/1080/100?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg&w=1080&q=100",
        label: "Capenter",
    },
    {
        url: "https://master--angry-easley-9e0fe2.netlify.app/nextimg/%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-5.jpg/1080/100?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-5.jpg&w=1080&q=100",
        label: "Plumber"
    },
    {
        url: "https://master--angry-easley-9e0fe2.netlify.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-3.jpg&w=1080&q=100",
        label: "Cleaner"
    },
    {
        url: "https://master--angry-easley-9e0fe2.netlify.app/nextimg/%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg/1080/100?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg&w=1080&q=100",
        label: "Capenter",
    },
    {
        url: "https://master--angry-easley-9e0fe2.netlify.app/nextimg/%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-5.jpg/1080/100?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-5.jpg&w=1080&q=100",
        label: "Plumber"
    },
    {
        url: "https://master--angry-easley-9e0fe2.netlify.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-3.jpg&w=1080&q=100",
        label: "Cleaner"
    },

]

export default function HomeHeaderView({ navigation, children }) {
    const [search, setSearch] = useState('')

    return (
        <>

            <ScrollView style={style.scroll}>
                <LinearGradient colors={['#F5F5F573', '#D7D7D780']} style={style.topColor}>

                    <View style={style.topNav}>
                        <View>
                            <Text style={style.txt}>Location</Text>
                            <Text>Ile-Ife</Text>
                        </View>
                        <Image source={bell} width={24} height={24} />
                    </View>


                    <View style={style.inputField}>
                        <Search
                            style={style.search}
                            text={"What do you need?"}
                            onChange={(value) => setSearch(value)}
                            value={search}
                        />

                        <Image source={sech} style={{ position: 'absolute', top: 12, left: 10 }} width={20} width={20} />
                        {
                            search ?
                                <TouchableOpacity
                                    onPress={() => setSearch('')}
                                    style={style.vwClear}
                                >
                                </TouchableOpacity>
                                :
                                <View
                                    style={style.vwClear}
                                />
                        }

                    </View>

                </LinearGradient>

                <View style={style.container}>
                    <View style={{ justifyContent: 'space-between', display: 'flex', flexDirection: "row" }}>
                        <Header>
                            Categories
                        </Header>

                        <TouchableOpacity>
                            <Text style={{ color: '#76A0F3' }}>See all</Text>
                        </TouchableOpacity>

                    </View>
                    <View>

                        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ width, height }}>
                            {image.map((image, i) => (
                                <CustomImage url src={image.url} key={i} text={image.label} navigation={navigation} />
                            ))}
                        </ScrollView>
                    </View>
                </View>

                <View style={style.container}>
                    {children}
                </View>
            </ScrollView>
        </>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    topColor: {
        alignItems: 'center',
        paddingTop: '10%',
        paddingBottom: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    topNav: {
        justifyContent: 'space-between',
        width: '85%',
        flexDirection: "row"
    },
    vwClear: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {
        borderRadius: 11,
        width: "70%",
        height: 45,
        marginTop: 40,
        backgroundColor: 'transparent',
        borderWidth: 0.5,

    },
    scroll: {
        flexGrow: 1,
        backgroundColor: '#fff'
    },
    search: {
        padding: 10,
        height: 45,
        marginLeft: 40,
        fontSize: 12
    },
    txt: {
        color: 'rgba(0, 0, 0, 0.4)',
        fontSize: 12
    }

})