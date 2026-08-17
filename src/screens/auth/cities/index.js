import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import AuthLayout from '../../../components/layout/AuthLayout';
import Button from '../../../components/button';
import { Styles } from './styles';
import OnboardingHeader from '../../../components/onboarding/header';

const CITIES = [
  { id: '1', name: 'Երևան' },
  { id: '2', name: 'Գյումրի' },
  { id: '3', name: 'Վանաձոր' },
  { id: '4', name: 'Աբովյան' },
  { id: '5', name: 'Կապան' },
];

const ChooseCity = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const styles = Styles();
  const handleContinue = () => {
    // if (!selectedCity) return;
    navigation.navigate('Emotions');
  };

  return (
    <AuthLayout showLogo={false}>
      <OnboardingHeader currentStep={3} totalSteps={5} onBack={() => navigation.goBack()} />
      <Text style={styles.title}>Ընտրիր քաղաքը</Text>

      {CITIES.map((city, index) => {
        const selected = selectedCity === city.id;
        return (
          <TouchableOpacity
            key={city.id}
            style={selected ? styles.cityRowSelected : styles.cityRow}
            onPress={() => setSelectedCity(city.id)}
            activeOpacity={0.6}
          >
            {selected && <Text style={styles.checkmark}>iM</Text>}
            <Text
              style={[styles.cityLabel, selected && styles.cityLabelSelected]}
            >
              {city.name}
            </Text>
          </TouchableOpacity>
        );
      })}
      <Button
        label="Շարունակել"
        onPress={handleContinue}
        disabled={!selectedCity}
        style={styles.button}
      />
    </AuthLayout>
  );
};

export default ChooseCity;
