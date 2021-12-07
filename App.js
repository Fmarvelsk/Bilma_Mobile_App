import React, { useState } from "react";
import { Image, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccessScreen from "./src/screens/AccessScreen";
import { ErrorHandler } from "./src/utils/HandleError";
import Profile from "./src/screens/Profile";
import HomeStack from "./src/screens/HomeStack";
import { Provider } from "react-redux";
import { store, persistor } from "./src/store";
import { useFonts } from "expo-font";
import BusinessProfile from "./src/screens/BusinessProfile";

export default function App() {
  const [user, setUser] = useState(false);
  const [fontsLoaded] = useFonts({
    Lato: require("./src/assets/fonts/Lato-Regular.ttf"),
    Lato_bold: require("./src/assets/fonts/Lato-Bold.ttf"),
  });
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
      <Provider store={store}>
        <ErrorHandler>
          <NavigationContainer>
            {!user ? (
              <Stack.Navigator>
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="Access"
                  children={() => <AccessScreen setUser={setUser} />}
                />
              </Stack.Navigator>
            ) : (
              <>
                <Tab.Navigator /*tabBar={(props) => <CustomBottomNav {...props} />}*/
                >
                  <Tab.Screen
                    name="HomeStack"
                    options={{
                      headerShown: false,
                      tabBarLabel: "Home",
                      tabBarIcon: ({ size, focused }) => (
                        <Image source={require("./src/assets/home.png")} />
                      ),
                    }}
                    children={() => <HomeStack />}
                  />
                  <Tab.Screen name="Favourite" component={Profile} />
                  <Tab.Screen name="Profile" component={Profile} />
                </Tab.Navigator>
              </>
            )}
          </NavigationContainer>
        </ErrorHandler>
      </Provider>
    );
  }
}
