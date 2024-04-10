import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import React from "react";


const MedicalDiagnosis = ({ navigation, route }) => {
    const { id } = useLocalSearchParams();
    const { userData } = route.params;
    const primaryDummyData = 'ICD-10: I10 - essential (primary) hypertension'
    const activeDummyData = [
        'ICD-10: E11.9 - type II diabetes mellitus without complications', 'ICD-10: E13.9 - other specified diabetes mellitus without complications'
    ]

    return (
        <View style={styles.container}>
            <View style={styles.familyStyling}>
                <Text style={styles.headerText}>Primary Diagnosis:</Text>
                <Text style={styles.infoText}>{primaryDummyData}</Text>
                <Text style={styles.headerText}>Active Diagnoses:</Text>
                <FlatList
                    data={activeDummyData}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item}</Text>
                        </View>
                    )}
                />
                
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "baseline",
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
    infoText: {
        fontSize: 16,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    familyStyling: {
        paddingLeft: 20,
        paddingTop: 10
    }
});

export default MedicalDiagnosis;