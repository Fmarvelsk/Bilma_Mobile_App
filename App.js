import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccessScreen from './screens/AccessScreen';
import { ErrorHandler } from './utils/HandleError';
import Profile from './screens/Profile';
import HomeStack from './screens/HomeStack';

export default function App() {
  const [user, setUser] = useState(false)
  const Stack = createNativeStackNavigator()
  const Tab = createBottomTabNavigator()

  return (
    <ErrorHandler>
      <NavigationContainer>
        {!user ?
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name="Access"
              children={() => <AccessScreen setUser={setUser} />}
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
                  <Image source={require('./assets/home.png') }/>
                )
              }}
              children={() => <HomeStack/>}
            />
            <Tab.Screen
              name="Favourite" component={Profile} />
            <Tab.Screen
              name="Profile" component={Profile} />

          </Tab.Navigator> 
          
          </>)}

      </NavigationContainer>
    </ErrorHandler>
  );
}

