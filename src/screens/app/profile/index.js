import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../../../assets/rootStyles';
import { useProfile } from './data';
import ProfileBody from './profileBody';
import { P } from './routes';

const Stack = createNativeStackNavigator();

const ProfileHome = ({ navigation }) => {
  const user = useProfile();
  return (
    <ProfileBody
      user={user}
      isOwn
      navigation={navigation}
      onMenu={() => navigation.navigate(P.EVENTS)}
    />
  );
};

const screenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
  contentStyle: { backgroundColor: COLORS.white },
};

const ProfileNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name={P.HOME} component={ProfileHome} />
    <Stack.Screen name={P.EVENTS} getComponent={() => require('./events').default} />
    <Stack.Screen name={P.FRIEND} getComponent={() => require('./friend').default} />
    <Stack.Screen name={P.MESSAGES} getComponent={() => require('./messages').default} />
    <Stack.Screen name={P.CHAT} getComponent={() => require('./chat').default} />
    <Stack.Screen name={P.CONTACTS} getComponent={() => require('./contacts').default} />
    <Stack.Screen name={P.ACTIVITY} getComponent={() => require('./activity').WeeklyScreen} />
    <Stack.Screen name={P.GOLD} getComponent={() => require('./activity').GoldScreen} />
    <Stack.Screen name={P.MEMORY} getComponent={() => require('./activity').MemoryDetailScreen} />
    <Stack.Screen name={P.SETTINGS} getComponent={() => require('./settings').SettingsScreen} />
    <Stack.Screen name={P.EDIT} getComponent={() => require('./settings').EditProfileScreen} />
    <Stack.Screen name={P.CITY} getComponent={() => require('./settings').CityScreen} />
    <Stack.Screen name={P.LANGUAGE} getComponent={() => require('./settings').LanguageScreen} />
    <Stack.Screen name={P.EMOTIONS} getComponent={() => require('./settings').EmotionsScreen} />
    <Stack.Screen
      name={P.NOTIFICATIONS}
      getComponent={() => require('./settings').NotificationsSettingsScreen}
    />
    <Stack.Screen name={P.SECURITY} getComponent={() => require('./settings').SecurityScreen} />
    <Stack.Screen name={P.PASSWORD} getComponent={() => require('./settings').ChangePasswordScreen} />
    <Stack.Screen name={P.TWO_FA} getComponent={() => require('./settings').TwoFactorScreen} />
    <Stack.Screen name={P.METHOD} getComponent={() => require('./settings').ConfirmMethodScreen} />
    <Stack.Screen name={P.LINKED} getComponent={() => require('./settings').LinkedAccountsScreen} />
    <Stack.Screen name={P.EMAIL} getComponent={() => require('./settings').ChangeEmailScreen} />
    <Stack.Screen name={P.PHONE} getComponent={() => require('./settings').ChangePhoneScreen} />
    <Stack.Screen name={P.PHONE_CODE} getComponent={() => require('./settings').PhoneCodeScreen} />
    <Stack.Screen name={P.DELETE} getComponent={() => require('./settings').DeleteAccountScreen} />
    <Stack.Screen
      name={P.DELETE_PASSWORD}
      getComponent={() => require('./settings').DeletePasswordScreen}
    />
    <Stack.Screen name={P.DELETE_FINAL} getComponent={() => require('./settings').DeleteFinalScreen} />
    <Stack.Screen name={P.DELETE_DONE} getComponent={() => require('./settings').DeleteDoneScreen} />
    <Stack.Screen name={P.HELP} getComponent={() => require('./settings').HelpScreen} />
    <Stack.Screen name={P.FAQ} getComponent={() => require('./settings').FaqScreen} />
    <Stack.Screen name={P.REPORT} getComponent={() => require('./settings').ReportScreen} />
    <Stack.Screen name={P.SUPPORT} getComponent={() => require('./settings').SupportChatScreen} />
  </Stack.Navigator>
);

export default ProfileNavigator;
