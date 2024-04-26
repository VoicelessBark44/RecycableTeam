import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function LoginHome({ route }) {
    const navigation = useNavigation<any>()
    const { userData } = route.params;

    console.log(userData.firstName);
    console.log(route);

    // Check if userData exists, if not, display loading indicator
    if (!userData) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    // Once userData is available, render the component with userData
    return (
        <View style={styles.container}>
            <Text style={styles.greetingText}>Hello, {userData.firstName}</Text>
            <GestureHandlerRootView>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("PatientSignUp", { userData })}
                >
                    <Text>Patient Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("TestFamilyRegister", { userData })}
                >
                    <Text>Family Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Search", { userData })}
                >
                    <Text>Search</Text>
                </TouchableOpacity>
            </GestureHandlerRootView>
        </View>
    );
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
