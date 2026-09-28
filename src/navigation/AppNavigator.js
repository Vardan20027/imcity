import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/app/home';
import ProfileScreen from '../screens/app/profile';
import NotificationsScreen from '../screens/app/notifications';
import TabHomeIcon from '../components/svgs/tabbar/home';
import TabServicesIcon from '../components/svgs/tabbar/services';
import TabCenterIcon from '../components/svgs/tabbar/center';
import TabHeartIcon from '../components/svgs/tabbar/heart';
import TabProfileIcon from '../components/svgs/tabbar/profile';
import { COLORS } from '../assets/rootStyles';
import { normalize } from '../assets/deviceInfo/normalize';
import { ROUT_NAMES } from '../constants/rout';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TAB_ACTIVE = '#000000';
const TAB_INACTIVE = '#8E8C8C';

const Placeholder = () => (
  <View style={{ flex: 1, backgroundColor: COLORS.white }} />
);

const TabBarButton = ({
  children,
  style,
  onPress,
  onLongPress,
  href,
  ...rest
}) => (
  <Pressable
    {...rest}
    onPress={onPress}
    onLongPress={onLongPress}
    android_ripple={{ color: 'transparent' }}
    style={({ pressed }) => [
      style,
      styles.tabButton,
      pressed && styles.tabButtonPressed,
    ]}
  >
    {children}
  </Pressable>
);

const tabIcon = (Icon, focused, size = 24, height) => (
  <View style={styles.tabIconSlot}>
    <Icon
      width={normalize(size)}
      height={normalize(height ?? size)}
      color={focused ? TAB_ACTIVE : TAB_INACTIVE}
    />
  </View>
);

const Tabs = () => {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, normalize(12));

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarButton: TabBarButton,
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
        animation: 'fade',
        tabBarStyle: {
          height: normalize(56) + bottomPad,
          paddingTop: normalize(12),
          paddingBottom: bottomPad,
          paddingHorizontal: normalize(16),
          borderTopWidth: 1,
          borderTopColor: '#DFDDDD',
          backgroundColor: COLORS.white,
          elevation: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
          overflow: 'visible',
        },
        tabBarItemStyle: {
          height: normalize(44),
          padding: 0,
          margin: 0,
          backgroundColor: 'transparent',
        },
        tabBarIconStyle: {
          width: normalize(44),
          height: normalize(44),
          marginTop: 0,
          marginBottom: 0,
        },
      }}
    >
      <Tab.Screen
        name={ROUT_NAMES.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => tabIcon(TabHomeIcon, focused, 24),
        }}
      />
      <Tab.Screen
        name="Services"
        component={Placeholder}
        options={{
          tabBarIcon: ({ focused }) => tabIcon(TabServicesIcon, focused, 24),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Placeholder}
        options={{
          tabBarIcon: ({ focused }) => tabIcon(TabCenterIcon, focused, 44),
        }}
      />
      <Tab.Screen
        name={ROUT_NAMES.FAVORITES}
        component={Placeholder}
        options={{
          tabBarIcon: ({ focused }) => tabIcon(TabHeartIcon, focused, 25, 21.875),
        }}
      />
      <Tab.Screen
        name={ROUT_NAMES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => tabIcon(TabProfileIcon, focused, 24),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
      animationDuration: 280,
      gestureEnabled: true,
      fullScreenGestureEnabled: true,
      contentStyle: { backgroundColor: COLORS.white },
      statusBarStyle: 'dark',
      statusBarBackgroundColor: COLORS.white,
      navigationBarColor: COLORS.white,
    }}
  >
    <Stack.Screen name={ROUT_NAMES.TAB} component={Tabs} />
    <Stack.Screen
      name={ROUT_NAMES.NOTIFICATIONS}
      component={NotificationsScreen}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  tabButton: {
    overflow: 'visible',
    backgroundColor: 'transparent',
  },
  tabButtonPressed: {
    opacity: 0.55,
    backgroundColor: 'transparent',
  },
  tabIconSlot: {
    width: normalize(44),
    height: normalize(44),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
});

export default AppNavigator;
