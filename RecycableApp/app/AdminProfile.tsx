import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function AdminProfile({ route, navigation }) {
    //const { userData } = route.params;

    return (
        <View style={styles.container}>
            {/* Profile Picture */}
            <View style={styles.profilePictureContainer}>
                <Image
                    source={require('./images/Profile.png')}
                    style={styles.profilePicture}
                />
            </View>

            {/* User Information */}
            <View style={styles.userInfoContainer}>
                <Text style={styles.userInfo}>Alexander</Text>
                <Text style={styles.userInfo}>J</Text>
                <Text style={styles.userInfo}>Hamilton</Text>
                <Text style={styles.userInfo}>1</Text>
            </View>

            {/* Button to Password Reset Page */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text>Reset Password</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePictureContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60, // Make the image circular
    },
    userInfoContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    userInfo: {
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 8,
    },
});

export default AdminProfile;
