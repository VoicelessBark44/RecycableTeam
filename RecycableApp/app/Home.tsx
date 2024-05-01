import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
//import { TouchableOpacity, GestureHandlerRootView} from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

function Home(){

    const navigation = useNavigation<any>();

    const userData = {
        Data1: '1',
        Data2: true
    };

    const [modalVisible, setModalVisible] = useState(false);

    var modalWindow = 
        <Modal
            animationType = "fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Are you sure you want to sign out?</Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setModalVisible(false)
                                navigation.pop()
                            }}>
                            <Text style={styles.modalText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        
    var PatientSignUpButton = 
    <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate("PatientSignUp", {userData})}>
        <Text style={styles.buttonText}>Patient Sign Up</Text>
    </TouchableOpacity>

    var FamilyRegisterButton = 
    <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate("TestFamilyRegister", {userData})}>
        <Text style={styles.buttonText}>Family Register</Text>
    </TouchableOpacity>
        
    var SearchButton =
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Search", { userData })}>
        <Text style={styles.buttonText}>Search</Text>
    </TouchableOpacity>

    var SignOutButton =
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>

    var displayButtons = () => {
        var buttonsArray = []
        buttonsArray.push(PatientSignUpButton, FamilyRegisterButton, SearchButton, SignOutButton)
        return (
            <View style={styles.buttonContainer}>
                {buttonsArray.map((item, i) => <View key={i}>{item}</View>)}
            </View>
        )
    }

    var displayHeader = () => {
        return(
            <View style={styles.header}><Text style={styles.headerText}>Temp Home</Text></View>
        )
    }

    var displayModalWindow = () => {
        return (
            <View>{modalWindow}</View>
        )
    }

    return (
        <View style={styles.container}>
            {displayHeader()}
            {displayButtons()}
            {displayModalWindow()}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#bfefff",
        //backgroundColor: "#ededed"
    },
    header: {
        padding: '5%'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 30
    },
    buttonContainer: {
        flexDirection: 'column',
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
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        margin: 20,
        backgroundColor: "#bfefff",
        borderRadius: 20,
        borderWidth: 1,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButtonContainer: {
        flexDirection: 'row',
    },
    modalButton: {
        backgroundColor: "lightblue",
        paddingTop: 10,
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 8,
    },
    modalText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
});

export default Home;