import { useState } from 'react';
import { Text, TextInput, Button, View, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form'; // controller validates form and tracks input
import { ErrorMessage } from '@hookform/error-message';

import { supabase } from '../libs/supabase';
import { useNavigation } from '@react-navigation/native';

const SignupForm = () => {
    const { control, handleSubmit, formState: { errors, isSubmitted }, watch } = useForm({
        mode: 'onSubmit',
        defaultValues: { // fixes uncontrolled input
            email: '',
            password: '',
        },
        criteriaMode: "all",
    });

    const watchedEmail = watch('email');
    const watchedPassword = watch('password');    
    const [loading, setLoading] = useState(false);
    const [errorCheck, setErrorCheck] = useState(false);
    const navigation = useNavigation();

    async function signUpWithEmail({ email, password }) {
        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message);
        if (!session) Alert.alert('Please check your inbox for email verification!');
        setLoading(false);
    }

    return (
        <View>
            <Controller 
                control={control}
                name="email"
                rules={{ required: "Email is required.", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address." }, }}
                render={({ field: { onChange, value } }) => ( // render func defines how form behaves and looks
                    <TextInput 
                        style={{ borderWidth: 1, marginBottom: 10 }}
                        onChangeText={(text) => onChange(text)} // bridges the onChange function
                        value={value}
                        leftIcon={{ type: 'font-awesome', name: 'envelope' }}                        
                        placeholder='Email'
                        autoCapitalize={'none'}
                    />
                )}
            />
            
            {formState.isSubmitted && (
                <ErrorMessage 
                    errors={errors}
                    name="email"
                    render={ ({ message }) => <Text style={{ color: 'red' }}>{message}</Text> }
                />                
            )}

            <Controller 
                control={control}
                name="password"
                rules={{ required: "Password is required.", minLength: { value: 6, message: "Must be more than 6 character long." } }}
                render={({ field: { onChange, value } }) => (
                    <TextInput 
                        style={{ borderWidth: 1, marginBottom: 10 }}
                        onChangeText={(text) => onChange(text)}
                        value={value}
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}                        
                        secureTextEntry={ true }
                        placeholder='Password'
                        autoCapitalize={'none'}                        
                    />
                )}
            />
            
            {formState.isSubmitted && (
                <ErrorMessage 
                    errors={errors}
                    name="password"
                    render={ ({ message }) => <Text style={{ color: 'red' }}>{message}</Text> }
                />
            )}

            <Button title="Submit" onPress={handleSubmit(signUpWithEmail)} />

            <Text>Email = {watchedEmail} --- Password = {watchedPassword}</Text>

            <Text onPress={() => navigation.navigate('Login')}>
                Already have an account? Log in!
            </Text>
            
        </View>
    );
};

export default SignupForm;