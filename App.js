import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import * as RNBootSplash from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    const prepare = async () => {
      await Promise.all([new Promise(r => setTimeout(r, 800))]);

      await RNBootSplash.hide({ fade: true });
    };

    prepare();
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
