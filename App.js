import React, { useEffect } from 'react';
import { Appearance, StatusBar } from 'react-native';
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
  useEffect(() => {
    Appearance.setColorScheme('light');
    StatusBar.setBarStyle('dark-content', true);
    if (StatusBar.setBackgroundColor) {
      StatusBar.setBackgroundColor('#FFFFFF', true);
    }
    const prepare = async () => {
      await Promise.all([new Promise(r => setTimeout(r, 800))]);

      await RNBootSplash.hide({ fade: true });
    };

    prepare();
  }, []);
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      <NavigationContainer theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
