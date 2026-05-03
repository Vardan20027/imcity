import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import AuthLayout from '../../../components/layout/AuthLayout';
import Button from '../../../components/button';
import { Styles } from './styles';

const CODE_LENGTH = 4;
const RESEND_COUNTDOWN = 59;
const styles = Styles();

const OTPInput = ({ value, isFocused, onPress }) => (
  <TouchableOpacity
    style={[styles.otpCircle, isFocused && styles.otpCircleFocused]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    {value ? <View style={styles.otpDotFilled} /> : null}
    {!value && isFocused ? <View style={styles.otpCursor} /> : null}
  </TouchableOpacity>
);

const VerificationScreen = ({ navigation, route }) => {
  const { phone } = route.params ?? {};
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(RESEND_COUNTDOWN);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (countdown === 0) return;
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChangeText = text => {
    const digits = text.replace(/\D/g, '').slice(0, CODE_LENGTH);
    setCode(digits);
    setFocusedIndex(Math.min(digits.length, CODE_LENGTH - 1));
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setCode('');
    setFocusedIndex(0);
    setCountdown(RESEND_COUNTDOWN);
    inputRef.current?.focus();
  };

  const handleContinue = () => {
    // if (code.length < CODE_LENGTH) return;
    navigation.navigate('ChooseCity');
  };

  const canResend = countdown === 0;

  return (
    <AuthLayout>
      {/* Hidden real input — captures keyboard */}
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={handleChangeText}
        keyboardType="number-pad"
        maxLength={CODE_LENGTH}
        autoFocus
        style={styles.hiddenInput}
        caretHidden
      />

      <Text style={styles.title}>Մուտքագրի՛ր կոդը</Text>

      <View style={styles.otpRow}>
        {Array.from({ length: CODE_LENGTH }).map((_, i) => (
          <OTPInput
            key={i}
            value={code[i]}
            isFocused={focusedIndex === i && code.length < CODE_LENGTH}
            onPress={() => inputRef.current?.focus()}
          />
        ))}
      </View>

      <View style={styles.resendRow}>
        <Text style={styles.resendText}>Չե՞ս ստացել կոդը։ </Text>
        <TouchableOpacity onPress={handleResend} disabled={!canResend}>
          <Text
            style={[styles.resendLink, !canResend && styles.resendLinkDisabled]}
          >
            {canResend
              ? 'Կրկին ուղարկել'
              : `Կրկին ուղարկել (00:${String(countdown).padStart(2, '0')})`}
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        label="Հաստատել"
        onPress={handleContinue}
        disabled={code.length < CODE_LENGTH}
        style={styles.button}
      />
    </AuthLayout>
  );
};

export default VerificationScreen;
