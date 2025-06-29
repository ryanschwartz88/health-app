import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { AppText } from '../../components/ui/AppText';
import { useOnboarding } from './_layout';

interface GoalOption {
  id: string;
  label: string;
  icon: string;
}

export default function YourGoalsScreen() {
  const { data, updateData } = useOnboarding();
  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.goals || []);
  const MAX_SELECTIONS = 4;
  
  const goalOptions: GoalOption[] = [
    { id: 'cognitive', label: 'Cognitive & Mood', icon: 'brain' },
    { id: 'muscle', label: 'Muscle & Strength', icon: 'barbell' },
    { id: 'bone', label: 'Bone & Joint', icon: 'body' },
    { id: 'heart', label: 'Heart & Circulation', icon: 'heart' },
    { id: 'eye', label: 'Eye Health', icon: 'eye' },
    { id: 'immune', label: 'Immune System', icon: 'shield' },
    { id: 'energy', label: 'Energy & Metabolism', icon: 'flash' },
    { id: 'skin', label: 'Skin, Hair & Nails', icon: 'leaf' },
    { id: 'hormonal', label: 'Hormonal Balance', icon: 'woman' },
    { id: 'sleep', label: 'Sleep & Recovery', icon: 'moon' },
    { id: 'gut', label: 'Gut & Digestion', icon: 'nutrition' },
    { id: 'longevity', label: 'Longevity & Cellular Health', icon: 'infinite' },
    { id: 'eat-healthy', label: 'Eat Healthier', icon: 'restaurant' },
    { id: 'not-sure', label: 'I\'m Not Sure Yet', icon: 'help-circle' },
  ];

  const handleSelectGoal = (goalId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    setSelectedGoals(prev => {
      // If the goal is already selected, remove it
      if (prev.includes(goalId)) {
        return prev.filter(id => id !== goalId);
      }
      
      // If selecting "Not Sure", clear other selections
      if (goalId === 'not-sure') {
        return ['not-sure'];
      }
      
      // If already selected "Not Sure", clear it when selecting something else
      const newSelection = prev.includes('not-sure')
        ? [goalId]
        : [...prev, goalId];
      
      // Enforce max selections limit
      return newSelection.length > MAX_SELECTIONS
        ? newSelection.slice(-MAX_SELECTIONS)
        : newSelection;
    });
  };

  const handleNext = () => {
    if (selectedGoals.length > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      updateData({ goals: selectedGoals });
      router.push('/onboarding/overall-goal');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="h2" weight="bold" style={styles.title}>What do you want to focus on? (Choose up to {MAX_SELECTIONS})</AppText>
        <AppText variant="body1" style={styles.hint}>This helps us tailor your dashboard to what matters most.</AppText>
      </View>
      
      <View style={styles.contentContainer}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.optionsContainer}>
            {goalOptions.map((option) => (
              <Pressable
                key={option.id}
                style={[
                  styles.optionCard,
                  selectedGoals.includes(option.id) ? styles.selectedCard : null
                ]}
                onPress={() => handleSelectGoal(option.id)}
              >
                <View style={[
                  styles.iconContainer,
                  selectedGoals.includes(option.id) ? styles.selectedIcon : null
                ]}>
                  
                  {option.id === 'cognitive' ? (
                    <FontAwesome5 
                      name="brain" 
                      size={22} 
                      color={selectedGoals.includes(option.id) ? 'white' : '#666'} 
                    />
                  ) : (
                    <Ionicons 
                      name={option.icon as any} 
                      size={24} 
                      color={selectedGoals.includes(option.id) ? 'white' : '#666'} 
                    />
                  )}
                </View>
                <AppText 
                  variant="body1" 
                  weight={selectedGoals.includes(option.id) ? 'bold' : 'regular'}
                  style={[
                    styles.optionText,
                    selectedGoals.includes(option.id) ? styles.selectedText : null
                  ]}>
                  {option.label}
                </AppText>
                {selectedGoals.includes(option.id) && (
                  <View style={styles.checkmarkContainer}>
                    <Ionicons name="checkmark-circle" size={20} color="#000" />
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.button, selectedGoals.length === 0 ? styles.buttonDisabled : null]}
          onPress={handleNext}
          disabled={selectedGoals.length === 0}
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
    paddingBottom: 30,
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
    color: '#333',
    marginBottom: 8,
  },
  hint: {
    color: '#666',
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    paddingVertical: 10,
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
    color: '#333',
    flex: 1,
  },
  selectedText: {
    color: '#000',
  },
  checkmarkContainer: {
    marginLeft: 8,
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
