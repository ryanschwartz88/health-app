import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOnboarding } from './_layout';

interface FitnessGoalOption {
  id: string;
  label: string;
  icon: string;
  iconPack: 'Ionicons' | 'MaterialCommunityIcons';
}

export default function FitnessGoalsScreen() {
  const { data, updateData } = useOnboarding();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(data.fitnessGoal || null);
  
  const goalOptions: FitnessGoalOption[] = [
    { id: 'lose-weight', label: 'Lose weight', icon: 'trending-down', iconPack: 'Ionicons' },
    { id: 'maintain-weight', label: 'Maintain weight', icon: 'remove', iconPack: 'Ionicons' },
    { id: 'gain-weight', label: 'Gain weight', icon: 'trending-up', iconPack: 'Ionicons' },
    { id: 'none', label: 'None', icon: 'close', iconPack: 'MaterialCommunityIcons' },
  ];

  const handleSelectGoal = (goalId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedGoal(goalId);
  };

  const handleNext = () => {
    if (selectedGoal) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      updateData({ fitnessGoal: selectedGoal });
      
      if (['lose-weight', 'gain-weight'].includes(selectedGoal)) {
        router.push('/onboarding/goal-weight');
      } else {
        router.push('/onboarding/whats-holding-you-back');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What is your fitness goal?</Text>
        <Text style={styles.subtitle}>Select your primary goal for using this app.</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.optionsContainer}>
          {goalOptions.map((option) => (
          <Pressable
            key={option.id}
            style={[
              styles.optionCard,
              selectedGoal === option.id ? styles.selectedCard : null
            ]}
            onPress={() => handleSelectGoal(option.id)}
          >
            <View style={[
              styles.iconContainer,
              selectedGoal === option.id ? styles.selectedIcon : null
            ]}>
              {option.iconPack === 'Ionicons' ? (
                <Ionicons 
                  name={option.icon as any} 
                  size={24} 
                  color={selectedGoal === option.id ? 'white' : '#666'} 
                />
              ) : (
                <MaterialCommunityIcons 
                  name={option.icon as any} 
                  size={24} 
                  color={selectedGoal === option.id ? 'white' : '#666'} 
                />
              )}
            </View>
            <Text style={[
              styles.optionText,
              selectedGoal === option.id ? styles.selectedText : null
            ]}>
              {option.label}
            </Text>
          </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.button, !selectedGoal ? styles.buttonDisabled : null]}
          onPress={handleNext}
          disabled={!selectedGoal}
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
    paddingBottom: 30,
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
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  optionsContainer: {
    width: '100%',
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
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#000',
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
