import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import React from "react";


const PatientInfo = ({navigation, route}) => {
    const { id } = useLocalSearchParams();
    const { patient } = route.params;
    //console.log('Test: ', patient);
    //console.log(patient.fullName);
    //console.log(patient.fullName.middleName);
    const patientInfo = [['First Name', patient.firstName], ['Middle Name', patient.middleName], ['Last Name', patient.lastName], ['Gender', patient.gender], ['Date of Birth'], ['Marital Status', patient.maritalStatus], ['Address', patient.address], ['City', patient.city], ['State', patient.state], ['Zip', patient.zip], ['Phone Number', patient.phoneNumber], ['Email', patient.email]];
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Electronic Medical Record (EMR):</Text>
            <View style={styles.listStyling}>
                <FlatList
                    data={patientInfo}
                    horizontal={false}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <View style={styles.cell}>
                                <Text style={styles.tableHeaderText}>{item[0]}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.cellText}>{item[1]}</Text>
                            </View>
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
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: "row",
    },
    cell: {
        width: '50%',
        borderWidth: 1
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
        fontSize: 16,
        fontWeight: "bold"
    },
    tableHeaderText: {
        fontSize: 14,
        fontWeight: "bold",
        paddingLeft: 5
    },
    cellText: {
        fontSize: 14,
        paddingLeft: 5
    },
    listStyling: {
        paddingVertical: 10,
    },
});

export default PatientInfo;