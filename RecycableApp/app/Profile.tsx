import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Profile = (navigation) => {
    const { id } = useLocalSearchParams();
    return (
        <View style = {styles.container}>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Patient Info</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Health History</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Family</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Previous Recorded Visit</Text>
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

export default Profile;