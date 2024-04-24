import { Text, View, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SelectList } from 'react-native-dropdown-select-list';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './Firebase';

const BookAppointment = ({ navigation, route }) => {
    const { patient } = route.params;
    const [selectedAppointmentType, setSelectedAppointmentType] = useState("");
    const [selectedPhysician, setSelectedPhysician] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [notes, setNotes] = useState("");
    const [displayedDateTime, setDisplayedDateTime] = useState("");

    const typeList = [
        { key: 'ROUTINE_CHECKUP', value: 'Routine Checkup' },
        { key: 'BLOOD_TEST', value: 'Blood Test' },
        { key: 'MRI_SCAN', value: 'MRI Scan' },
        { key: 'OTHER', value: 'Other' },
    ];
    const physicianList = [
        { key: '0', value: 'Gregory House' },
        { key: '1', value: 'Dana Scully' },
        { key: '2', value: 'Doug Ross' },
        { key: '3', value: 'April Green' },
    ];

    const handleTypeSelection = (value) => {
        // Find the appointment type object in the typeList array with the selected value
        const appointmentType = typeList.find((type) => type.key === value);
        // Set selectedAppointmentType to the value of the appointment type
        setSelectedAppointmentType(appointmentType.value);
    };
    

    const handlePhysicianSelection = (value) => {
        // Find the physician object in the physicianList array with the selected value
        const physician = physicianList.find((physician) => physician.key === value);
        // Set selectedPhysician to the value of the physician's name
        setSelectedPhysician(physician.value);
    };
    

    const handleDateConfirm = (date) => {
        // Set seconds to zero
        date.setSeconds(0);
        setSelectedDateTime(date);
        setDisplayedDateTime(formatDateTime(date));
        hideDatePicker();
    };
    

    const handleDateCancel = () => {
        hideDatePicker();
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleBookAppointment = async () => {
        try {
            const appointmentRef = doc(db, 'Appointments', `${selectedPhysician}_${selectedDateTime.getTime()}`);
            await setDoc(appointmentRef, {
                doctor: selectedPhysician,
                date: selectedDateTime,
                service: selectedAppointmentType,
                notes: notes,
            });
            Alert.alert('Appointment added successfully!');
        } catch (error) {
            console.error('Error adding appointment:', error);
            Alert.alert('Failed to add appointment.');
        }
    };
    

    // Helper function to format date and time
    const formatDateTime = (dateTime) => {
        if (dateTime) {
            const formattedDate = dateTime.toLocaleDateString();
            const formattedTime = dateTime.toLocaleTimeString();
            return `${formattedDate} ${formattedTime}`;
        }
        return "";
    };

    return (
        <View style={styles.container}>
            <View style={styles.appointmentStyling}>
                <Text style={styles.headerText}>Select the Appointment Type:</Text>
                <SelectList
                    setSelected={(val) => setSelectedAppointmentType(val)}
                    data={typeList}
                    boxStyles={styles.dropDown}
                    dropdownStyles={{ backgroundColor: 'white' }}
                    maxHeight={270}
                    save='key'
                    search={false}
                    placeholder="N/A"
                    onSelect={() => handleTypeSelection(selectedAppointmentType)}
                />
                <Text style={styles.headerText}>Select your physician:</Text>
                <SelectList
                    setSelected={(val) => setSelectedPhysician(val)}
                    data={physicianList}
                    boxStyles={styles.dropDown}
                    dropdownStyles={{ backgroundColor: 'white' }}
                    maxHeight={270}
                    save='key'
                    search={false}
                    placeholder="N/A"
                    onSelect={() => handlePhysicianSelection(selectedPhysician)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={showDatePicker}
                >
                    <Text style={styles.buttonText}>Select Date and Time</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleDateConfirm}
                    onCancel={handleDateCancel}
                />
                {displayedDateTime !== "" && (
                    <Text style={styles.infoText}>Selected Date and Time: {displayedDateTime}</Text>
                )}
                <TextInput
                    placeholder="Enter Notes"
                    onChangeText={text => setNotes(text)}
                    value={notes}
                    style={styles.textInput}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleBookAppointment}
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
        alignItems: "baseline",
        backgroundColor: "#bfefff",
    },
    button: {
        width: 200,
        height: 75,
        backgroundColor: "lightblue",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        paddingVertical: 5,
    },
    appointmentStyling: {
        paddingLeft: 20,
        paddingTop: 10,
        width: '90%',
        rowGap: 10,
        alignItems: 'center',
    },
    dropDown: {
        backgroundColor: 'white',
        marginVertical: 15,
        padding: 10,
    },
    textInput: {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
    },
});

export default BookAppointment;
