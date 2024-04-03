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
import MedicalDiagnosis from './MedicalDiagnosis';
import LabTest from './LabTest';
import Prescription from './Prescription';
import Analytics from './Analytics';
import EMR from './EMR';

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
                <Stack.Screen name = 'MedicalDiagnosis' component={MedicalDiagnosis} options={{ title: "Medical Diagnosis Page" }} />
                <Stack.Screen name = 'LabTest' component={LabTest} options={{ title: "Lab Test Page" }} />
                <Stack.Screen name = 'Prescription' component={Prescription} options={{ title: "Prescription Page" }} />
                <Stack.Screen name = 'Analytics' component={Analytics} options={{ title: "Analytics Page" }} />
                <Stack.Screen name = 'EMR' component={EMR} options={{ title: "EMR Page" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default index;