import { Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase'; // Import your Firebase configuration
import HealthHistory from "./HealthHistory";

const Search = ({ navigation, route }) => {
    const { userData } = route.params;
    const [nameInput, setNameInput] = useState('');
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state


    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const patientsCollection = collection(db, 'Patients');
            const snapshot = await getDocs(patientsCollection);
            const patientsData = snapshot.docs.map(doc => ({
                id: doc.id,
                firstName: doc.data()?.fullName?.firstName || '',
                middleName: doc.data()?.fullName?.middleName || '',
                lastName: doc.data()?.fullName?.lastName || '',
                medicalID: doc.data()?.medicalID || '',
                gender: doc.data()?.gender || '',
                fullName: doc.data()?.fullName || '',
                familyMembers: doc.data()?.familyMembers || '',
                birthdate: doc.data()?.birthdate || '',
                healthHistory: doc.data()?.healthHistory || '',
                address: doc.data()?.address || '',
                city: doc.data()?.city || '',
                maritalStatus: doc.data()?.maritalStatus || '',
                phoneNumber: doc.data()?.phoneNumber || '',
                state: doc.data()?.state || '',
                zip: doc.data()?.zip || '',
                email: doc.data()?.email || '',
                prescriptions: doc.data()?.prescriptions || '',
                // Add other fields you need from the document
            }));
            setPatients(patientsData);
            setFilteredPatients(patientsData); // Initially set filtered patients to all patients
            setLoading(false); // Set loading to false after data fetching
        } catch (error) {
            console.error('Error fetching patients:', error);
            setLoading(false); // Set loading to false even if there's an error
        }
    };

    const handleNameSearch = (text) => {
        const filtered = patients.filter(patient =>
            patient.firstName.toLowerCase().includes(text.toLowerCase()) ||
            patient.lastName.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredPatients(filtered);
    };

    const handleNamePress = (patient) => {
        // Handle navigation or other actions when a patient is selected
        //console.log('Selected patient:', patient.id);
        navigation.navigate('Profile', { patient });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textField}
                value={nameInput}
                onChangeText={text => {
                    setNameInput(text);
                    handleNameSearch(text);
                }}
                placeholder="Search"
            />
            <FlatList
                data={filteredPatients}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.nameContainer}
                        onPress={() => handleNamePress(item)}
                    >
                        <Text style={styles.nameText}>{item.firstName} {item.lastName}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bfefff",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textField: {
        backgroundColor: '#D3D3D3',
        color: 'black',
        fontWeight: 'bold',
        width: '90%',
        height: 50,
        borderRadius: 15,
        padding: 10,
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    nameContainer: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 20,
    },
    nameText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default Search;
