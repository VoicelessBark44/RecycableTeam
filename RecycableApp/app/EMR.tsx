import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import React from "react";

const EMR = ({ route }) => {
    const { patient } = route.params;

    //const birthDate = patient.dateOfBirth.toDate();

    const patientInfo = [
        ['First Name', patient.firstName], 
        ['Middle Name', patient.middleName], 
        ['Last Name', patient.lastName], 
        ['Gender', patient.gender], 
        ['Date of Birth', ''], 
        ['Marital Status', patient.maritalStatus], 
        ['Address', patient.address], 
        ['City', patient.city], 
        ['State', patient.state], 
        ['Zip', patient.zip], 
        ['Phone Number', patient.phoneNumber], 
        ['Email', patient.email]
    ];

    const familyMembers = patient.familyMembers;

    return (
        <View style={styles.container}>
    <Text style={styles.headerText}>Electronic Medical Record (EMR):</Text>
    <View style={styles.listStyling}>
        {/* Render patient information */}
        {patientInfo.map((info, index) => (
            <View style={styles.row} key={index}>
                <View style={styles.cell}>
                    <Text style={styles.tableHeaderText}>{info[0]}</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.cellText}>{info[1]}</Text>
                </View>
            </View>
        ))}
    </View>
    <Text style={styles.headerText}>Family Members:</Text>
    <View style={styles.listStyling}>
        {/* Render family members */}
        {familyMembers.map((familyMember, index) => (
            <View style={styles.row} key={index}>
                <View style={styles.cell2}>
                    <Text style={styles.tableHeaderText}>
                        {familyMember.fullName.firstName} {familyMember.fullName.middleName} {familyMember.fullName.lastName}
                    </Text>
                </View>
            </View>
        ))}
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
    cell2: {
        padding: 5,
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

export default EMR;