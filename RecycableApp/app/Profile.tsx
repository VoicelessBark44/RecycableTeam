import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';

const Profile = ({navigation, route}) => {
    const { id } = useLocalSearchParams();
    const {userData} = route.params;
    return (
        <View style = {styles.container}>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("PatientInfo", { userData })}
                >
                    <Text style={styles.buttonText}>Patient Info</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("HealthHistory", { userData })}
                >
                    <Text style={styles.buttonText}>Health History</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Family", { userData })}
                >
                    <Text style={styles.buttonText}>Family</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Appointments", { userData })}
                >
                    <Text style={styles.buttonText}>Appointments</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("BookAppointment", { userData })}
                >
                    <Text style={styles.buttonText}>Book Appointment</Text>
                </TouchableOpacity>
            </View>
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
    row: {
        flexDirection: "row",
    },
    button: {
        width: 160,
        height: 100,
        margin: 10,
        backgroundColor: "lightblue",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Profile;