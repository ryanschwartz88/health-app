import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOnboarding } from './_layout';

interface GoalOption {
  id: string;
  label: string;
  icon: string;
}

export default function OverallGoalScreen() {
  const { data, updateData } = useOnboarding();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(data.overallGoal || null);
  
  const goalOptions: GoalOption[] = [
    { id: 'nutrient-balance', label: 'Improve nutrient balance', icon: 'nutrition' },
    { id: 'minimize-harmful', label: 'Minimize harmful ingredients', icon: 'shield' },
    { id: 'optimize-performance', label: 'Optimize performance', icon: 'pulse' },
    { id: 'boost-health', label: 'Boost overall health', icon: 'heart' },
    { id: 'understand-nutrition', label: 'Understand my nutrition better', icon: 'analytics' },
  ];

  const handleSelectGoal = (goalId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedGoal(goalId);
  };

  const handleNext = () => {
    if (selectedGoal) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      updateData({ overallGoal: selectedGoal });
      router.push('/onboarding/your-lifestyle');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What is your main objective?</Text>
        <Text style={styles.subtitle}>Select your primary goal for using this app.</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.contentWrapper}>
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
                <Ionicons 
                  name={option.icon as any} 
                  size={24} 
                  color={selectedGoal === option.id ? 'white' : '#666'} 
                />
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
    marginBottom: 16,
    width: '100%',
    maxWidth: 500,
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
