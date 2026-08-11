 import React, { useState } from 'react';
import { View, Text } from 'react-native';
import LANGUAGES from '../../../constants/languages';
import Button from '../../../components/button';
import LanguageOption from '../../../components/languageOption';
import AuthLayout from '../../../components/layout/AuthLayout';
import { Styles } from './styles';

const LanguageSelectScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const styles = Styles();
  const handleContinue = () => {
    navigation.navigate('Login');
  };

  return (
    <AuthLayout>
      <View>
        <Text style={styles.title}>
          Բարի գալուստ <Text style={styles.titleBrand}>IMCITY</Text>
        </Text>
        <Text style={styles.subtitle}>
          Բացահայտիր քաղաքը քո{'\n'} զգացողություններով
        </Text>
      </View>

      <View style={styles.languageList}>
        {LANGUAGES.map((lang, index) => (
          <LanguageOption
            key={lang.id}
            label={lang.label}
            selected={selectedLanguage === lang.id}
            onPress={() => setSelectedLanguage(lang.id)}
            isLast={index === LANGUAGES.length - 1}
          />
        ))}
      </View>

      <Button
        label="Շարունակել"
        onPress={handleContinue}
        disabled={!selectedLanguage}
      />
    </AuthLayout>
  );
};

export default LanguageSelectScreen;
