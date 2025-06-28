import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '../../components/ui/AppText';
import { useOnboarding } from './_layout';

interface ExerciseOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export default function ExerciseScreen() {
  const { data, updateData } = useOnboarding();
  const [selectedExercise, setSelectedExercise] = useState<string | null>(data.exerciseFrequency || null);
  
  const exerciseOptions: ExerciseOption[] = [
    { 
      id: 'rarely', 
      label: 'Rarely', 
      description: '0 sessions/week',
      icon: 'bed' 
    },
    { 
      id: 'sometimes', 
      label: 'Sometimes', 
      description: '1–3 sessions/week',
      icon: 'walk' 
    },
    { 
      id: 'often', 
      label: 'Often', 
      description: '4–6 sessions/week',
      icon: 'barbell' 
    },
    { 
      id: 'daily', 
      label: 'Daily', 
      description: '7+ sessions/week',
      icon: 'fitness' 
    },
  ];

  const handleSelectExercise = (exerciseId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedExercise(exerciseId);
  };

  const handleNext = () => {
    if (selectedExercise) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      updateData({ exerciseFrequency: selectedExercise });
      router.push('/onboarding/diet');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="h2" weight="bold" style={styles.title}>How often do you exercise?</AppText>
        <AppText variant="body1" style={styles.subtitle}>Select the option that best describes your exercise frequency.</AppText>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.contentWrapper}>
          <View style={styles.optionsContainer}>
            {exerciseOptions.map((option) => (
              <Pressable
                key={option.id}
                style={[
                  styles.optionCard,
                  selectedExercise === option.id ? styles.selectedCard : null
                ]}
                onPress={() => handleSelectExercise(option.id)}
              >
                <View style={[
                  styles.iconContainer,
                  selectedExercise === option.id ? styles.selectedIcon : null
                ]}>
                  <Ionicons 
                    name={option.icon as any} 
                    size={24} 
                    color={selectedExercise === option.id ? 'white' : '#666'} 
                  />
                </View>
                <View style={styles.optionTextContainer}>
                  <AppText 
                    variant="body1" 
                    weight={selectedExercise === option.id ? 'bold' : 'medium'}
                    style={[
                      styles.optionText,
                      selectedExercise === option.id ? styles.selectedText : null
                    ]}>
                    {option.label}
                  </AppText>
                  <AppText variant="body2" style={styles.optionDescription}>
                    {option.description}
                  </AppText>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.button, !selectedExercise ? styles.buttonDisabled : null]}
          onPress={handleNext}
          disabled={!selectedExercise}
        >
          <AppText variant="body1" weight="semibold" style={styles.buttonText}>Continue</AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  contentWrapper: {
    width: '100%',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    color: '#666',
    marginBottom: 30,
  },

  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'stretch',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  selectedCard: {
    borderColor: '#000',
    backgroundColor: '#f5f5f5',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  selectedIcon: {
    backgroundColor: '#000',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    color: '#333',
  },
  selectedText: {
    color: '#000',
  },
  optionDescription: {
    color: '#666',
    marginTop: 4,
  },
  footer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db',
  },
  buttonText: {
    color: 'white',
  },
});
