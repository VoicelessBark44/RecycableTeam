import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase, { db } from "./Firebase";
import { doc, setDoc, getDoc, collection, addDoc, getDocs} from "firebase/firestore";

const TestFamilyRegister = () => {
    const [patientFirstName, setPatientFirstName] = useState('');
    const [patientLastName, setPatientLastName] = useState('');
    const [patientBirthday, setPatientBirthday] = useState(new Date());
    const [patientGender, setPatientGender] = useState('');
    const [patientHealthHistory, setPatientHealthHistory] = useState('');
    const [showPatientDatePicker, setShowPatientDatePicker] = useState(false);
    const [showFamilyMemberDatePicker, setShowFamilyMemberDatePicker] = useState(false);
    const [familyMembers, setFamilyMembers] = useState([]);
  
    const generateID = (firstName, lastName, birthYear) => {
      return `${firstName}${lastName}${birthYear}`;
    };
  
    const handleAddFamilyMember = () => {
      const newMemberID = generateID(patientFirstName, patientLastName, patientBirthday.getFullYear());
      setFamilyMembers([...familyMembers, { fullName: '', birthday: new Date(), docRef: newMemberID }]);
    };
  
    const handleSave = async () => {
      // Handle saving data to Firestore
      const patientID = generateID(patientFirstName, patientLastName, patientBirthday.getFullYear());
      const patientDocRef = doc(db, "Patients", patientID);
      const patientData = {
        fullName: `${patientFirstName} ${patientLastName}`,
        birthdate: patientBirthday,
        gender: patientGender,
        healthHistory: patientHealthHistory.split(',').map(item => item.trim()),
        familyMembers: familyMembers.map(member => ({
          fullName: member.fullName,
          birthday: member.birthday,
          docRef: generateID(member.fullName.split(' ')[0], member.fullName.split(' ')[1], member.birthday.getFullYear())
        }))
      };
      await setDoc(patientDocRef, patientData);

      // Reset form fields after saving
      setPatientFirstName('');
      setPatientLastName('');
      setPatientBirthday(new Date());
      setPatientGender('');
      setPatientHealthHistory('');
      setFamilyMembers([]);
    };
  
    const handleFamilyMemberNameChange = (index, text) => {
      const updatedFamilyMembers = [...familyMembers];
      updatedFamilyMembers[index].fullName = text;
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
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={patientGender}
            onChangeText={setPatientGender}
          />
          <TextInput
            style={styles.input}
            placeholder="Health History (comma separated)"
            value={patientHealthHistory}
            onChangeText={setPatientHealthHistory}
          />
          <Button title="Select Patient Birthday" onPress={() => setShowPatientDatePicker(true)} />
          {showPatientDatePicker && (
            <DateTimePicker
              testID="patientDateTimePicker"
              value={patientBirthday}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPatientDatePicker(false);
                if (selectedDate) {
                  setPatientBirthday(selectedDate);
                }
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
                placeholder="Full Name"
                value={member.fullName}
                onChangeText={(text) => handleFamilyMemberNameChange(index, text)}
              />
              <Button title="Select Birthday" onPress={() => setShowFamilyMemberDatePicker(true)} />
              {showFamilyMemberDatePicker && (
                <DateTimePicker
                  testID="familyMemberDateTimePicker"
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