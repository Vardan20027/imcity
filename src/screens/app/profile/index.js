import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../../../assets/rootStyles';
import { useProfile } from './data';
import ProfileBody from './profileBody';
import { P } from './routes';
import EventsScreen from './events';
import FriendScreen from './friend';
import MessagesScreen from './messages';
import ChatScreen from './chat';
import ContactsScreen from './contacts';
import { GoldScreen, MemoryDetailScreen, WeeklyScreen } from './activity';
import {
  ChangeEmailScreen,
  ChangePasswordScreen,
  ChangePhoneScreen,
  CityScreen,
  ConfirmMethodScreen,
  DeleteAccountScreen,
  DeleteDoneScreen,
  DeleteFinalScreen,
  DeletePasswordScreen,
  EditProfileScreen,
  EmotionsScreen,
  FaqScreen,
  HelpScreen,
  LanguageScreen,
  LinkedAccountsScreen,
  NotificationsSettingsScreen,
  PhoneCodeScreen,
  ReportScreen,
  SecurityScreen,
  SettingsScreen,
  SupportChatScreen,
  TwoFactorScreen,
} from './settings';
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
    <Stack.Screen name={P.EVENTS} component={EventsScreen} />
    <Stack.Screen name={P.FRIEND} component={FriendScreen} />
    <Stack.Screen name={P.MESSAGES} component={MessagesScreen} />
    <Stack.Screen name={P.CHAT} component={ChatScreen} />
    <Stack.Screen name={P.CONTACTS} component={ContactsScreen} />
    <Stack.Screen name={P.ACTIVITY} component={WeeklyScreen} />
    <Stack.Screen name={P.GOLD} component={GoldScreen} />
    <Stack.Screen name={P.MEMORY} component={MemoryDetailScreen} />
    <Stack.Screen name={P.SETTINGS} component={SettingsScreen} />
    <Stack.Screen name={P.EDIT} component={EditProfileScreen} />
    <Stack.Screen name={P.CITY} component={CityScreen} />
    <Stack.Screen name={P.LANGUAGE} component={LanguageScreen} />
    <Stack.Screen name={P.EMOTIONS} component={EmotionsScreen} />
    <Stack.Screen name={P.NOTIFICATIONS} component={NotificationsSettingsScreen} />
    <Stack.Screen name={P.SECURITY} component={SecurityScreen} />
    <Stack.Screen name={P.PASSWORD} component={ChangePasswordScreen} />
    <Stack.Screen name={P.TWO_FA} component={TwoFactorScreen} />
    <Stack.Screen name={P.METHOD} component={ConfirmMethodScreen} />
    <Stack.Screen name={P.LINKED} component={LinkedAccountsScreen} />
    <Stack.Screen name={P.EMAIL} component={ChangeEmailScreen} />
    <Stack.Screen name={P.PHONE} component={ChangePhoneScreen} />
    <Stack.Screen name={P.PHONE_CODE} component={PhoneCodeScreen} />
    <Stack.Screen name={P.DELETE} component={DeleteAccountScreen} />
    <Stack.Screen name={P.DELETE_PASSWORD} component={DeletePasswordScreen} />
    <Stack.Screen name={P.DELETE_FINAL} component={DeleteFinalScreen} />
    <Stack.Screen name={P.DELETE_DONE} component={DeleteDoneScreen} />
    <Stack.Screen name={P.HELP} component={HelpScreen} />
    <Stack.Screen name={P.FAQ} component={FaqScreen} />
    <Stack.Screen name={P.REPORT} component={ReportScreen} />
    <Stack.Screen name={P.SUPPORT} component={SupportChatScreen} />
  </Stack.Navigator>
);

export default ProfileNavigator;
