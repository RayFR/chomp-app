import { View, Text, } from 'react-native';
import { useTheme } from 'react-native-paper';

import styles from "../styles/screens/HomeStyles"


function HomeScreen() {

    const theme = useTheme(); 

    return (
        <View style={{ backgroundColor: theme.colors.primary}}>
            <Text>Home</Text>
        </View>
    )
}

export default HomeScreen;