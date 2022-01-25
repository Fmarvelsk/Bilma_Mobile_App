import React, { useEffect, useState, useCallback } from "react";
import { Image, View, LogBox, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccessScreen from "./screens/AccessScreen";
import Profile from "./screens/Profile";
import HomeStack from "./screens/HomeStack";
import { useDispatch, useSelector } from "react-redux";
import Favourite from "./screens/Favourite";
import { db, auth } from "./firebase";
import { logoutProfile, saveUser, saveUserId } from "./store/action";

export default function MobileIndex() {
  const { user } = useSelector(s => s.rootReducer)
  const dispatch = useDispatch()
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [loading, setLoading] = useState(false)
  
  const fetchUserProfile = useCallback(async () => {

    try {
      if(user){
      await db.collection('profiles').doc(user)
        .get().then(snap => {
          dispatch(saveUser(snap.data()))
        })
        
       }
      return 
    }
    catch (err) {
      console.log(err)
    }
  }, [user])

  useEffect(() => {
    fetchUserProfile()
  }, [fetchUserProfile])

  

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Access"
            children={() => <AccessScreen />}
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
                  <Image source={require("./assets/home.png")} />
                ),
              }}
              children={() => <HomeStack />}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarLabel: "Favourite",
                tabBarIcon: ({ size, focused }) => (
                  <Image source={require('./assets/favourite.png')} />
                )
              }}

              name="Favourite" component={Favourite} />
            <Tab.Screen
              name="Profile"
              options={{
                headerShown: false,
                tabBarLabel: "Profile",
                tabBarIcon: ({ size, focused }) => (
                  <Image source={require('./assets/user.png')} />
                )
              }}
              component={Profile} />
          </Tab.Navigator>
        </>
      )}
      
    </NavigationContainer>
  );
}
