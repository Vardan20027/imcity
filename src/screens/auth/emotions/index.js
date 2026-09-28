import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AuthLayout from '../../../components/layout/AuthLayout';
import Button from '../../../components/button';
import styles from './styles';
import MIcon from '../../../components/svgs';
import OnboardingHeader from '../../../components/onboarding/header';
import { EMOTIONS } from '../../../constants/emotions/data';


const EmotionsScreen = ({ navigation }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const MAX = 3;

  const handleContinue = () => {
    navigation.navigate('Information');
  };
  const toggleSelect = id => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }

      if (prev.length >= MAX) {
        return prev;
      }

      return [...prev, id];
    });
  };

  return (
    <AuthLayout showLogo={false}>
      <OnboardingHeader
        currentStep={4}
        totalSteps={5}
        onBack={() => navigation.goBack()}
      />
      <Text style={styles.title}>Ինչ ես ուզում զգալ</Text>
      <Text style={styles.subtitle}>Մինչև 3 տարբերակ</Text>

      <View style={styles.container}>
        {EMOTIONS.map((item, index) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.item,
                isSelected && {
                  backgroundColor: item.backgroundColor,
                  borderColor: item.backgroundColor,
                },
              ]}
              onPress={() => toggleSelect(item.id)}
            >
              <MIcon name={item.icon} color={isSelected && item.color} />
              <Text style={[styles.text, isSelected && { color: item.color }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.subtitle}>Կարող եք փոխել ցանկացած ժամանակ!</Text>
      <Button
        label="Շարունակել"
        onPress={handleContinue}
        disabled={selectedIds.length === 0}
        style={styles.button}
      />

      <TouchableOpacity style={{ alignSelf: 'center' }}>
        <Text>Բաց թողնել</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
};

export default EmotionsScreen;
