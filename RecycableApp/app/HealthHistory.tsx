import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList, TextInput, Button } from "react-native";
import { doc, updateDoc , onSnapshot} from "firebase/firestore";
import { db } from './Firebase'; // Import your Firebase configuration

const HealthHistory = ({ navigation, route }) => {
    const { patient } = route.params;
    const [healthRecords, setHealthRecords] = useState([]);
    const [newRecord, setNewRecord] = useState('');

    useEffect(() => {
        // Load health records from Firestore or any other data source
        // For now, I'll assume you fetch the health records from Firestore
        // Replace 'Patients' with your actual collection name
        const patientRef = doc(db, 'Patients', patient.id);

        // Assume 'healthHistory' is the field in the Firestore document containing health records
        const unsubscribe = onSnapshot(patientRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setHealthRecords(data.healthHistory || []);
            }
        });

        // Unsubscribe from snapshot listener when component unmounts
        return () => unsubscribe();
    }, []);

    const addRecord = () => {
        setHealthRecords([...healthRecords, newRecord]);
        setNewRecord('');
    };

    const removeRecord = (index) => {
        const updatedRecords = healthRecords.filter((_, i) => i !== index);
        setHealthRecords(updatedRecords);
    };

    const saveChanges = async () => {
        try {
            // Update the healthHistory field in the Firestore document
            const patientRef = doc(db, 'Patients', patient.id);
            await updateDoc(patientRef, {
                healthHistory: healthRecords
            });
            console.log("Changes saved successfully!");
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.familyStyling}>
                <Text style={styles.headerText}>List of Health Records:</Text>
                <FlatList
                    data={healthRecords}
                    renderItem={({ item, index }) => (
                        <View style={styles.row}>
                            <Text>{item}</Text>
                            <TouchableOpacity onPress={() => removeRecord(index)}>
                                <Text style={styles.removeButton}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <TextInput
                    style={styles.input}
                    value={newRecord}
                    onChangeText={setNewRecord}
                    placeholder="Add new health record"
                />
                <Button title="Add Record" onPress={addRecord} />
                <Button title="Save Changes" onPress={saveChanges} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "baseline",
        backgroundColor: "#bfefff",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    removeButton: {
        color: "red",
        marginLeft: 10,
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

export default HealthHistory;
