import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import AuthLayout from '../../../components/layout/AuthLayout';
import Button from '../../../components/button';
import { COLORS } from '../../../assets/rootStyles';
import MIcon from '../../../components/svgs';
import { Styles } from './styles';

const styles = Styles();

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
    // if (!phone.trim()) return;
    navigation.navigate('Verification');
  };

  return (
    <AuthLayout>
      <Text style={styles.title}>Մուտք</Text>

      <TextInput
        style={styles.input}
        placeholder="Հեռախոսահամար"
        placeholderTextColor={COLORS.textSecondary}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        returnKeyType="done"
      />

      <Button
        label="Շարունակել"
        onPress={handleContinue}
        disabled={!phone.trim()}
        style={styles.button}
      />

      <Divider />

      <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
        <MIcon name="googleIcon" />
        <Text style={styles.googleLabel}>Մուտք գործել Google-ով</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
};

export default LoginScreen;
