import React from 'react'
import { StyleSheet, Image, Text, View, TouchableWithoutFeedback } from 'react-native'

export default function CustomImage({ src, url, text, navigation }) {
    return (
        <TouchableWithoutFeedback onPress={() => navigation.push('Category')}>
            <View style={styles.text}>
                {url ?
                    <Image source={{ uri: src }} style={styles.image} />
                    : <Image source={src} />}
                <Text>{text}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
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
    text: {
        marginRight: 15
    }
})