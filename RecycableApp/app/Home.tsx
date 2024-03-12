import { Pressable, Text, View } from "react-native";
import { TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

function Home(){

    const navigation = useNavigation<any>();

    const userData = {
        Data1: '1',
        Data2: true
    }

    var ProfileButton = 
    <TouchableOpacity onPress={() => navigation.navigate("Profile", { userData })}>
        <Text>Profile</Text>
    </TouchableOpacity>

    var LoginButton = 
    <TouchableOpacity onPress={() => navigation.navigate("Login", { userData })}>
        <Text>Login</Text>
    </TouchableOpacity>

    var TrackingButton = 
    <TouchableOpacity onPress={() => navigation.navigate("Tracking", { userData })}>
        <Text>Tracking</Text>
    </TouchableOpacity>

    return (
        <View>
            <Text>This is the Home Screen.</Text>
            <GestureHandlerRootView>
                {ProfileButton}
                {LoginButton}
                {TrackingButton}
            </GestureHandlerRootView>
        </View>
    )
}

export default Home;