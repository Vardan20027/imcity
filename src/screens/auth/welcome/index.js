import React, { useState } from 'react';
import { View, Text } from 'react-native';
import LANGUAGES from '../../../constants/languages';
import Button from '../../../components/button';
import LanguageOption from '../../../components/languageOption';
import AuthLayout from '../../../components/layout/AuthLayout';
import { Styles } from './styles';

const LanguageSelectScreen = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(LANGUAGES[0]?.id ?? null);
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
        {LANGUAGES.map(lang => (
          <LanguageOption
            key={lang.id}
            label={lang.label}
            selected={lang.id === selectedId}
            onPress={() => setSelectedId(lang.id)}
          />
        ))}
      </View>

      <Button
        label="Շարունակել"
        onPress={handleContinue}
        disabled={!selectedId}
      />
    </AuthLayout>
  );
};

export default LanguageSelectScreen;
