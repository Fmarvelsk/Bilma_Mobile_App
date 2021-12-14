import React from "react";
import { View, Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import Header from "../../component/Header";
import sweet from "../../assets/sweet.jpeg";
import CustomImage from "../../component/CustomImage";
import jaypee from "../../assets/jaypee.jpeg";
import endYear from "../../assets/endYear.jpeg";
import dec from "../../assets/dec.jpeg";
import lush from "../../assets/lush.jpg";

const { width } = Dimensions.get("window");
const height = width * 0.5;

const image = [
  {
    id: "yFrmi9QaAKw1Eg388Ddb",
    img: sweet,
  },
  {
    id: "EoqryJ9g6z0U7bALkQpA",
    img: jaypee,
  },
  {
    id: "xNlKLYGa25o8XicijR2M",
    img: lush,
  },
];

export default function BusinessNearYou() {
  return (
    <View style={{ marginTop: 10 }}>
      <Header>Near You</Header>
      <View style={styles.Viewimage}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ width, height }}
        >
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
  );
}

const styles = StyleSheet.create({
  Viewimage: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
  },
  offer: {
    width: "100%",
    height: 320,
    borderRadius: 25,
  },
  text: {
    marginRight: 15,
  },
});
