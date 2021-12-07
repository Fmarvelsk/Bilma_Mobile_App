import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import bell from '../assets/bell.png'
import sech from '../assets/search.png'
import Search from "./Searchbar";
import CustomImage from "./CustomImage";
import Header from "./Header";
import { db } from "../firebase";

const { width } = Dimensions.get("window")
const height = width * 0.25

const image = [
    {
        url: `data:image/png;base64,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`,
        label: "Carpenter",
    },
    {
        url: "data:image/png;base64,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",
        label: "Plumber"
    },
    {
        url: "data:image/png;base64,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",
        label: "Traders"
    },
    {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScCajsUwpJWtbeFk32-NmEItYlgw793POkbQ&usqp=CAU",
        label: "Painter",
    },
    {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6tf4QJTMu7SKKTKW2HwyLU2iDlx6NDpwncw&usqp=CAU",
        label: "Laundry"
    },
    {
        url: "https://master--angry-easley-9e0fe2.netlify.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-3.jpg&w=1080&q=100",
        label: "Cleaner"
    },

]

export default function HomeHeaderView({ navigation, children, header }) {
    const [search, setSearch] = useState('')

    function searchEngine(search) {
        db.collection('documents').where('Category', '>=', search)
            .get().then((snapshot) => {
                let data = snapshot.docs.map((snap) => {
                    const result = snap.data()
                    const id = snap.id
                    console.log(result)
                    return { result, ...id }
                })
                setSearch(data)
            })
    }

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
                            onChange={(value) => searchEngine(value)}
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
                {header && (<View style={{paddingHorizontal: 20}}><Text>Recommended</Text></View>)}
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