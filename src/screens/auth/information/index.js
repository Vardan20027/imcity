import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AuthLayout from '../../../components/layout/AuthLayout';
import Button from '../../../components/button';
import { Styles } from './styles';
import OnboardingHeader from '../../../components/onboarding/header';
import { COLORS } from '../../../assets/rootStyles';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import CalendarModal from "../../../components/calendar/calendarModal";


const InformationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [birthdate, setBirthdate] = useState(null);

  const genderOptions = [
    { id: 'm', label: 'Արական', value: 'male' },
    { id: 'f', label: 'Իգական', value: 'female' },
    { id: 'o', label: 'Չնշել', value: 'other' },
  ];
  const styles = Styles();
  const handleContinue = () => {
    navigation.navigate('AddFriend');
  };

  return (
    <AuthLayout showLogo={false}>
      <OnboardingHeader
        currentStep={5}
        totalSteps={5}
        onBack={() => navigation.goBack()}
      />
      <Text style={styles.title}>Լրացրեք ձեր տվյալները</Text>
      <Text style={styles.heading}>Անուն</Text>
      <TextInput
        style={styles.input}
        placeholder="Մուտքագրեք ձեր անունը"
        placeholderTextColor={COLORS.textSecondary}
        keyboardType="default"
        value={name}
        onChangeText={setName}
        maxLength={15}
      />
      <Text style={styles.heading}>Օգտագործողի անուն</Text>
      <TextInput
        style={styles.input}
        placeholder="Մուտքագրեք օգտանունը"
        placeholderTextColor={COLORS.textSecondary}
        keyboardType="default"
        value={username}
        onChangeText={setUsername}
        maxLength={15}
      />
      <Text style={styles.heading}>Ծննդյան ամսաթիվ</Text>
      <TouchableOpacity
        style={styles.birthdate}
        onPress={() => setCalendarVisible(true)}
      >
        <Text style={styles.birthdateText}>
          {birthdate ? birthdate.toLocaleDateString() : 'Ընտրեք ամսաթիվը'}
        </Text>
        <MIcon name={ICON_NAMES.CALENDAR} />
      </TouchableOpacity>

      <Text style={styles.heading}>Սեռ</Text>
      <View style={styles.genderOptions}>
        {genderOptions.map(item => {
          const isSelected = gender === item.value;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.row}
              onPress={() => setGender(item.value)}
            >
              <View style={[styles.circle, isSelected && styles.circleChecked]}>
                {isSelected && <View style={styles.innerDot} />}
              </View>

              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Button
        label="Շարունակել"
        onPress={handleContinue}
        disabled={name.length === 0}
        style={styles.button}
      />
      <CalendarModal
        visible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
        onConfirm={date => setBirthdate(date)}
        initialDate={birthdate}
      />
    </AuthLayout>
  );
};

export default InformationScreen;
