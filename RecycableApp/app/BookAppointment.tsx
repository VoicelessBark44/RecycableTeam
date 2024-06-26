import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SelectList } from 'react-native-dropdown-select-list';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from './Firebase';

const BookAppointment = ({ navigation, route }) => {
    //const { patient } = route.params;
    const [selectedAppointmentType, setSelectedAppointmentType] = useState("");
    const [selectedPhysician, setSelectedPhysician] = useState("");
    const [selectedPatient, setSelectedPatient] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [notes, setNotes] = useState("");
    const [displayedDateTime, setDisplayedDateTime] = useState("");
    const [physicianList, setPhysicianList] = useState([]);
    const [patientList, setPatientsList] = useState([]);

    const typeList = [
        { key: 'ROUTINE_CHECKUP', value: 'Routine Checkup' },
        { key: 'BLOOD_TEST', value: 'Blood Test' },
        { key: 'MRI_SCAN', value: 'MRI Scan' },
        { key: 'OTHER', value: 'Other' },
    ];
    
    useEffect(() => {
        // Fetch the list of doctors from Firestore
        const fetchDoctors = async () => {
            try {
                const doctorsCollection = collection(db, 'Users');
                const doctorsSnapshot = await getDocs(doctorsCollection);
                const doctorsData = [];
                doctorsSnapshot.forEach((doc) => {
                    const { firstName, middleName, lastName } = doc.data();
                    const fullName = `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`;
                    doctorsData.push({ key: doc.id, value: fullName });
                });
                setPhysicianList(doctorsData);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        const fetchPatients = async () => {
            try {
                const patientsCollection = collection(db, 'Patients');
                const patientsSnapshot = await getDocs(patientsCollection);
                const patientsData = [];
                patientsSnapshot.forEach((doc) => {
                    const { fullName } = doc.data();
                    const patientName = `${fullName.firstName} ${fullName.lastName}`;
                    patientsData.push({ key: doc.id, value: patientName});
                    //console.log(fullName);
                });
                setPatientsList(patientsData);
            } catch (error) {
                console.error('Error fetching patients: ', error);
            }
        }
        fetchPatients();
        fetchDoctors();
    }, []);

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

    const handlePatientSelection = (value) => {
        const patient = patientList.find((patient) => patient.key === value);

        setSelectedPatient(patient.value);
    }
    

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
                patient: selectedPatient,
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
                <Text style = {styles.headerText}>Select the Patient:</Text>
                <SelectList
                    setSelected={(val) => setSelectedPatient(val)}
                    data = {patientList}
                    boxStyles={styles.dropDown}
                    dropdownStyles={{ backgroundColor: 'white' }}
                    maxHeight={270}
                    save='key'
                    search={false}
                    placeholder="N/A"
                    onSelect={() => handlePatientSelection(selectedPatient)}
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
                    placeholder="Enter Appointment Notes"
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
