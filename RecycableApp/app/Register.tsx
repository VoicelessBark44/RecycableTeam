import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import firebase from './Firebase.js'
import { collection, addDoc, setDoc, doc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";

const Register = ({ navigation, route }) => {

    const auth = getAuth(firebase);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleRegister = () => {
        // Add your registration logic here
        if (email !== confirmEmail) {
            alert('Emails do not Match! \n Please try again');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match! \n Please Try again');
            return;
        } else {

            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const uid = userCredential.user.uid;
                navigation.navigate("Login");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                return 1;
            });
        return 0;
        }
        alert("Something went wrong. Please enter account info again");
        return 1;
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Email"
                onChangeText={setConfirmEmail}
                value={confirmEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry
            />

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

export default Register;