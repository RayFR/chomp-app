import { useState } from 'react';
import { Text, TextInput, Button, View} from 'react-native';
import { useForm, Controller } from 'react-hook-form'; // controller validates form and tracks input

import { supabase } from '../libs/supabase';

const LoginForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    
    const [email, setemail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState();

    async function loginWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    const onSubmit = data => {
        console.log(data);
        setemail(data.email);
        setPassword(data.password);
    };

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
                    />
                )}
            />
            {errors.email && <Text>Must enter an email.</Text>}

            <Controller 
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    <TextInput 
                        style={{ borderWidth: 1, marginBottom: 10 }}
                        onChangeText={(text) => onChange(text)}
                        value={value}
                    />
                )}
            />
            {errors.password && <Text>Must enter a password.</Text>}

            <Button title="Submit" onPress={handleSubmit(loginWithEmail)} />
            
            <Text>{email} --- {password}</Text>
        </View>
    );
};

export default LoginForm;
