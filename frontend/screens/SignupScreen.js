import { View, Text, } from 'react-native';

import SignupForm from '../components/SignupForm';
import styles from "../styles/screens/SignupStyles";

function SignupScreen() {
    return (
        <View>
            <Text>Sign Up</Text>

            <SignupForm />
        </View>
    )
}

export default SignupScreen;