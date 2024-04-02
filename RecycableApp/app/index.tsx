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
import Register from './Register';
import PatientInfo from './PatientInfo';
import Family from './Family';
import HealthHistory from './HealthHistory';
import Appointments from './Appointments';
import BookAppointment from './BookAppointment';
import PatientSignUp from './PatientSignUp';

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
                <Stack.Screen name = 'Register' component={Register} options={{ title: "Register Page"}} />
                <Stack.Screen name = 'PatientInfo' component={PatientInfo} options={{ title: "Patient Info Page" }} />
                <Stack.Screen name = 'Family' component={Family} options={{ title: "Family Page" }} />
                <Stack.Screen name = 'HealthHistory' component={HealthHistory} options={{ title: "Health History Page" }} />
                <Stack.Screen name = 'Appointments' component={Appointments} options={{ title: "Appointments Page" }} />
                <Stack.Screen name = 'BookAppointment' component={BookAppointment} options={{ title: "Book Appointment Page" }} />
                <Stack.Screen name = 'PatientSignUp' component={PatientSignUp} options={{ title: "Patient Sign Up Page"}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default index;