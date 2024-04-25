import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';

function Profile({navigation, route}){

    const { id } = useLocalSearchParams();
    const {patient} = route.params;

    // all buttons
    var button_PatientInfo =
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("PatientInfo", { patient: patient })}
        >
            <Text style={styles.buttonText}>Patient Info</Text>
        </TouchableOpacity>

    var button_EMR =
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("EMR", { patient: patient })}
        >
            <Text style={styles.buttonText}>EMR</Text>
        </TouchableOpacity>
    
    var button_HealthHistory =
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("HealthHistory", { patient: patient })}
        >
            <Text style={styles.buttonText}>Health History</Text>
        </TouchableOpacity>

    var button_Family = 
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Family", { patient: patient })}
        >
            <Text style={styles.buttonText}>Family</Text>
        </TouchableOpacity>
    
    var button_MedicalDiagnosis = 
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("MedicalDiagnosis", { patient: patient })}
        >
            <Text style={styles.buttonText}>Medical Diagnosis</Text>
        </TouchableOpacity>
    
    var button_LabTests = 
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("LabTest", { patient: patient })}
        >
            <Text style={styles.buttonText}>Lab Tests</Text>
        </TouchableOpacity>
    
    var button_Prescription = 
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Prescription", { patient: patient })}
        >
            <Text style={styles.buttonText}>Prescription</Text>
        </TouchableOpacity>
    
    var button_Analytics = 
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Analytics", { patient: patient })}
        >
            <Text style={styles.buttonText}>Analytics</Text>
        </TouchableOpacity>

    // displays all buttons from array
    var displayButtons = () => {
        var row = []
        var buttonsArray = []
        buttonsArray.push(button_EMR, button_HealthHistory, button_MedicalDiagnosis, button_LabTests, button_Prescription, button_Analytics)

        for(let i = 0 ; i < buttonsArray.length ; i+=2){
            buttonsArray.slice(i, i+1).map((item, j) => {
                row.push(
                    <View style = {styles.row} key={j}>
                        {item}{buttonsArray[i+1]}
                    </View>
                )
            })
        }
        return (
            <View style={styles.buttonContainer}>
                {row.map((item, i) => <View key={i}>{item}</View>)}
            </View>
        )
        
    }

    return (
        <ScrollView style={styles.container}>
            {displayButtons()}
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#bfefff",
    },
    buttonContainer: {
        //flexDirection: 'column',
        margin: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    button: {
        width: '50%',
        backgroundColor: "lightblue",
        padding: 10,
        margin: 10,
        borderRadius: 8,
        justifyContent: 'center'
        //alignSelf: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
});

export default Profile;