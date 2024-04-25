import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList, TextInput, Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import firebase, { db } from './Firebase'; // Import your Firebase configuration
import { doc , updateDoc} from "firebase/firestore";

const Prescription = ({ navigation, route }) => {
    const { userData, patient } = route.params;
    const [prescriptions, setPrescriptions] = useState(patient.prescriptions || []);

    const [newPrescription, setNewPrescription] = useState({ name: '', datePrescribed: '' });
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const addPrescription = () => {
        setPrescriptions([...prescriptions, newPrescription]);
        setNewPrescription({ name: '', datePrescribed: '' });
    };

    const removePrescription = (index) => {
        const updatedPrescriptions = prescriptions.filter((_, i) => i !== index);
        setPrescriptions(updatedPrescriptions);
    };

    const handleDateConfirm = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setNewPrescription({ ...newPrescription, datePrescribed: formattedDate });
        setSelectedDate(formattedDate);
        setDatePickerVisibility(false);
    };

    const saveChanges = async () => {
        try {
            const patientRef = doc(db, 'Patients', patient.id);
            await updateDoc(patientRef, {
                prescriptions: prescriptions
            });
            console.log("Prescription data updated successfully!");
        } catch (error) {
            console.error("Error updating prescription data:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>List of Prescriptions:</Text>
            <View style={styles.listStyling}>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.tableHeaderText}>Name</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.tableHeaderText}>Date Prescribed</Text>
                    </View>
                </View>
                <FlatList
                    data={prescriptions}
                    renderItem={({ item, index }) => (
                        <View style={styles.row}>
                            <View style={styles.cell}>
                                <Text style={styles.cellText}>{item.name}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.cellText}>{item.datePrescribed}</Text>
                            </View>
                            <TouchableOpacity onPress={() => removePrescription(index)}>
                                <Text style={styles.removeButton}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={styles.addPrescriptionContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Prescription Name"
                        value={newPrescription.name}
                        onChangeText={(text) => setNewPrescription({ ...newPrescription, name: text })}
                    />
                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                        <Text style={styles.datePickerText}>Choose Date</Text>
                    </TouchableOpacity>
                    <Text style={styles.selectedDateText}>{selectedDate}</Text>
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={() => setDatePickerVisibility(false)}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Add Prescription" onPress={addPrescription} />
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
    addPrescriptionContainer: {
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

export default Prescription;
