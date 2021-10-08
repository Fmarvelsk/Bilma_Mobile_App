import React from 'react'
import { StyleSheet, Image } from 'react-native'

export default function CustomImage({src, index}) {
    return (
        <Image source={{uri : src}} key={index} style={styles.image}/>
    )
}

const styles = StyleSheet.create({
image:{
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginTop: 20,
    marginRight: 10,
    borderRadius: 1000
    
}
})