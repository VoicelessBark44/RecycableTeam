import React from 'react';
import { Pressable, Text, View, StyleSheet} from "react-native";
import { TouchableOpacity, GestureHandlerRootView} from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

function LoginHome({route}){

    const navigation = useNavigation<any>();

    const { userData } = route.params;

    console.log('Test: ', userData.firstName);

    var ProfileButton = 
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profile", { userData })}>
        <Text>Profile</Text>
    </TouchableOpacity>

    var LoginButton = 
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login", { userData })}>
        <Text>Login</Text>
    </TouchableOpacity>

    var TrackingButton = 
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Tracking", { userData })}>
        <Text>Tracking</Text>
    </TouchableOpacity>
        
    var PatientSignUpButton = 
    <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate("PatientSignUp", {userData})}>
        <Text>Patient Sign Up</Text>
    </TouchableOpacity>

    var FamilyRegisterButton = 
    <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate("TestFamilyRegister", {userData})}>
        <Text>Family Register</Text>
    </TouchableOpacity>
        
    var SearchButton =
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Search", { userData })}>
        <Text>Search</Text>
    </TouchableOpacity>

return (
    <View style={styles.container}>
        {/* Display Hello message with user's first name */}
        <Text style={styles.greetingText}>Hello, {userData.firstName}</Text>
        <GestureHandlerRootView>
            {PatientSignUpButton}
            {FamilyRegisterButton}
            {SearchButton}
        </GestureHandlerRootView>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#bfefff",
    },
    button: {
        backgroundColor: "lightblue",
        padding: 10,
        margin: 10,
        borderRadius: 8,
        textAlign: 'center',
    },
    greetingText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default LoginHome;