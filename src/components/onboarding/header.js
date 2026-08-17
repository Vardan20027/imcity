import React from 'react';
import { View, Text} from 'react-native';
import { Styles } from './styles';
import MIcon from '../svgs';
import { ICON_NAMES } from '../svgs/icon_names';

const OnboardingHeader = ({ currentStep, totalSteps = 5, onBack }) => {
  const styles = Styles();

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>

        <MIcon name={ICON_NAMES.ARROWS.BACK} onPress={onBack} style={styles.back} />
        <Text style={styles.stepText}>{`${currentStep}/${totalSteps}`}</Text>
      </View>

      <View style={styles.progressRow}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              index < currentStep
                ? styles.segmentActive
                : styles.segmentInactive,
              index !== totalSteps - 1 && styles.segmentSpacing,
            ]}
          />
        ))}
      </View>
    </View>
  );
};



export default OnboardingHeader;
