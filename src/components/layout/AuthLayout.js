import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { COLORS } from '../../assets/rootStyles';

const AuthLayout = ({
  children,
  showLogo = true,
  keyboardVerticalOffset = 0,
  containerStyle,
  testID = 'auth-layout',
}) => (
  <SafeAreaView style={styles.safeArea} testID={testID}>
    {Platform.OS === 'android' ? (
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
        translucent={false}
      />
    ) : null}

    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={[styles.container, containerStyle]}>
        {showLogo && (
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              accessible
              accessibilityLabel="App logo"
              accessibilityRole="image"
            />
          </View>
        )}

        <ScrollView
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

export default AuthLayout;
