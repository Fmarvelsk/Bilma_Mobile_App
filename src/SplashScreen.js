import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MobileIndex from "./MobileIndex";
import { auth } from "./firebase";
import { saveUserId } from "./store/action";
//import Bubble from "./bubble";


const SplashScreen = () => {
  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        var uid = user.uid;
        saveUserId(uid)
        setIsLoading(false)
      } else {
       // dispatch((logoutProfile()))
        setIsLoading(false)
      }
    });

  }, [])


  return (
<>
{loading ? 
    <View style={{ flex: 1, position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
    : 
    <MobileIndex/>}
    </>
  );
};

//make this component available to the app
export default SplashScreen;