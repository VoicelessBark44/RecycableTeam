import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList, TextInput, Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from './Firebase'; // Import your Firebase configuration

const LabTest = ({ navigation, route }) => {
    const { patient } = route.params;
    const [labTests, setLabTests] = useState([]);
    const [newLabTest, setNewLabTest] = useState({ name: '', date: '' });
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        // Load lab tests from Firestore or any other data source
        // For now, I'll assume you fetch the lab tests from Firestore
        // Replace 'Patients' with your actual collection name
        const patientRef = doc(db, 'Patients', patient.id);

        // Assume 'labTests' is the field in the Firestore document containing lab tests
        const unsubscribe = onSnapshot(patientRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setLabTests(data.labTests || []);
            }
        });

        // Unsubscribe from snapshot listener when component unmounts
        return () => unsubscribe();
    }, []);

    const addLabTest = () => {
        setLabTests([...labTests, newLabTest]);
        setNewLabTest({ name: '', date: '' });
    };

    const removeLabTest = (index) => {
        const updatedLabTests = labTests.filter((_, i) => i !== index);
        setLabTests(updatedLabTests);
    };

    const handleDateConfirm = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setNewLabTest({ ...newLabTest, date: formattedDate });
        setDatePickerVisibility(false);
    };

    const saveChanges = async () => {
        try {
            // Update the labTests field in the Firestore document
            const patientRef = doc(db, 'Patients', patient.id);
            await updateDoc(patientRef, {
                labTests: labTests
            });
            console.log("Lab test data updated successfully!");
        } catch (error) {
            console.error("Error updating lab test data:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>List of Lab Tests:</Text>
            <View style={styles.listStyling}>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.tableHeaderText}>Name</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.tableHeaderText}>Date</Text>
                    </View>
                </View>
                <FlatList
                    data={labTests}
                    renderItem={({ item, index }) => (
                        <View style={styles.row}>
                            <View style={styles.cell}>
                                <Text style={styles.cellText}>{item.name}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.cellText}>{item.date}</Text>
                            </View>
                            <TouchableOpacity onPress={() => removeLabTest(index)}>
                                <Text style={styles.removeButton}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={styles.addLabTestContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Lab Test Name"
                        value={newLabTest.name}
                        onChangeText={(text) => setNewLabTest({ ...newLabTest, name: text })}
                    />
                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                        <Text style={styles.datePickerText}>Choose Date</Text>
                    </TouchableOpacity>
                    <Text style={styles.selectedDateText}>{newLabTest.date}</Text>
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={() => setDatePickerVisibility(false)}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Add Lab Test" onPress={addLabTest} />
                    <Button title="Save Changes" onPress={saveChanges} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#bfefff",
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    cell: {
        flex: 1,
        borderWidth: 1,
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
    tableHeaderText: {
        fontSize: 14,
        fontWeight: "bold",
        paddingLeft: 5,
    },
    cellText: {
        fontSize: 14,
        paddingLeft: 5,
    },
    listStyling: {
        flex: 1,
        width: "100%",
    },
    inputContainer: {
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
    addLabTestContainer: {
        width: "100%",
        alignItems: "flex-start",
    },
    buttonContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    datePickerText: {
        padding: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
    },
    selectedDateText: {
        fontSize: 14,
        marginLeft: 10,
    },
});

export default LabTest;
