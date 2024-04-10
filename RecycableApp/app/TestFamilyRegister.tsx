import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase, { db } from "./Firebase";
import { doc, setDoc, getDoc, collection, addDoc, getDocs} from "firebase/firestore";

const TestFamilyRegister = () => {
    const [patientFirstName, setPatientFirstName] = useState('');
    const [patientLastName, setPatientLastName] = useState('');
    const [patientBirthday, setPatientBirthday] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [familyMembers, setFamilyMembers] = useState([]);
  
    const generateID = (firstName, lastName, birthYear) => {
      return `${firstName}${lastName}${birthYear}`;
    };
  
    const handleAddFamilyMember = () => {
      const newMemberID = generateID(patientFirstName, patientLastName, patientBirthday.getFullYear());
      setFamilyMembers([...familyMembers, { firstName: '', lastName: '', birthday: new Date(), docID: newMemberID }]);
    };
  
    const handleSave = () => {
      // Handle saving data to Firestore
      console.log('Patient:', patientFirstName, patientLastName, patientBirthday);
      console.log('Family Members:', familyMembers);
      // Reset form fields after saving
      setPatientFirstName('');
      setPatientLastName('');
      setPatientBirthday(new Date());
      setFamilyMembers([]);
    };
  
    const handleFamilyMemberFirstNameChange = (index, text) => {
      const updatedFamilyMembers = [...familyMembers];
      updatedFamilyMembers[index].firstName = text;
      setFamilyMembers(updatedFamilyMembers);
    };
  
    const handleFamilyMemberLastNameChange = (index, text) => {
      const updatedFamilyMembers = [...familyMembers];
      updatedFamilyMembers[index].lastName = text;
      setFamilyMembers(updatedFamilyMembers);
    };
  
    const handleFamilyMemberBirthdayChange = (index, event, selectedDate) => {
      const updatedFamilyMembers = [...familyMembers];
      updatedFamilyMembers[index].birthday = selectedDate || new Date();
      setFamilyMembers(updatedFamilyMembers);
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Patient First Name"
            value={patientFirstName}
            onChangeText={setPatientFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Patient Last Name"
            value={patientLastName}
            onChangeText={setPatientLastName}
          />
          <Button title="Select Patient Birthday" onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={patientBirthday}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                setPatientBirthday(selectedDate || patientBirthday);
              }}
            />
          )}
        </View>
        <View style={styles.divider} />
        <View style={styles.familyMemberContainer}>
          {familyMembers.map((member, index) => (
            <View key={index} style={styles.familyMemberItem}>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={member.firstName}
                onChangeText={(text) => handleFamilyMemberFirstNameChange(index, text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={member.lastName}
                onChangeText={(text) => handleFamilyMemberLastNameChange(index, text)}
              />
              <Button title="Select Birthday" onPress={() => setShowDatePicker(true)} />
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={member.birthday}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => handleFamilyMemberBirthdayChange(index, event, selectedDate)}
                />
              )}
            </View>
          ))}
          <Button title="Add Family Member" onPress={handleAddFamilyMember} />
        </View>
        <Button title="Save" onPress={handleSave} />
      </ScrollView>
    );
  };
  
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: 'lightblue',
      padding: 20,
    },
    inputContainer: {
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    divider: {
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      marginVertical: 20,
    },
    familyMemberContainer: {
      marginBottom: 20,
    },
    familyMemberHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    familyMemberItem: {
      marginBottom: 10,
    },
});
export default TestFamilyRegister;