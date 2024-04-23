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
import MedicalDiagnosis from './MedicalDiagnosis';
import LabTest from './LabTest';
import Prescription from './Prescription';
import Analytics from './Analytics';
import EMR from './EMR';
import Search from './Search';
import PatientSignUp from './PatientSignUp';
import TestFamilyRegister from './TestFamilyRegister';
import LoginHome from './LoginHome';

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
                <Stack.Screen name = 'TestFamilyRegister' component={TestFamilyRegister} options={{ title: "Test Family Register"}} />
                <Stack.Screen name = 'MedicalDiagnosis' component={MedicalDiagnosis} options={{ title: "Medical Diagnosis Page" }} />
                <Stack.Screen name = 'LabTest' component={LabTest} options={{ title: "Lab Test Page" }} />
                <Stack.Screen name = 'Prescription' component={Prescription} options={{ title: "Prescription Page" }} />
                <Stack.Screen name = 'Analytics' component={Analytics} options={{ title: "Analytics Page" }} />
                <Stack.Screen name = 'EMR' component={EMR} options={{ title: "EMR Page" }} />
                <Stack.Screen name = 'Search' component={Search} options={{ title: "Search Page" }} />
                <Stack.Screen name = 'LoginHome' component={LoginHome} options={{ title: "Login Home" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default index;