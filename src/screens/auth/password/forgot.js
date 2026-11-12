import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import AuthLayout from '../../../components/layout/AuthLayout';
import Button from '../../../components/button';
import OnboardingHeader from '../../../components/onboarding/header';
import { COLORS } from '../../../assets/rootStyles';
import { useContainer } from './hook';
import styles from './styles';

const EMAIL_PATTERN = /\S+@\S+\.\S+/;

const ForgotPasswordScreen = ({ navigation, route }) => {
  const { handleForgotAction } = useContainer();
  const [email, setEmail] = useState(route?.params?.email || '');

  return (
    <AuthLayout showLogo={false}>
      <OnboardingHeader currentStep={1} totalSteps={5} onBack={() => navigation.goBack()} />
      <Text style={styles.title}>Գաղտնաբառի վերականգնում</Text>
      <Text style={styles.hint}>Մուտքագրեք էլ. հասցեն, և մենք կուղարկենք կոդը</Text>
      <Text style={styles.label}>Էլ. հասցե</Text>
      <TextInput
        style={styles.input}
        placeholder="you@email.com"
        placeholderTextColor={COLORS.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
      <Button
        label="Շարունակել"
        onPress={() => handleForgotAction({ email: email.trim() })}
        disabled={!EMAIL_PATTERN.test(email.trim())}
        style={styles.button}
      />
    </AuthLayout>
  );
};

export default ForgotPasswordScreen;
