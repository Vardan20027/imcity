import React from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from './styles';
import { COLORS } from '../../assets/rootStyles';

const styles = Styles();

const AuthLayout = ({
  children,
  showLogo = true,
  keyboardVerticalOffset = 0,
  containerStyle,
  barStyle = 'dark-content',
  testID = 'auth-layout',
}) => (
  <SafeAreaView style={styles.safeArea} testID={testID}>
    <StatusBar barStyle={barStyle} backgroundColor={COLORS.background} />

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
