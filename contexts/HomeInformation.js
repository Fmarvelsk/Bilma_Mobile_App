import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import CustomImage from "../component/CustomImage";
import Header from "../component/Header";


const {width} = Dimensions.get("window")
const height = width * 100 / 0.5

const image = [
    "https://master--angry-easley-9e0fe2.netlify.app/nextimg/%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg/1080/100?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg&w=1080&q=100",
    "https://master--angry-easley-9e0fe2.netlify.app/nextimg/%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-5.jpg/1080/100?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-5.jpg&w=1080&q=100",
    "https://master--angry-easley-9e0fe2.netlify.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-3.jpg&w=1080&q=100",
    "https://master--angry-easley-9e0fe2.netlify.app/nextimg/%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg/1080/100?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg&w=1080&q=100",
    "https://master--angry-easley-9e0fe2.netlify.app/nextimg/%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-5.jpg/1080/100?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-5.jpg&w=1080&q=100",
    "https://master--angry-easley-9e0fe2.netlify.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-3.jpg&w=1080&q=100",
    "https://master--angry-easley-9e0fe2.netlify.app/nextimg/%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg/1080/100?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg&w=1080&q=100",
    "https://master--angry-easley-9e0fe2.netlify.app/nextimg/%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-5.jpg/1080/100?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-5.jpg&w=1080&q=100",
    "https://master--angry-easley-9e0fe2.netlify.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-3.jpg&w=1080&q=100",

]

export default function HomeInformation() {
//   const [search, setSearch] = useState('')
    
    return(
        <View style={style.container}>
            <Header>
                Categories
               
            </Header>
            <View>
            <ScrollView horizontal style={{width, height}}>
                    {image.map((image, i) => (
                        <CustomImage src={image} index={i}/>
                    ))}
            </ScrollView>
        </View>
                  </View>
         )
}

const style = StyleSheet.create({
container : {
    flex : 1,
    padding: 20
}
})