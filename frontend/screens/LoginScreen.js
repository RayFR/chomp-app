import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form'; // controller manages the input values and validation rules

import LoginForm from "../components/LoginForm";
import styles from "../styles/screens/LoginStyles";

function LoginScreen() {

    return (
        <View>
            <Text>Log In</Text>

            <LoginForm />
        </View>
    )
}

export default LoginScreen;