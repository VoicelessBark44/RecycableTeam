import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList, TextInput, Button } from "react-native";
import firebase, { db } from './Firebase'; // Import your Firebase configuration
import { doc , updateDoc} from "firebase/firestore";

const MedicalDiagnosis = ({ navigation, route }) => {
    const { patient } = route.params;
    const [activeDiagnoses, setActiveDiagnoses] = useState(patient.healthHistory);

    // Function to add a new health condition
    const addDiagnosis = () => {
        // Create a new array by copying the existing one and adding the new condition
        const updatedDiagnoses = [...activeDiagnoses, '']; // Add an empty string for the new condition
        setActiveDiagnoses(updatedDiagnoses);
    };

    // Function to remove a health condition by index
    const removeDiagnosis = (index) => {
        // Create a new array by filtering out the condition at the specified index
        const updatedDiagnoses = activeDiagnoses.filter((_, i) => i !== index);
        setActiveDiagnoses(updatedDiagnoses);
    };

    // Function to handle changes in a health condition
    const handleChange = (text, index) => {
        // Update the condition at the specified index
        const updatedDiagnoses = [...activeDiagnoses];
        updatedDiagnoses[index] = text;
        setActiveDiagnoses(updatedDiagnoses);
    };

    // Function to save the changes to Firestore
    const saveChanges = async () => {
        try {
            // Update the healthHistory field in the Firestore document
            const patientRef = doc(db, 'Patients', patient.id);
            await updateDoc(patientRef, {
                healthHistory: activeDiagnoses
            });
            console.log("Changes saved successfully!");
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.familyStyling}>
                <Text style={styles.headerText}>Active Diagnoses:</Text>
                <FlatList
                    data={activeDiagnoses}
                    renderItem={({ item, index }) => (
                        <View style={styles.row}>
                            <TextInput
                                style={styles.input}
                                value={item}
                                onChangeText={(text) => handleChange(text, index)}
                            />
                            <TouchableOpacity onPress={() => removeDiagnosis(index)}>
                                <Text style={styles.removeButton}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Button title="Add Diagnosis" onPress={addDiagnosis} />
                <Button title="Save Changes" onPress={saveChanges} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#bfefff",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    removeButton: {
        color: "red",
        marginLeft: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    familyStyling: {
        width: "80%",
        paddingHorizontal: 20,
        paddingTop: 10,
    },
});

export default MedicalDiagnosis;