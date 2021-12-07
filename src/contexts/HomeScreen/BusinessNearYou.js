import React from "react";
import { View, Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import Header from "../../component/Header";
import poster from '../../assets/poster.png'
import CustomImage from "../../component/CustomImage";
import jaypee from "../../assets/jaypee.jpeg"
import dec from "../../assets/dec.jpeg"
import endYear from "../../assets/endYear.jpeg"

const { width } = Dimensions.get("window")
const height = width * 0.5

const image = [poster, jaypee, dec]

export default function BusinessNearYou() {
    return (
        <View style={{ marginTop: 10 }}>
            <Header>
                Near You
            </Header>
            <View style={styles.Viewimage}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ width, height }}>
                    {image.map((image, i) => (
                        <CustomImage src={image} key={i} />
                    ))}
                </ScrollView>

            </View>

            <View style={{ marginTop: 20 }}>
                <Header>Amazing Offers</Header>
                <View style={{ marginTop: 20 }}>
                    <Image style={styles.offer} source={dec} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Image style={styles.offer} source={endYear} />
                </View>
           
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    Viewimage: {
        marginTop: 20,
        marginBottom: 10,
        flexDirection: "row"
    },
    offer: {
        width: "100%",
        height: 320,
        borderRadius: 25
    },
    text: {
        marginRight: 15
    }
})