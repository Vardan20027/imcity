import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

// Replace `isAuthenticated` with your real auth state (AsyncStorage token check, context, etc.)
const isAuthenticated = false;

const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {isAuthenticated ? (
      <Stack.Screen name="App" component={AppNavigator} />
    ) : (
      <Stack.Screen name="Auth" component={AuthNavigator} />
    )}
  </Stack.Navigator>
);

export default RootNavigator;
