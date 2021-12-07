import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, SafeAreaView } from "react-native";
import HomeHeaderView from "../component/HomeHeaderView";
import Header from '../component/Header'
import pic from '../assets/pic.png'
import { Rating } from 'react-native-ratings';
import { db } from "../firebase";
import { useSelector } from "react-redux"

const STAR = require('../assets/star.png')

export default function Category({ navigation }) {
    const [loading, setLoading] = useState(false)
    const { category } = useSelector(s => s.rootReducer)
    const [categoryList, setCategoryList] = useState()

    const fetchCategory = useCallback(async () => {
        setLoading(true)
        try {
            await db.collection('data').where('Category', '==', `${category}`)
                .get().then((snapshot) => {
                    let data = snapshot.docs.map((snap) => {
                        const result = snap.data()
                        const id = snap.id
                        return { result, id }
                    })
                    setCategoryList(data)
                })
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false)
    }, [category])


    useEffect(() => {
        fetchCategory()
    }, [fetchCategory])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {!loading ?
                (


                        <FlatList
                              ListHeaderComponent={() => <HomeHeaderView navigation={navigation} header/>}
                            nestedScrollEnabled
                            style={{backgroundColor: '#fff'}}
                            data={categoryList}
                            renderItem={({ item, index }) => (
                                <View style={{paddingLeft: 50}}>
                                <View style={style.favcon}>
                                    <View style={{ flexDirection: 'row', paddingVertical: 20, position: 'relative' }}>
                                        <Image style={style.fav} source={{ uri: 'https://www.superprof.ng/images/teachers/teacher-home-interactive-illustrative-teachings-with-complex-subjects-made-basic-possible-anatomy-and-physiology-for-basic-medical.jpg' }} />
                                        <View style={{ lineHeight: 10, width: '55%' }}>
                                            <Text style={{ fontSize: 16, fontWeight: '500', paddingBottom: 3 }}>Brooklyn Simmons</Text>
                                            <Text style={{ fontSize: 14, fontWeight: '100', color: '#808080', paddingBottom: 20 }}>Tutor</Text>
                    
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text>Rating</Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Rating
                                                            type="custom"
                                                            imageSize={16}
                                                            ratingImage={STAR}
                                                            style={{ paddingVertical: 10, left: -4 }}
                                                            ratingBackgroundColor="#f4f4f4"
                                                            ratingColor="blue"
                                                            ratingCount={1}
                                                            readonly={true}
                                                        />
                                                        <Text>4.6</Text>
                    
                                                    </View>
                                                </View>
                                                
                                            <View>
                                                <Text>Hourly Rate</Text>
                                                </View>
                    
                                            </View>
                    
                                        </View>
                                    </View>
                                </View>
                                </View>
                            )}

                        />

                )
                : (<View style={{ flex: 1, justifyContent: "center" }}><ActivityIndicator size="large" color="#0000ff" />
                </View>)}
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
  
    fav: {
        width: 120,
        height: 120,
        borderRadius: 10,
        left: -30
    },
    favcon: {
        marginTop: 40,
        backgroundColor: '#F4F4F4',
        borderRadius: 10
    }, 
})