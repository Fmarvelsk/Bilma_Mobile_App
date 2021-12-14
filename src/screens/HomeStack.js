import React, { useEffect, useRef, useState, useCallback } from 'react';
import Home from './HomeScreen';
import Category from './Category';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryId from './CategoryId';
import BusinessProfile from './BusinessProfile';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { saveUserFavourite } from "../store/action";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function HomeStack() {
    const Stack = createNativeStackNavigator()
    const { user } = useSelector(s => s.rootReducer)
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            if (token)
                await db.collection('profiles').doc(user).set({ token }, { merge: true })

        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    const fetchUserFavorite = useCallback(async () => {
        setLoading(true)
        try {
            await db.collection('profiles').doc(user)
                .get().then(snap => {
                    if (snap.data().favourite)
                        saveUserFavourite(snap.data().favourite)
                    setLoading(false)
                })
        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }
    }, [user])

    useEffect(() => {
        fetchUserFavorite()
    }, [fetchUserFavorite])

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

