import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import React from "react";


const Prescription = ({ navigation, route }) => {
    const { id } = useLocalSearchParams();
    const { userData } = route.params;
    const dummyData = [
        ['Vitamin D', '2024-03-27'], ['Amoxicillin', '2020-06-01'], ['Levothyroxine', '2015-08-13'], ['Amoxicillin', '2010-10-21'], ['Amoxicillin', '2006-04-30'], ['Amoxicillin', '2002-10-01'],
    ]

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>List of Prescriptions:</Text>
            <View style={styles.listStyling}>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style = {styles.tableHeaderText}>Name</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.tableHeaderText}>Date Prescribed</Text>
                    </View>
                </View>
                <FlatList
                    data={dummyData}
                    horizontal={false}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <View style={styles.cell}>
                                <Text style={styles.cellText}>{item[0]}</Text>
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
    cellText:{
        fontSize: 14,
        paddingLeft: 5
    },
    listStyling: {
        paddingVertical: 10,
    },
});

export default Prescription;