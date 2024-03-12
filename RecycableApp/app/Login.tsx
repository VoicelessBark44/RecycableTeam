import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const Login = (navigation) => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>This is the Login page.</Text>
        </View>
    )
}

export default Login;