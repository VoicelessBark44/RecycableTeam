import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import React from "react";


const Appointments = ({ navigation, route }) => {
    const { id } = useLocalSearchParams();
    const { userData } = route.params;
    const dummyData = [
        {
            name: "Will Smith",
            type: "Routine Checkup",
            date: "10/27/23, Fri, 1:00pm",
            physician: 'Gregory House',
            realDate: new Date("2023-10-27")
        },
        {
            name: "Bob Smith",
            type: "Blood Test",
            date: "11/27/23, Mon, 2:00pm",
            physician: 'Dana Scully',
            realDate: (new Date("2023-11-27"))
        },
        {
            name: "Jane Doe",
            type: "MRI Scan",
            date: "11/18/23, Fri, 3:00pm",
            physician: 'Doug Ross',
            realDate: new Date("2023-11-18")
        },
        {
            name: "Melinda Jackson",
            type: "Other",
            date: "11/15/23, Sat, 2:00pm",
            physician: 'April Green',
            realDate: new Date("2023-11-15")
        }
    ]

    return (
        <View style={styles.container}>
            <View style={styles.appointmentStyling}>
                <Text style={styles.headerText}>List of Appointments:</Text>
                <FlatList
                    data={dummyData}
                    renderItem={({ item }) => (
                        <View style = {styles.listStyling}>
                            <Text style = {styles.infoText}>Name: {item.name}</Text>
                            <Text style={styles.infoText}>Type: {item.type}</Text>
                            <Text style={styles.infoText}>Date: {item.date}</Text>
                            <Text style={styles.infoText}>Physician: {item.physician}</Text>
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
        fontSize: 18,
        fontWeight: "bold",
        paddingVertical: 5
    },
    appointmentStyling: {
        paddingLeft: 20,
        paddingTop: 10,
        width: '90%'
    },
    listStyling: {
        borderTopWidth: 1,
        paddingVertical: 5,
    }
});

export default Appointments;