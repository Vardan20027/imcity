import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AuthLayout from '../../../components/layout/AuthLayout';
import Button from '../../../components/button';
import styles from './styles';
import OnboardingHeader from '../../../components/onboarding/header';
import { COLORS } from '../../../assets/rootStyles';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import CalendarModal from "../../../components/calendar/calendarModal";
import { getRegistration, setRegistration } from '../draft';
import { replaceProfile } from '../../app/profile/data';
import { setAuthenticated } from '../../../services/api/auth';
import dispatch from '../../../utils/dispatch/dispatch';
import { updateUserProfile } from '../../../state/user/operations/updateProfile';
import { birthdayForApi, formatBirthday } from '../../../utils/birthday';
import { useT } from '../../../locales/useT';
import { birthdateError, personNameError, usernameError } from '../../../utils/validate';

const InformationScreen = ({ navigation }) => {
  const t = useT();
  const draft = getRegistration();
  const [name, setName] = useState(draft.name || '');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [birthdate, setBirthdate] = useState(null);
  const [errors, setErrors] = useState({});

  const genderOptions = [
    { id: 'm', label: 'Արական', value: 'male' },
    { id: 'f', label: 'Իգական', value: 'female' },
    { id: 'o', label: 'Չնշել', value: 'other' },
  ];

  const clearError = key => {
    if (!errors[key]) return;
    setErrors(current => ({ ...current, [key]: '' }));
  };

  const handleContinue = () => {
    const trimmedName = name.trim().replace(/\s+/g, ' ');
    const usernameValue = username.trim().replace(/^@/, '');
    const nextErrors = {};
    const nameMessage = personNameError(trimmedName, 'name');
    const usernameMessage = usernameError(usernameValue);
    const birthdayMessage = birthdateError(birthdate);
    if (nameMessage) nextErrors.name = nameMessage;
    if (usernameMessage) nextErrors.username = usernameMessage;
    if (birthdayMessage) nextErrors.birthdate = birthdayMessage;
    if (!gender) {
      nextErrors.gender = 'Ընտրեք սեռը';
    }
    const draft = getRegistration();
    if (!draft.city?.name) {
      nextErrors.city = 'Վերադարձեք և ընտրեք քաղաքը';
    }
    if (!draft.emotions?.length) {
      nextErrors.emotions = 'Վերադարձեք և ընտրեք էմոցիա';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const birthday = formatBirthday(birthdate);
    const genderLabel = genderOptions.find(item => item.value === gender)?.label || '';
    setRegistration({
      name: trimmedName,
      username: usernameValue,
      birthday,
      gender,
    });
    replaceProfile({
      name: trimmedName,
      handle: `@${usernameValue}`,
      email: draft.email,
      city: draft.city.name,
      gender: genderLabel,
      birthday,
      emotions: draft.emotions,
    });
    dispatch(updateUserProfile({
      first_name: trimmedName,
      username: usernameValue,
      birthday: birthdayForApi(birthday),
      gender,
      city: draft.city.name || draft.city.id || '',
      email: draft.email,
    })).catch(() => {});
    setAuthenticated(true);
  };

  return (
    <AuthLayout showLogo={false}>
      <OnboardingHeader
        currentStep={5}
        totalSteps={5}
        onBack={() => navigation.goBack()}
      />
      <Text style={styles.title}>{t('Լրացրեք ձեր տվյալները')}</Text>
      {errors.city ? <Text style={styles.errorText}>{t(errors.city)}</Text> : null}
      {errors.emotions ? <Text style={styles.errorText}>{t(errors.emotions)}</Text> : null}
      <Text style={styles.heading}>{t('Անուն')}</Text>
      {errors.name ? <Text style={styles.errorText}>{t(errors.name)}</Text> : null}
      <TextInput
        style={[styles.input, errors.name && styles.inputInvalid]}
        placeholder={t('Մուտքագրեք ձեր անունը')}
        placeholderTextColor={COLORS.textSecondary}
        keyboardType="default"
        value={name}
        onChangeText={value => {
          setName(value);
          clearError('name');
        }}
        maxLength={30}
      />
      <Text style={styles.heading}>{t('Օգտագործողի անուն')}</Text>
      {errors.username ? <Text style={styles.errorText}>{t(errors.username)}</Text> : null}
      <TextInput
        style={[styles.input, errors.username && styles.inputInvalid]}
        placeholder={t('Մուտքագրեք օգտանունը')}
        placeholderTextColor={COLORS.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={value => {
          setUsername(value);
          clearError('username');
        }}
        maxLength={15}
      />
      <Text style={styles.heading}>{t('Ծննդյան ամսաթիվ')}</Text>
      {errors.birthdate ? <Text style={styles.errorText}>{t(errors.birthdate)}</Text> : null}
      <TouchableOpacity
        style={[styles.birthdate, errors.birthdate && styles.inputInvalid]}
        onPress={() => setCalendarVisible(true)}
      >
        <Text style={birthdate ? styles.birthdateText : styles.birthdatePlaceholder}>
          {birthdate ? formatBirthday(birthdate) : t('Ընտրեք ամսաթիվը')}
        </Text>
        <MIcon name={ICON_NAMES.CALENDAR} />
      </TouchableOpacity>

      <Text style={styles.heading}>{t('Սեռ')}</Text>
      {errors.gender ? <Text style={styles.errorText}>{t(errors.gender)}</Text> : null}
      <View style={[styles.genderOptions, errors.gender && styles.inputInvalid]}>
        {genderOptions.map(item => {
          const isSelected = gender === item.value;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.row}
              onPress={() => {
                setGender(item.value);
                clearError('gender');
              }}
            >
              <View style={[styles.circle, isSelected && styles.circleChecked]}>
                {isSelected && <View style={styles.innerDot} />}
              </View>

              <Text style={styles.label}>{t(item.label)}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Button
        label={t('Շարունակել')}
        onPress={handleContinue}
        style={styles.button}
      />
      <CalendarModal
        visible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
        onConfirm={date => {
          setBirthdate(date);
          clearError('birthdate');
        }}
        initialDate={birthdate}
      />
    </AuthLayout>
  );
};

export default InformationScreen;
