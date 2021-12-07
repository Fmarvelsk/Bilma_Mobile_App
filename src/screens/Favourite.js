import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, SafeAreaView } from "react-native";
import { Rating } from "react-native-ratings";

const STAR = require('../assets/star.png')

export default function Favourite({ navigation }) {
    const [loading, setLoading] = useState(false)

    return (
        <SafeAreaView style={style.container}>
            <View style={{paddingLeft: 10}}>
                
            <Text style={{ fontSize: 16, fontWeight: '500' }}>My Favourite</Text>
            </View>
            
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

        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,

    },
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