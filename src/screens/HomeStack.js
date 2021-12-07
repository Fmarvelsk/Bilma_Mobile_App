import React from 'react';
import Home from './HomeScreen';
import Category from './Category';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryId from './CategoryId';
import BusinessProfile from './BusinessProfile';

export default function HomeStack() {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="Home"
                component={Home}
            />
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="Category"
                component={Category}
            />

            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="CategoryId"
                component={CategoryId}
            />
            <Stack.Screen

                options={{
                    headerShown: false
                }}
                name="BusinessProfile"
                component={BusinessProfile}
            />
        </Stack.Navigator>


    )
}

