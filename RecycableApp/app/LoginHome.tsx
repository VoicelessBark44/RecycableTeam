import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function LoginHome({ route }) {
    const navigation = useNavigation<any>();
    const { userData } = route.params;

    const [loading, setLoading] = useState(!userData);

    useEffect(() => {
        // Fetch userData if it's not available
        if (!userData) {
            // Simulating fetching userData for demonstration
            setTimeout(() => {
                const mockUserData = { firstName: 'John' }; // Simulated userData
                route.params = { ...route.params, userData: mockUserData }; // Update route.params with userData
                setLoading(false); // Set loading to false once userData is fetched
            }, 2000); // Simulate 2 seconds delay
        }
    }, [userData, route.params]);

    // Refresh the page once userData is available
    useEffect(() => {
        if (userData) {
            // Trigger a re-render by updating the state
            setLoading(false);
        }
    }, [userData]);

    // Render loading indicator while waiting for userData
    if (loading) {
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