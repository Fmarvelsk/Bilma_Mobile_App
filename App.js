import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccessScreen from './screens/AccessScreen';
import Home from './screens/HomeScreen';
import { ErrorHandler } from './utils/HandleError';

export default function App() {
const [user, setUser] = useState(false)
const Stack = createNativeStackNavigator()

  return (<>
  <ErrorHandler>
    <NavigationContainer>
      <Stack.Navigator>
        { !user ? 
        <Stack.Screen
        options={{
          headerShown: false
        }} 
        name="Access" 
        children={() => <AccessScreen setUser={setUser}/>}
        /> :

        <Stack.Screen
        options={{
          headerShown: false
        }}
        name="Home"
        component={Home}/> }
      </Stack.Navigator>
      
    </NavigationContainer>
    </ErrorHandler>
    </>
  );
}

