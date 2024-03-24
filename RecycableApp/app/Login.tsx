import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import firebase from "./Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = ({navigation, route}) => {
    const { id } = useLocalSearchParams();

    const auth = getAuth(firebase);

    //Manually sets the language code to english for testing
    //Normally when this is removed it should be whatever the systems language code is
    auth.languageCode = 'en';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const userData = {
        userID: undefined,
        adminPriv: undefined
    };

    const onLogin = async () => {
        console.log(email);
        console.log(password);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            setErrorMessage('Login Successful!');

            const user = userCredential.user;
        })
        .catch((error) => {
            setErrorMessage('Your Password or Email \n Do not Match. Please Try Again.');
            console.log(error.message, error.code);
        });

        const user = auth.currentUser;
        if (user != null) {
            navigation.navigate("Home");
        } else {
            //IDK yet
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={setEmail}
                    value = {email}
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View>
                <TouchableOpacity
                    onPress={onLogin}
                >
                <Text>Login</Text>
                </TouchableOpacity>
            </View>
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
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    inputContainer: {
        width: "80%",
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
    },
});

export default Login;