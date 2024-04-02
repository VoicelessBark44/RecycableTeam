import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import firebase from './Firebase.js'
import { collection, addDoc, setDoc, doc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import DateTimePicker from '@react-native-community/datetimepicker';

const PatientSignUp = ({ navigation, route }) => {

    const auth = getAuth(firebase);

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [userName, setUserName] = useState('');
    const [medicalID, setMedicalID] = useState('');
    
    function generateRandomString() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < 9; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    }

    function generateUsername(firstName, lastName, birthYear) {
        return `${firstName.toLowerCase()}${lastName.toLowerCase()}${birthYear}`;
    }
    
    const handleRegister = async () => {

        const birthYear = new Date(birthDate).getFullYear();

        const newUsername = generateUsername(firstName, lastName, birthYear);
        const newMedicalID = generateRandomString();

        setUserName(newUsername);
        setMedicalID(newMedicalID);

        Alert.alert(
            'Registration Successful',
            `Username: ${newUsername}\nMedical ID: ${newMedicalID}`,
            [{ text: 'OK' }],
            { cancelable: false }
          );

    }
    

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={setFirstName}
                value ={firstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Middle Name or Initial"
                onChangeText={setMiddleName}
                value ={middleName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={setLastName}
                value ={lastName}
            />
            <DateTimePicker
                value={birthDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || birthDate;
                  setBirthDate(currentDate);
                }}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#bfefff", // Light blue background color
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
        width: "80%",
    },
    button: {
        backgroundColor: "lightblue",
        padding: 10,
        margin: 10,
        borderRadius: 8,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default PatientSignUp;