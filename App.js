import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccessScreen from './src/screens/AccessScreen';
import { ErrorHandler } from './src/utils/HandleError';
import Profile from './src/screens/Profile';
import HomeStack from './src/screens/HomeStack';
import { Provider } from "react-redux";
import { store } from "./src/store";
import Favourite from './src/screens/Favourite';

export default function App() {
  const [user, setUser] = useState(true)
  const Stack = createNativeStackNavigator()
  const Tab = createBottomTabNavigator()

  return (
    <Provider store={store}>
    <ErrorHandler>
      <NavigationContainer>
        {!user ?
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name="Access"
              children={(props) => <AccessScreen {...props} setUser={setUser} />}
            />
          </Stack.Navigator> :

          (<> 
            <Tab.Navigator /*tabBar={(props) => <CustomBottomNav {...props} />}*/>
            <Tab.Screen
              name="HomeStack"
              options={{
                headerShown: false,
                tabBarLabel:"Home",
                tabBarIcon: ({size, focused}) => (
                  <Image source={require('./src/assets/home.png') }/>
                )
              }}
              children={() => <HomeStack/>}
            />
            <Tab.Screen
            options={{
              headerShown: false,
              tabBarLabel:"Favourite",
              tabBarIcon: ({size, focused}) => (
                <Image source={require('./src/assets/favourite.png') }/>
              )
            }}
           
              name="Favourite" component={Favourite} />
            <Tab.Screen
              name="Profile" 
              options={{
                headerShown: false,
                tabBarLabel:"Profile",
                tabBarIcon: ({size, focused}) => (
                  <Image source={require('./src/assets/user.png') }/>
                )
              }}
              component={Profile} />

          </Tab.Navigator> 
          
          </>)}

      </NavigationContainer>
    </ErrorHandler>
    </Provider>
  );
}

