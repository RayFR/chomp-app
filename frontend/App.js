import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

import {useEffect, useState } from 'react';

import { supabase } from './libs/supabase';
import { Session } from '@supabase/supabase-js';
import { AuthProvider, useAuth } from './contexts/AuthProvider';



const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};


import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {

    const { session } = useAuth();

    return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
              {session && session.user ? ( // logged in
                <Stack.Screen name="Home">
                  {(props) => <HomeScreen {...props} session={session} /> /* manually need to pass in props when using function child */ } 
                </Stack.Screen>
              ) : ( // not logged in
                <>
                  <Stack.Screen name="Signup" component={SignupScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />                
                </>
              )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  )
}