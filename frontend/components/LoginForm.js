import { useState } from 'react';
import { Text, TextInput, Button, View, Alert} from 'react-native';
import { useForm, Controller } from 'react-hook-form'; // controller validates form and tracks input

import { supabase } from '../libs/supabase';
import { useNavigation } from '@react-navigation/native';

const LoginForm = () => {
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
    const navigation = useNavigation();

    async function loginWithEmail({email, password}) {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    return (
        <View>
            <Controller 
                control={control}
                name="email"
                rules={{ required: true }}
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
            
            {isSubmitted && (
                <ErrorMessage 
                    errors={errors}
                    name="email"
                    render={ ({ message }) => <Text style={{ color: 'red' }}>{message}</Text> }
                />                
            )}  

            <Controller 
                control={control}
                name="password"
                rules={{ required: true }}
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

            {isSubmitted && (
                <ErrorMessage 
                    errors={errors}
                    name="password"
                    render={ ({ message }) => <Text style={{ color: 'red' }}>{message}</Text> }
                />
            )}

            <Button title="Submit" disabled={loading} onPress={handleSubmit(loginWithEmail)} />
            
            <Text>{watchedEmail} --- {watchedPassword}</Text>

            <Text onPress={() => navigation.navigate('Signup')}>
                Don't have an account? Sign up!
            </Text>

        </View>
    );
};

export default LoginForm;
