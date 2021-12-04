import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
//import Bubble from "./bubble";
const SplashScreen = ({ navigation }) => {
  
  return (
    <View style={styles.container}>
  {/*    <Bubble length={120} />
      <Bubble length={20} neg />
  <Bubble length={80} />*/}

      <Text
        style={{ fontSize: 24, color: "white", fontFamily: "Poppins_medium" }}>
      Kilonta
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#264653",
  },
});

//make this component available to the app
export default SplashScreen;