import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import React from "react";
import { useNavigation } from "@react-navigation/native";

function Appointments(){

    const navigation = useNavigation<any>();

    const userData = {
        Data1: '1',
        Data2: true
    };

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

    //for the drop down list below
    const [selected, setSelected] = React.useState("");
    function handleSelection(){

    }

    var button_BookAppointment =
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("BookAppointment", { userData })}
        >
            <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>

    var displayAppointments

    return (
        <View style={styles.container}>
            {/*<View style={styles.appointmentStyling}>
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
            <View>
                {button_BookAppointment}
                </View>*/}

            
            <View style={styles.appointmentStyling}>
                {/*Upcoming Appointments*/}
                <View>
                    <Text style={styles.headerText}>Upcoming Appointments:</Text>
                </View>

                <View>
                    {/* flat list is replacing the hard coded list from before as this can work with database data and print out the entire list at once */}
                    <FlatList
                        data={dummyData}
                        horizontal={true}
                        renderItem={({ item }) => (
                            <View style={styles.appointBox}>
                                <View style={styles.listRow}>
                                    <Text style={styles.infoText}>Customer:</Text>
                                    <Text style={styles.infoText}> {item.name}</Text>
                                </View>
                                <View style={styles.listRow}>
                                    <Text style={styles.infoText}>Service:</Text>
                                    <Text style={styles.infoText}>{item.type}</Text>
                                </View>
                                <View style={styles.listRow}>
                                    <Text style={styles.infoText}>Date:</Text>
                                    <Text style={styles.infoText}>{item.date}</Text>
                                </View>
                                <View style={styles.listRow}>
                                    <Text style={styles.infoText}>Time:</Text>
                                    <Text style={styles.infoText}>{item.physician}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
                <View>
                    {/*Past Appointments*/}
                    <View>
                        <Text style={styles.headerText}>Past Appointments:</Text>
                    </View>

                    {/* flat list is replacing the hard coded list from before as this can work with database data and print out the entire list at once */}
                    <FlatList
                        data={dummyData}
                        horizontal={true}
                        renderItem={({ item }) => (
                            <View style={styles.appointBox}>
                                <View style={styles.listRow}>
                                    <Text style={styles.infoText}>Customer:</Text>
                                    <Text style={styles.infoText}> {item.name}</Text>
                                </View>
                                <View style={styles.listRow}>
                                    <Text style={styles.infoText}>Service:</Text>
                                    <Text style={styles.infoText}>{item.type}</Text>
                                </View>
                                <View style={styles.listRow}>
                                    <Text style={styles.infoText}>Date:</Text>
                                    <Text style={styles.infoText}>{item.date}</Text>
                                </View>
                                <View style={styles.listRow}>
                                    <Text style={styles.infoText}>Time:</Text>
                                    <Text style={styles.infoText}>{item.physician}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
                <View>
                    {button_BookAppointment}
                </View>
            </View>
        </View>
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
    },
    listRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    // white appointment block
    appointBox: {
        backgroundColor: "lightblue",
        margin: 10,
        borderRadius: 20,
        padding: 15,
        height: 125

    },
});

export default Appointments;