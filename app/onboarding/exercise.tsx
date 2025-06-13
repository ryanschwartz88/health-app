import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
        <Text style={styles.title}>How often do you exercise?</Text>
        <Text style={styles.subtitle}>Select the option that best describes your exercise frequency.</Text>
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
                  <Text style={[
                    styles.optionText,
                    selectedExercise === option.id ? styles.selectedText : null
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={styles.optionDescription}>
                    {option.description}
                  </Text>
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
          <Text style={styles.buttonText}>Continue</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
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
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#000',
  },
  optionDescription: {
    fontSize: 14,
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
    fontSize: 16,
    fontWeight: '600',
  },
});
