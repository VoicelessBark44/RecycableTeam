import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import React from "react";


const PatientInfo = ({navigation, route}) => {
    const { id } = useLocalSearchParams();
    const { userData } = route.params;
    const dummyData = [['Name', 'John Doe'], ['Gender', 'Male'], ['Race', 'White'], ['DOB', '2002-10-27'], ['Marital Status', 'Single'], ['Address', '123 Fake Way'], ['City', 'Los Angeles'], ['State', 'CA'], ['ZIP', 12345], ['Phone Number', '916-123-4567'], ['Email', 'test@gmail.com'], ['SSN', 123456789]]

    return (
        <View style={styles.container}>
            <View style = {styles.patientContainer}>
                <FlatList
                    data={dummyData}
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