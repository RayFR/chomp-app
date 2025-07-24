import { useState } from 'react';
import { Text, TextInput, Button, View} from 'react-native';
import { useForm, Controller } from 'react-hook-form'; // controller validates form and tracks input

import { supabase } from '../lib/supabase';

const SignupForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const onSubmit = data => {
        console.log(data);
        setUsername(data.username);
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
            {errors.username && <Text>Must enter an email.</Text>}

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

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            
            <Text>{username} --- {password}</Text>
        </View>
    );
};

export default SignupForm;