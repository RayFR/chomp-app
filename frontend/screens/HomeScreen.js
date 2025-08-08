import { View, Text, } from 'react-native';
import { useTheme } from 'react-native-paper';

import styles from "../styles/screens/HomeStyles"
import Logout from "../components/Home/Logout";
import { supabase } from "../libs/supabase";
import { useAuth } from "../contexts/AuthProvider";


function HomeScreen() {
    const { user } = useAuth(); // stores user obj
    const theme = useTheme(); 

    return (
        <View style={{ backgroundColor: theme.colors.primary}}>
            <Text>Home - Logged in as email: {user.email}</Text>

            <Logout />
        </View>
    )
}

export default HomeScreen;