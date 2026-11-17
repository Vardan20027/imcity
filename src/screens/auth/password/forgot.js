import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import AuthLayout from '../../../components/layout/AuthLayout';
import Button from '../../../components/button';
import OnboardingHeader from '../../../components/onboarding/header';
import { COLORS } from '../../../assets/rootStyles';
import { useContainer } from './hook';
import styles from './styles';
import { useT } from '../../../locales/useT';
import { emailError } from '../../../utils/validate';

const ForgotPasswordScreen = ({ navigation, route }) => {
  const t = useT();
  const { handleForgotAction } = useContainer();
  const [email, setEmail] = useState(route?.params?.email || '');
  const [error, setError] = useState('');

  const submit = () => {
    const message = emailError(email);
    setError(message);
    if (message) return;
    handleForgotAction({ email: email.trim() });
  };

  return (
    <AuthLayout showLogo={false}>
      <OnboardingHeader currentStep={1} totalSteps={5} onBack={() => navigation.goBack()} />
      <Text style={styles.title}>{t('Գաղտնաբառի վերականգնում')}</Text>
      <Text style={styles.hint}>{t('Մուտքագրեք էլ. հասցեն, և մենք կուղարկենք կոդը')}</Text>
      <Text style={styles.label}>{t('Էլ. հասցե')}</Text>
      {error ? <Text style={styles.errorText}>{t(error)}</Text> : null}
      <TextInput
        style={[styles.input, error && styles.inputInvalid]}
        placeholder="you@email.com"
        placeholderTextColor={COLORS.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={value => {
          setEmail(value);
          if (error) setError('');
        }}
      />
      <Button
        label="Շարունակել"
        onPress={submit}
        style={styles.button}
      />
    </AuthLayout>
  );
};

export default ForgotPasswordScreen;
