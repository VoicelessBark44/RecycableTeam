import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import React from "react";


const BookAppointment = ({ navigation, route }) => {
    const { id } = useLocalSearchParams();
    const { userData } = route.params;
    const [selected, setSelected] = React.useState("");
    const typeList = [
        { key: 'ROUTINE_CHECKUP', value: 'Routine Checkup' },
        { key: 'BLOOD_TEST', value: 'Blood Test' },
        { key: 'MRI_SCAN', value: 'MRI Scan' },
        { key: 'OTHER', value: 'Other' },
    ];
    const physicianList = [
        { key: '0', value: 'Gregory House' },
        { key: '1', value: 'Dana Scully' },
        { key: '2', value: 'Doug Ross' },
        { key: '3', value: 'April Green' },
    ];
    function handleTypeSelection(selected){

    }
    function handlePhysicianSelection(selected){

    }

    return (
        <View style={styles.container}>
            <View style={styles.appointmentStyling}>
                <View>
                    <Text style={styles.headerText}>Select the Appointment Type:</Text>
                    <SelectList
                        setSelected = {(val) => setSelected(val)}
                        data={typeList}
                        boxStyles = {styles.dropDown}
                        dropdownStyles = {{backgroundColor:'white'}}
                        maxHeight = {270}
                        save = 'key'
                        search = {false}
                        placeholder = "N/A"
                        onSelect = {() => handleTypeSelection(selected) }
                    />
                </View>
                <View>
                    <Text style={styles.headerText}>Select your physician:</Text>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={physicianList}
                        boxStyles={styles.dropDown}
                        dropdownStyles={{ backgroundColor: 'white' }}
                        maxHeight={270}
                        save='key'
                        search={false}
                        placeholder="N/A"
                        onSelect = {() => handlePhysicianSelection(selected) }
                    />
                </View>
                <View>
                    <Text style = {{borderTopWidth: 1, borderBottomWidth: 1}}>Placeholder for selecting the date/time</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => alert('Book Appointment button pressed!')}
                    >
                        <Text style={styles.buttonText}>Book Appointment</Text>
                    </TouchableOpacity>
                </View>
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
        width: 200,
        height: 75,
        backgroundColor: "lightblue",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
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
        width: '90%',
        rowGap: 10,
        alignItems: 'center'
    },
    listStyling: {
        borderTopWidth: 1,
        paddingVertical: 5,
    },
    dropDown: {
        backgroundColor: 'white',
        margin: 15,
        paddingTop: 10,
        //paddingBottom: 10,
        //paddingRight: 150,
        //paddingLeft: 100,
        padding: 100
    },
});

export default BookAppointment;