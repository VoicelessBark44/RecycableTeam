import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import React from "react";


const Family = ({ navigation, route }) => {
    const { id } = useLocalSearchParams();
    const { userData } = route.params;
    const dummyData = [
        ['Mary Doe', 'mother'], ['Steve Doe', 'father'], ['Jessica Adams', 'cousin'], ['Arthur Adams', 'brother']
    ]

    return (
        <View style={styles.container}>
            <View style = {styles.familyStyling}>
                <Text style = {styles.headerText}>List of family members:</Text>
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
    headerText:{
        fontSize: 18,
        fontWeight: "bold"
    },
    familyStyling: {
        paddingLeft: 20,
        paddingTop: 10
    }
});

export default Family;