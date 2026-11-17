import React, { useState } from 'react';
import { View, Text } from 'react-native';
import LANGUAGES from '../../../constants/languages';
import Button from '../../../components/button';
import LanguageOption from '../../../components/languageOption';
import AuthLayout from '../../../components/layout/AuthLayout';
import styles from './styles';
import { currentLanguage, setLanguage } from '../../../services/language';
import { useT } from '../../../locales/useT';

const LanguageSelectScreen = ({ navigation }) => {
  const t = useT();
  const [selectedId, setSelectedId] = useState(currentLanguage());

  const handleContinue = () => {
    navigation.navigate('Login');
  };

  return (
    <AuthLayout>
      <View>
        <Text style={styles.title}>
          {t('Բարի գալուստ')} <Text style={styles.titleBrand}>IMCITY</Text>
        </Text>
        <Text style={styles.subtitle}>
          {t('Բացահայտիր քաղաքը քո զգացողություններով')}
        </Text>
      </View>

      <View style={styles.languageList}>
        {LANGUAGES.map(lang => (
          <LanguageOption
            key={lang.id}
            label={lang.label}
            selected={lang.id === selectedId}
            onPress={() => {
              setSelectedId(lang.id);
              setLanguage(lang.id);
            }}
          />
        ))}
      </View>

      <Button
        label={t('Շարունակել')}
        onPress={handleContinue}
        disabled={!selectedId}
      />
    </AuthLayout>
  );
};

export default LanguageSelectScreen;
