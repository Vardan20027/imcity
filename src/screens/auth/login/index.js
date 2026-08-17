import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Button from '../../../components/button';
import { COLORS } from '../../../assets/rootStyles';
import MIcon from '../../../components/svgs';
import { Styles } from './styles';
import OnboardingHeader from '../../../components/onboarding/header';
import AuthLayout from '../../../components/layout/AuthLayout';

const styles = Styles();

const ARMENIA_DIAL_CODE = '+374';
const ARMENIA_PHONE_LENGTH = 8; // still unverified against a real spec — flagged before, still true

const Divider = () => (
  <View style={styles.dividerRow}>
    <View style={styles.dividerLine} />
    <Text style={styles.dividerLabel}>Կամ</Text>
    <View style={styles.dividerLine} />
  </View>
);

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    navigation.navigate('Verification');
  };

  return (
    <AuthLayout showLogo={false}>
      <View>
        <OnboardingHeader currentStep={1} totalSteps={5} onBack={() => navigation.goBack()} />

          <Text style={styles.title}>Մուտք</Text>

          <View style={styles.phoneRow}>
            <View style={styles.codePrefix}>
              <Image source={require('../../../assets/flags/am.png')} style={styles.flag} />
              <Text style={styles.dialCode}>{ARMENIA_DIAL_CODE}</Text>
            </View>
            <View style={styles.separator} />
            <TextInput
              style={styles.input}
              placeholder="Հեռախոսահամար"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={ARMENIA_PHONE_LENGTH}
              returnKeyType="done"
            />
          </View>

          <Button
            label="Շարունակել"
            onPress={handleContinue}
            disabled={phone.length !== ARMENIA_PHONE_LENGTH}
          />
      </View>

      <View>
        <Divider />
        <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
          <MIcon name="googleIcon" />
          <Text style={styles.googleLabel}>Մուտք գործել Google-ով</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

export default LoginScreen;