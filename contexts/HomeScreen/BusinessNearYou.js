import React from "react";
import { View, Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import Header from "../../component/Header";
import poster from '../../assets/poster.png'
import CustomImage from "../../component/CustomImage";


const { width } = Dimensions.get("window")
const height = width * 0.5  

const image = [poster, poster, poster]

export default function BusinessNearYou(){
    return(
        <View style={{marginTop: 10}}>
            <Header>
                Near You
                </Header>
                <View style={styles.Viewimage}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ width, height }}>
                    {image.map((image, i) => (
                        <CustomImage src={image} key={i}/>
                    ))}
                </ScrollView>
                
                    </View> 

                    <View>
                        <Header>Amazing Offers</Header>
                        </View>          
        </View>
    )
    
}

const styles = StyleSheet.create({
    Viewimage:{
        marginTop : 20,
        marginBottom : 10,
        flexDirection: "row"
    },
    text: {
        marginRight: 15
    }
    })