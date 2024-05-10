import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from './Firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Swipeable } from 'react-native-gesture-handler';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, Alert } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function Appointments(){

    const navigation = useNavigation<any>();

    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const appointmentsCollection = collection(db, 'Appointments');
            const snapshot = await getDocs(appointmentsCollection);
            const appointmentsData = snapshot.docs.map(doc => ({
                id: doc.id,
                doctor: doc.data().doctor || '',
                notes: doc.data().notes || '',
                service: doc.data().service || '',
                patient: doc.data().patient || '',
                date: doc.data().date.toDate().toString() || '', // Convert Firestore timestamp to Date object and then to string
                // Add other fields you need from the document
            }));
            setAppointments(appointmentsData); // Update state with fetched appointments
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setLoading(false);
        }
    }

    const handleDeleteAppointment = async (id) => {
        try {
            const appointmentRef = doc(db, 'Appointments', id);
            await deleteDoc(appointmentRef);
            fetchAppointments(); // Refresh appointments after deletion
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    }

    const confirmDeleteAppointment = (id) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this appointment?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => handleDeleteAppointment(id),
                },
            ],
            { cancelable: false }
        );
    }

    const renderRightActions = (id) => (
        <TouchableOpacity style={styles.rightAction} onPress={() => confirmDeleteAppointment(id)}>
            <Text style={styles.rightActionText}>Delete</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <Swipeable
            renderRightActions={() => renderRightActions(item.id)}
            overshootRight={false}
        >
            <View style={styles.appointBox}>
                <View style={styles.listRow}>
                    <Text style={styles.infoText}>Customer:</Text>
                    <Text style={styles.infoText}> {item.patient}</Text>
                </View>
                <View style={styles.listRow}>
                    <Text style={styles.infoText}>Service:</Text>
                    <Text style={styles.infoText}>{item.service}</Text>
                </View>
                <View style={styles.listRow}>
                    <Text style={styles.infoText}>Date:</Text>
                    <Text style={styles.infoText}>{item.date}</Text>
                </View>
                <View style={styles.listRow}>
                    <Text style={styles.infoText}>Doctor:</Text>
                    <Text style={styles.infoText}>{item.doctor}</Text>
                </View>
            </View>
        </Swipeable>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.appointmentStyling}>
                    <Text style={styles.headerText}>Upcoming Appointments:</Text>
                    <FlatList
                        data={appointments}
                        renderItem={renderItem}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("BookAppointment")}
                >
                    <Text style={styles.buttonText}>Book Appointment</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bfefff",
    },
    button: {
        width: '90%',
        backgroundColor: "lightblue",
        padding: 10,
        margin: 10,
        borderRadius: 8,
        alignSelf: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center'
    },
    infoText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        paddingVertical: 5
    },
    appointmentStyling: {
        paddingLeft: 20,
        paddingTop: 10,
        flex: 1,
    },
    listRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    appointBox: {
        backgroundColor: "lightblue",
        margin: 10,
        borderRadius: 20,
        padding: 15,
        height: 125,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightAction: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        width: 80,
        height: '100%',
    },
    rightActionText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Appointments;
