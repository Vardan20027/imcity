import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LanguageSelectScreen from '../screens/auth/welcome';
import LoginScreen from '../screens/auth/login';
import VerificationScreen from '../screens/auth/verification';
import ChooseCity from '../screens/auth/cities';
import EmotionsScreen from '../screens/auth/emotions';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Verification" component={VerificationScreen} />
    <Stack.Screen name="ChooseCity" component={ChooseCity} />
    <Stack.Screen name="Emotions" component={EmotionsScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
