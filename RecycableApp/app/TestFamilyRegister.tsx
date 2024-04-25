import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase, { db } from "./Firebase";
import { doc, setDoc, getDoc, collection, addDoc, getDocs} from "firebase/firestore";

const TestFamilyRegister = () => {
    const [patientFirstName, setPatientFirstName] = useState('');
    const [patientMiddleName, setPatientMiddleName] = useState('');
    const [patientLastName, setPatientLastName] = useState('');
    const [patientBirthday, setPatientBirthday] = useState(new Date());
    const [patientGender, setPatientGender] = useState('');
    const [patientHealthHistory, setPatientHealthHistory] = useState('');
    const [showPatientDatePicker, setShowPatientDatePicker] = useState(false);
    const [showFamilyMemberDatePicker, setShowFamilyMemberDatePicker] = useState(false);
    const [familyMembers, setFamilyMembers] = useState([]);
    const [patientMaritalStatus, setPatientMaritalStatus] = useState('');
    const [patientAddress, setPatientAddress] = useState('');
    const [patientCity, setPatientCity] = useState('');
    const [patientState, setPatientState] = useState('');
    const [patientZip, setPatientZip] = useState('');
    const [patientPhoneNumber, setPatientPhoneNumber] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
  
    const generateID = (firstName, lastName, birthYear) => {
      return `${firstName}${lastName}${birthYear}`;
    };
  
    const handleAddFamilyMember = () => {
      const newMemberID = generateID(patientFirstName, patientLastName, patientBirthday.getFullYear());
      setFamilyMembers([...familyMembers, { fullName: { firstName: '', middleName: '', lastName: '' }, birthday: new Date(), docRef: newMemberID }]);
    };
  
    const handleSave = async () => {
      // Handle saving data to Firestore
      const patientID = generateID(patientFirstName, patientLastName, patientBirthday.getFullYear());
      const patientDocRef = doc(db, "Patients", patientID);
      const patientData = {
        fullName: {
          firstName: patientFirstName,
          middleName: patientMiddleName,
          lastName: patientLastName
        },
        birthdate: patientBirthday,
        gender: patientGender,
        maritalStatus: patientMaritalStatus,
        address: patientAddress,
        city: patientCity,
        state: patientState,
        zip: patientZip,
        phoneNumber: patientPhoneNumber,
        email: patientEmail,
        healthHistory: patientHealthHistory.split(',').map(item => item.trim()),
        familyMembers: familyMembers.map(member => ({
          fullName: member.fullName,
          birthday: member.birthday,
          docRef: generateID(member.fullName.firstName, member.fullName.lastName, member.birthday.getFullYear())
        }))
      };
      await setDoc(patientDocRef, patientData);

      // Reset form fields after saving
      setPatientFirstName('');
      setPatientMiddleName('');
      setPatientLastName('');
      setPatientBirthday(new Date());
      setPatientGender('');
      setPatientHealthHistory('');
      setFamilyMembers([]);
      setPatientMaritalStatus('');
      setPatientAddress('');
      setPatientCity('');
      setPatientState('');
      setPatientZip('');
      setPatientPhoneNumber('');
      setPatientEmail('');
    };
  
    const handleFamilyMemberNameChange = (index, fieldName, text) => {
      const updatedFamilyMembers = [...familyMembers];
      updatedFamilyMembers[index].fullName[fieldName] = text;
      setFamilyMembers(updatedFamilyMembers);
    };
  
    const handleFamilyMemberBirthdayChange = (index, event, selectedDate) => {
      const updatedFamilyMembers = [...familyMembers];
      updatedFamilyMembers[index].birthday = selectedDate || new Date();
      setFamilyMembers(updatedFamilyMembers);
    };

    const handlePhoneNumberChange = (text) => {
      // Remove all non-digit characters from input
      const formattedPhoneNumber = text.replace(/\D/g, '');
      // Auto-format the phone number as (XXX) XXX-XXXX
      let formattedValue = '';
      for (let i = 0; i < formattedPhoneNumber.length; i++) {
          if (i === 0) {
              formattedValue += '(';
          } else if (i === 3) {
              formattedValue += ') ';
          } else if (i === 6) {
              formattedValue += ' ';
          }
          formattedValue += formattedPhoneNumber[i];
      }
      setPatientPhoneNumber(formattedValue);
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
            placeholder="Patient Middle Name"
            value={patientMiddleName}
            onChangeText={setPatientMiddleName}
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
          <TextInput
            style={styles.input}
            placeholder="Marital Status"
            value={patientMaritalStatus}
            onChangeText={setPatientMaritalStatus}
            />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={patientAddress}
            onChangeText={setPatientAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={patientCity}
            onChangeText={setPatientCity}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={patientState}
            onChangeText={setPatientState}
          />
          <TextInput
            style={styles.input}
            placeholder="ZIP"
            value={patientZip}
            onChangeText={setPatientZip}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={patientPhoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType='phone-pad'
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={patientEmail}
            onChangeText={setPatientEmail}
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
                placeholder="First Name"
                value={member.fullName.firstName}
                onChangeText={(text) => handleFamilyMemberNameChange(index, 'firstName', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Middle Name"
                value={member.fullName.middleName}
                onChangeText={(text) => handleFamilyMemberNameChange(index, 'middleName', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={member.fullName.lastName}
                onChangeText={(text) => handleFamilyMemberNameChange(index, 'lastName', text)}
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
    familyMemberItem: {
      marginBottom: 10,
    },
});
export default TestFamilyRegister;