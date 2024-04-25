import React from 'react';
import {ImageBackground, Pressable, Text, View} from "react-native";
import { Link , router } from "expo-router";

//navigation
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from"@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screens
import Home from './Home';
import Profile from './Profile';
import UserPage from "./users/[id]";
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

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='HomeInitial'
            screenOptions={{
                headerTintColor: 'white',
                headerBackTitle: 'Back',
                headerStyle: {
                    backgroundColor: '#095d7e',
                },
            }}>
            <Stack.Screen
                name='Home' component={Home} options={{ title: "Home Screen" }} />
            <Stack.Screen name='UserPage' component={UserPage} options={{ title: "User Page" }} />
            <Stack.Screen name='Login' component={Login} options={{ title: "Login Page" }} />
            <Stack.Screen name='Register' component={Register} options={{ title: "Register Page" }} />
            <Stack.Screen name='PatientSignUp' component={PatientSignUp} options={{ title: "Patient Sign Up Page" }} />
            <Stack.Screen name='TestFamilyRegister' component={TestFamilyRegister} options={{ title: "Test Family Register" }} />
            <Stack.Screen name='Search' component={Search} options={{ title: "Search Page" }} />
        </Stack.Navigator>
    )
}

const AppointmentStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='AppointmentsInitial'
            screenOptions={{
                headerTintColor: 'white',
                headerBackTitle: 'Back',
                headerStyle: {
                    backgroundColor: '#095d7e'
                }
            }}>
            <Stack.Screen name='Appointments' component={Appointments} options={{ title: "Appointments Page" }} />
            <Stack.Screen name='BookAppointment' component={BookAppointment} options={{ title: "Book Appointment Page" }} />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='ProfileInitial'
            screenOptions={{
                headerTintColor: 'white',
                headerBackTitle: 'Back',
                headerStyle: {
                    backgroundColor: '#095d7e'
                }
            }}>
            <Stack.Screen name='Profile' component={Profile} options={{ title: "Profile Page" }} />
            <Stack.Screen name='PatientInfo' component={PatientInfo} options={{ title: "Patient Info Page" }} />
            <Stack.Screen name='EMR' component={EMR} options={{ title: "EMR Page" }} />
            <Stack.Screen name='HealthHistory' component={HealthHistory} options={{ title: "Health History Page" }} />
            <Stack.Screen name='Family' component={Family} options={{ title: "Family Page" }} />
            <Stack.Screen name='MedicalDiagnosis' component={MedicalDiagnosis} options={{ title: "Medical Diagnosis Page" }} />
            <Stack.Screen name='LabTest' component={LabTest} options={{ title: "Lab Test Page" }} />
            <Stack.Screen name='Prescription' component={Prescription} options={{ title: "Prescription Page" }} />
            <Stack.Screen name='Analytics' component={Analytics} options={{ title: "Analytics Page" }} />
            
        </Stack.Navigator>
    )
}

function TabNavigator(){
    return (
        <Tab.Navigator
            initialRouteName='TabNavigatorInitial'
            screenOptions={{
                headerShown: false,
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: '#095d7e',
                    height: 70,
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'gray',
                tabBarActiveBackgroundColor: '#042835',
                tabBarInactiveBackgroundColor: '#095d7e',
                tabBarLabelStyle: {
                    fontSize: 15,
                    textAlign: 'center',
                    textAlignVertical: 'center'
                }
            }}>
                <Tab.Screen
                    options={{
                        title: 'Home',
                        tabBarIcon: () => {
                            return (
                                <ImageBackground
                                    style = {{width: 30, height: 30}}
                                    source={require('./images/Home.png')}>
                                </ImageBackground>
                            )
                        }
                    }}
                    name="HomeTabScreen"
                    component={HomeStack}
                />
                <Tab.Screen
                    options={{
                        title: 'Appointments',
                        tabBarIcon: () => {
                            return (
                                <ImageBackground
                                    style={{ width: 30, height: 30 }}
                                    source={require('./images/Appointment.png')}>
                                </ImageBackground>
                            )
                        }
                    }}
                    name = "AppointmentsTabScreen"
                    component={AppointmentStack}
                />
            <Tab.Screen
                options={{
                    title: 'Profile',
                    tabBarIcon: () => {
                        return (
                            <ImageBackground
                                style={{ width: 30, height: 30 }}
                                source={require('./images/Profile.png')}>
                            </ImageBackground>
                        )
                    }
                }}
                name="ProfileTabScreen"
                component={ProfileStack}
            />
        </Tab.Navigator>
    )
}

function index(){
    return(
        <NavigationContainer independent = {true}>
            <TabNavigator/>
        </NavigationContainer>
    )
}

export default index;