import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const Profile = (navigation) => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>This is the Profile page.</Text>
        </View>
    )
}

export default Profile;