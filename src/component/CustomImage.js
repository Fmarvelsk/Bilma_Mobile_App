import React from 'react'
import { StyleSheet, Image, Text, View, TouchableWithoutFeedback } from 'react-native'
import { getSelectedCategory } from '../store/action'

export default function CustomImage({ src, url, text, navigation }) {
    function goToCategory() {
        getSelectedCategory(text)
        navigation.push('Category')
    }
    return (
        <>
            {url ?
                (<TouchableWithoutFeedback onPress={goToCategory}>
                    <View style={styles.text}>
                        <View>
                        <Image source={{ uri: src }} style={styles.image} />
                        </View>
                        <Text style={{ textAlign: 'center'}}>{text}</Text>
                    </View>
                </TouchableWithoutFeedback>)
                :
                (<TouchableWithoutFeedback>
                    <View style={styles.text}>

                        <Image source={src.img} style={styles.Nearimage} />
                    </View>
                </TouchableWithoutFeedback>)}
        </>)
}


const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginTop: 10,
        marginRight: 5,
        borderRadius: 1000

    },
    Nearimage: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 25
    },
    text: {
        marginRight: 20,
    },
    
})