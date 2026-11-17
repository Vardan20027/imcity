import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { getAuthToken, setAuthenticated, subscribeAuthenticated } from '../services/api/auth';
import { loadLanguage } from '../services/language';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [ready, setReady] = useState(false);
  const [authenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    Promise.all([getAuthToken(), loadLanguage()])
      .then(([token]) => {
        if (active && token) setAuthenticated(true);
      })
      .finally(() => {
        if (active) setReady(true);
      });

    const unsubscribe = subscribeAuthenticated(value => {
      if (active) setIsAuthenticated(value);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  if (!ready) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 220,
        statusBarStyle: 'dark',
        statusBarBackgroundColor: '#FFFFFF',
        navigationBarColor: '#FFFFFF',
      }}
    >
      {authenticated ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
