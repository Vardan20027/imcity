import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AuthLayout from '../../../components/layout/AuthLayout';
import Button from '../../../components/button';
import { Styles } from './styles';
import { ICON_NAMES } from '../../../components/svgs/icon_names';
import MIcon from '../../../components/svgs';
import OnboardingHeader from '../../../components/onboarding/header';

const styles = Styles();

const EmotionsScreen = ({ navigation }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const data = [
    {
      id: 1,
      icon: ICON_NAMES.EMOTIONS.CALM,
      color: '#6EAA4E',
      backgroundColor: '#E2F1DA',
      title: 'Հանգստություն',
    },
    {
      id: 2,
      icon: ICON_NAMES.EMOTIONS.DRIVE,
      color: '#FF8700',
      backgroundColor: '#FFE9E5',
      title: 'Էներգիա',
    },
    {
      id: 3,
      icon: ICON_NAMES.EMOTIONS.ROMANCE,
      color: '#F4466E',
      backgroundColor: '#F7EEEE',
      title: 'Ռոմանտիկա',
    },
    {
      id: 4,
      icon: ICON_NAMES.EMOTIONS.FUN,
      color: '#FFCC00',
      backgroundColor: '#F9F5E4',
      title: 'Զվարճանք',
    },
    {
      id: 5,
      icon: ICON_NAMES.EMOTIONS.DISCOVERY,
      color: '#DA61FF',
      backgroundColor: '#F3E8FF',
      title: 'Բացահայտում',
    },
    {
      id: 6,
      icon: ICON_NAMES.EMOTIONS.WORKING,
      color: '#46A3F4',
      backgroundColor: '#E2F2FF',
      title: 'Արդյունավե-\nտություն',
    },
    {
      id: 7,
      icon: ICON_NAMES.EMOTIONS.INSPIRATION,
      color: '#46A3F4',
      backgroundColor: '#E2F2FF',
      title: 'Ոգեշնչում',
    },
  ];
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
        {data.map((item, index) => {
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
