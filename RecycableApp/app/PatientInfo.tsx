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
            <View style = {styles.patientContainer}>
                <FlatList
                    data={patientInfo}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.infoText}>{item[0]}: {item[1]}</Text>
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
    patientContainer:{
        paddingLeft: 20,
        paddingTop: 10
    }
});

export default PatientInfo;