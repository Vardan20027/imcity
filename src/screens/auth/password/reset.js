import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import AuthLayout from '../../../components/layout/AuthLayout';
import Button from '../../../components/button';
import OnboardingHeader from '../../../components/onboarding/header';
import { COLORS } from '../../../assets/rootStyles';
import { useContainer } from './hook';
import styles from './styles';
import { useT } from '../../../locales/useT';

const CODE_LENGTH = 6;

const ResetPasswordScreen = ({ navigation, route }) => {
  const t = useT();
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
      <Text style={styles.title}>{t('Նոր գաղտնաբառ')}</Text>
      <Text style={styles.hint}>{t('Մուտքագրեք կոդը և նոր գաղտնաբառը')}</Text>
      <Text style={styles.label}>{t('Կոդ')}</Text>
      <TextInput
        style={styles.input}
        placeholder="000000"
        placeholderTextColor={COLORS.textSecondary}
        keyboardType="number-pad"
        maxLength={CODE_LENGTH}
        value={code}
        onChangeText={value => setCode(value.replace(/\D/g, '').slice(0, CODE_LENGTH))}
      />
      <Text style={styles.label}>{t('Նոր գաղտնաբառ')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('Գաղտնաբառ')}
        placeholderTextColor={COLORS.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.label}>{t('Կրկնել գաղտնաբառը')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('Գաղտնաբառ')}
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
