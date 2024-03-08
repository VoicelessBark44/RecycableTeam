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

const Stack = createNativeStackNavigator();

function index(){
    return(
        <NavigationContainer independent = {true}>
            <Stack.Navigator initialRouteName = 'Home'>
                <Stack.Screen name = 'Home' component = {Home} options = {{title: "Home Screen"}}/>
                <Stack.Screen name = 'UserPage' component={UserPage} options={{ title: "User Page" }} />
                <Stack.Screen name = 'Profile' component={Profile} options={{ title: "Profile Page" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default index;