import { Pressable, Text, View, StyleSheet} from "react-native";
import { TouchableOpacity, GestureHandlerRootView} from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

function Home(){

    const navigation = useNavigation<any>();

    const userData = {
        Data1: '1',
        Data2: true
    }

    var ProfileButton = 
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profile", { userData })}>
        <Text>Profile</Text>
    </TouchableOpacity>

    var LoginButton = 
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login", { userData })}>
        <Text>Login</Text>
    </TouchableOpacity>

    var TrackingButton = 
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Tracking", { userData })}>
        <Text>Tracking</Text>
    </TouchableOpacity>

    return (
        <View style={styles.container}>
            <Text>This is the Home Screen.</Text>
            <GestureHandlerRootView>
                {ProfileButton}
                {LoginButton}
                {TrackingButton}
            </GestureHandlerRootView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#bfefff",
    },
    button: {
        backgroundColor: "lightblue",
        padding: 10,
        margin: 10,
        borderRadius: 8,
        textAlign: 'center',
    },
});

export default Home;