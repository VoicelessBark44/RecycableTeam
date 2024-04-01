import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import firebase, { db } from "./Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc} from "firebase/firestore";

const Login = ({navigation, route}) => {
    const { id } = useLocalSearchParams();

    const auth = getAuth(firebase);

    //const database = get    
    //Manually sets the language code to english for testing
    //Normally when this is removed it should be whatever the systems language code is
    auth.languageCode = 'en';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const userData = {
        userID: undefined,
        adminPriv: undefined,
        firstName: undefined,
        middleName: undefined,
        lastName: undefined
    };

    const onLogin = async () => {
        console.log(email);
        console.log(password);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            setErrorMessage('Login Successful!');

            const user = userCredential.user;
            userData.userID = userCredential.user.uid;
            //Alert.alert('Test', userData.userID);
            getUserData();
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

    const getUserData = async () => {
        try {

            const docRef = doc(db, 'Users', userData.userID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log('Document data: ', docSnap.data());
            } else {
                console.log('Np such document!');
            }

        } catch (error) {
            console.log('Something went wrong', error.message);
        }
    }

    const testerFunction = async () => {
        try {
            await setDoc(doc(db, "Users", "Tester"), {
            firstName: "I",
            middleName: "am a",
            lastName: "Test",
            adminPriv: false
        });
        Alert.alert('Sucess', 'Document seccessully written!');
        } catch (error) {
            Alert.alert('Error', 'Failed to write to document!');
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
            <View style={styles.button}>
                <TouchableOpacity
                    onPress={onLogin}
                >
                <Text>Login</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.button}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                >
                <Text>Register an Account</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.button}>
                <TouchableOpacity
                    onPress={testerFunction}
                >
                <Text>Press Me</Text>
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
    button: {
        backgroundColor: "lightblue",
        padding: 10,
        margin: 10,
        borderRadius: 8,
        textAlign: 'center',
    },
});

export default Login;