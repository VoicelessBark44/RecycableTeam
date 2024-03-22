import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import React from "react";


const HealthHistory = ({ navigation, route }) => {
    const { id } = useLocalSearchParams();
    const { userData } = route.params;
    const dummyData = [
        '2023 - no health complications', '2022 - leg injury during sports', '2021 - bad allergies due to pollen'
    ]

    return (
        <View style={styles.container}>
            <View style={styles.familyStyling}>
                <Text style={styles.headerText}>List of Health Records:</Text>
                <FlatList
                    data={dummyData}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item}</Text>
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
        fontSize: 16,
        fontWeight: "bold"
    },
    familyStyling: {
        paddingLeft: 20,
        paddingTop: 10
    }
});

export default HealthHistory;