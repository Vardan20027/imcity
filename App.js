import React, { useEffect } from 'react';
import { Appearance, Platform, StatusBar } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import * as RNBootSplash from 'react-native-bootsplash';

Appearance.setColorScheme('light');

const navigationTheme = {
  ...DefaultTheme,
  dark: false,
};

const App = () => {
  const onNavigationReady = () => {
    RNBootSplash.hide({ fade: true });
  };

  useEffect(() => {
    Appearance.setColorScheme('light');
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('dark-content', true);
      StatusBar.setBackgroundColor('#FFFFFF', true);
    }
  }, []);

  return (
    <SafeAreaProvider>
      {Platform.OS === 'android' ? (
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFFFF"
          translucent={false}
        />
      ) : null}
      <NavigationContainer theme={navigationTheme} onReady={onNavigationReady}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
