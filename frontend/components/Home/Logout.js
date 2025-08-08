import { Text, TextInput, Button, View, Alert} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { supabase } from '../../libs/supabase';

export default function Logout() {
    
    async function signOut() {
        const { error } = await supabase.auth.signOut({ scope: 'local' }); // local scope stops logging out globally on other devices
    }

    return(
        <Button onPress={signOut}>Log out</Button>
    )
}