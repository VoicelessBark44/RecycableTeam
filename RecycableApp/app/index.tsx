import React from 'react';
import {Pressable, Text, View} from "react-native";
import { Link , router } from "expo-router";

//navigation
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from"@react-navigation/native-stack";

//screens
import Home from './Home';
import Profile from './Profile';
import UserPage from "./users/[id]";
import Tracking from './Tracking';
import Login from './Login';

const Stack = createNativeStackNavigator();

function index(){
    return(
        <NavigationContainer independent = {true}>
            <Stack.Navigator initialRouteName = 'Home'>
                <Stack.Screen name = 'Home' component = {Home} options = {{title: "Home Screen"}}/>
                <Stack.Screen name = 'UserPage' component={UserPage} options={{ title: "User Page" }} />
                <Stack.Screen name = 'Profile' component={Profile} options={{ title: "Profile Page" }} />
                <Stack.Screen name = 'Tracking' component={Tracking} options={{ title: "Tracking Page"}} />
                <Stack.Screen name = 'Login' component={Login} options={{ title: "Login Page"}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default index;