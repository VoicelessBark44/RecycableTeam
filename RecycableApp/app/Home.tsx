import React from 'react';
import { Pressable, Text, View, StyleSheet} from "react-native";
import { TouchableOpacity, GestureHandlerRootView} from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

function Home(){

    const navigation = useNavigation<any>();

    const userData = {
        Data1: '1',
        Data2: true
    };

    var LoginButton = 
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login", { userData })}>
        <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
        
    var PatientSignUpButton = 
    <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate("PatientSignUp", {userData})}>
        <Text style={styles.buttonText}>Patient Sign Up</Text>
    </TouchableOpacity>

    var FamilyRegisterButton = 
    <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate("TestFamilyRegister", {userData})}>
        <Text style={styles.buttonText}>Family Register</Text>
    </TouchableOpacity>
        
    var SearchButton =
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Search", { userData })}>
        <Text style={styles.buttonText}>Search</Text>
    </TouchableOpacity>

    var displayButtons = () => {
        var buttonsArray = []
        buttonsArray.push(LoginButton, PatientSignUpButton, FamilyRegisterButton, SearchButton)
        return (
            <View style={styles.buttonContainer}>
                {buttonsArray.map((item, i) => <View key={i}>{item}</View>)}
            </View>
        )
    }

    var displayHeader = () => {
        return(
            <View style={styles.header}><Text style={styles.headerText}>Hi, Gregory</Text></View>
        )
    }

    return (
            
        <GestureHandlerRootView style={styles.container}>
            {displayHeader()}
            {displayButtons()}
        </GestureHandlerRootView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#bfefff",
        //backgroundColor: "#ededed"
    },
    header: {
        padding: '5%'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 30
    },
    buttonContainer: {
        flexDirection: 'column',
    },
    button: {
        width: '90%',
        backgroundColor: "lightblue",
        padding: 10,
        margin: 10,
        borderRadius: 8,
        alignSelf: 'center',
        
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default Home;