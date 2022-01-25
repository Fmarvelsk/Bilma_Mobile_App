import React, { useState, useCallback, useEffect, useRef } from "react";
import { Image, View, LogBox } from "react-native";
import { ErrorHandler } from "./src/utils/HandleError";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "./src/store";
import { useFonts } from "expo-font";
import SplashScreen from "./src/SplashScreen";


export default function App() {
  const [userAuth, setUserAuth] = useState(false);
 // const {user}  = useSelector(s => s.rootReducer)

  const [fontsLoaded] = useFonts({
    Lato: require("./src/assets/fonts/Lato-Regular.ttf"),
    Lato_bold: require("./src/assets/fonts/Lato-Bold.ttf"),
  });


  LogBox.ignoreLogs(['Setting a timer for a long period of time'])
  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
      <Provider store={store}>
        <ErrorHandler>
          <SplashScreen/>
        </ErrorHandler>
      </Provider>
    );
  }
}
