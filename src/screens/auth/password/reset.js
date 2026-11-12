import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import AuthLayout from '../../../components/layout/AuthLayout';
import Button from '../../../components/button';
import OnboardingHeader from '../../../components/onboarding/header';
import { COLORS } from '../../../assets/rootStyles';
import { useContainer } from './hook';
import styles from './styles';

const CODE_LENGTH = 6;

const ResetPasswordScreen = ({ navigation, route }) => {
  const { handleResetAction } = useContainer();
  const email = route?.params?.email;
  const token = route?.params?.token;
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const ready =
    code.length === CODE_LENGTH && password.length >= 8 && password === repeat;

  return (
    <AuthLayout showLogo={false}>
      <OnboardingHeader currentStep={1} totalSteps={5} onBack={() => navigation.goBack()} />
      <Text style={styles.title}>Նոր գաղտնաբառ</Text>
      <Text style={styles.hint}>Մուտքագրեք կոդը և նոր գաղտնաբառը</Text>
      <Text style={styles.label}>Կոդ</Text>
      <TextInput
        style={styles.input}
        placeholder="000000"
        placeholderTextColor={COLORS.textSecondary}
        keyboardType="number-pad"
        maxLength={CODE_LENGTH}
        value={code}
        onChangeText={value => setCode(value.replace(/\D/g, '').slice(0, CODE_LENGTH))}
      />
      <Text style={styles.label}>Նոր գաղտնաբառ</Text>
      <TextInput
        style={styles.input}
        placeholder="Գաղտնաբառ"
        placeholderTextColor={COLORS.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.label}>Կրկնել գաղտնաբառը</Text>
      <TextInput
        style={styles.input}
        placeholder="Գաղտնաբառ"
        placeholderTextColor={COLORS.textSecondary}
        secureTextEntry
        value={repeat}
        onChangeText={setRepeat}
      />
      <Button
        label="Պահպանել"
        onPress={() =>
          handleResetAction({
            email,
            token,
            code,
            password,
            password_confirmation: repeat,
          })
        }
        disabled={!ready}
        style={styles.button}
      />
    </AuthLayout>
  );
};

export default ResetPasswordScreen;
