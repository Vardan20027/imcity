import React from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MIcon from '../svgs';
import { ICON_NAMES } from '../svgs/icon_names';
import { Styles } from './styles';
import { COLORS } from '../../assets/rootStyles';

const styles = Styles();

const AuthLayout = ({ children }) => (
  <SafeAreaView style={styles.safeArea}>
    <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.heroCard}>
          <MIcon name={ICON_NAMES.WHITE_LOGO} />
        </View>

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
