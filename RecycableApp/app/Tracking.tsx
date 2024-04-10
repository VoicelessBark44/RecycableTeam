import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Tracking = ({navigation, route}) => {
    const { id } = useLocalSearchParams();
    const { userData } = route.params;
    return (
        <View style = {styles.container}>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("MedicalDiagnosis", { userData })}
                >
                    <Text style={styles.buttonText}>Medical Diagnosis</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("LabTest", { userData })}
                >
                    <Text style={styles.buttonText}>Lab Tests</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Prescription", { userData })}
                >
                    <Text style={styles.buttonText}>Prescription</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Analytics", { userData })}
                >
                    <Text style={styles.buttonText}>Analytics</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("EMR", { userData })}
                >
                    <Text style={styles.buttonText}>EMR</Text>
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
        backgroundColor: "#bfefff",
    },
    row: {
        flexDirection: "row",
    },
    button: {
        width: 150,
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

export default Tracking;