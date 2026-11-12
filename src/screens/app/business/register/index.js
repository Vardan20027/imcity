import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../../../../assets/rootStyles';
import { INITIAL_DRAFT, REG } from './data';
import { RegContext } from './context';
import {
  BasicsScreen,
  ContactScreen,
  IntroScreen,
  PhotosScreen,
  PreviewScreen,
  SuccessScreen,
} from './screens';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
  contentStyle: { backgroundColor: COLORS.white },
};

const RegisterNavigator = () => {
  const [draft, setDraft] = useState(INITIAL_DRAFT);
  const update = patch => setDraft(current => ({ ...current, ...patch }));

  return (
    <RegContext.Provider value={{ draft, update }}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={REG.INTRO} component={IntroScreen} />
        <Stack.Screen name={REG.BASICS} component={BasicsScreen} />
        <Stack.Screen name={REG.CONTACT} component={ContactScreen} />
        <Stack.Screen name={REG.PHOTOS} component={PhotosScreen} />
        <Stack.Screen name={REG.PREVIEW} component={PreviewScreen} />
        <Stack.Screen name={REG.SUCCESS} component={SuccessScreen} />
      </Stack.Navigator>
    </RegContext.Provider>
  );
};

export default RegisterNavigator;
