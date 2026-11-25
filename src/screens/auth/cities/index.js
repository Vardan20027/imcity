import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AuthLayout from '../../../components/layout/AuthLayout';
import Button from '../../../components/button';
import styles from './styles';
import OnboardingHeader from '../../../components/onboarding/header';
import MIcon from '../../../components/svgs';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import { normalize } from '../../../assets/deviceInfo/normalize';
import { useApiList } from '../../../state/reads/useList';
import { getCities } from '../../../state/reads/operations';
import { nameOf } from '../../../state/reads/shape';
import { setRegistration } from '../draft';
import { useT } from '../../../locales/useT';
import { CITY_NAMES, pickCities } from '../../../constants/cities';

const CITIES = CITY_NAMES.map((name, index) => ({ id: String(index + 1), name }));

const ChooseCity = ({ navigation }) => {
  const t = useT();
  const [selectedCity, setSelectedCity] = useState(null);
  const [open, setOpen] = useState(false);
  const remoteCities = useApiList(getCities);
  const cities = pickCities(remoteCities || CITIES)
    .map(city => ({
      id: city?.id ?? nameOf(city),
      name: nameOf(city),
    }))
    .filter(city => city.name);
  const selected = cities.find(city => city.id === selectedCity);

  const handleContinue = () => {
    if (!selected) return;
    setRegistration({ city: selected });
    navigation.navigate('Emotions');
  };

  const handleSelect = id => {
    setSelectedCity(id);
    setOpen(false);
  };

  return (
    <AuthLayout showLogo={false}>
      <View>
        <OnboardingHeader currentStep={3} totalSteps={5} onBack={() => navigation.goBack()} />
        <Text style={styles.title}>{t('Ընտրիր քաղաքը')}</Text>

        <TouchableOpacity
          style={styles.field}
          onPress={() => setOpen(value => !value)}
          activeOpacity={0.8}
        >
          <Text style={selected ? styles.fieldValue : styles.fieldPlaceholder}>
            {selected ? t(selected.name) : t('Ընտրել')}
          </Text>
          <View style={open ? styles.chevronOpen : null}>
            <MIcon
              name={ICON_NAMES.ARROWS.DOWN}
              width={normalize(16)}
              height={normalize(16)}
            />
          </View>
        </TouchableOpacity>

        {open ? (
          <View style={styles.menu}>
            {cities.map((city, index) => {
              const isSelected = selectedCity === city.id;
              const isLast = index === cities.length - 1;
              return (
                <TouchableOpacity
                  key={city.id}
                  style={[
                    styles.option,
                    isSelected && styles.optionSelected,
                    !isLast && styles.optionDivider,
                  ]}
                  onPress={() => handleSelect(city.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                    {t(city.name)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}

        <Button
          label="Շարունակել"
          onPress={handleContinue}
          disabled={!selectedCity}
          style={styles.button}
        />
      </View>
    </AuthLayout>
  );
};

export default ChooseCity;
