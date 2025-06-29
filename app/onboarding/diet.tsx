import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { AppText } from '../../components/ui/AppText';
import { useOnboarding } from './_layout';

interface DietOption {
  id: string;
  label: string;
  icon: string;
}

export default function DietScreen() {
  const { data, updateData } = useOnboarding();
  const [selectedDiet, setSelectedDiet] = useState<string | null>(data.dietPreference || null);
  
  const dietOptions: DietOption[] = [
    { id: 'classic', label: 'Classic', icon: 'restaurant' },
    { id: 'pescatarian', label: 'Pescatarian', icon: 'fish' },
    { id: 'vegetarian', label: 'Vegetarian', icon: 'leaf' },
    { id: 'vegan', label: 'Vegan', icon: 'nutrition' },
    { id: 'low-carb', label: 'Low Carb', icon: 'fast-food' },
    { id: 'keto', label: 'Keto', icon: 'flame' },
    { id: 'no-preference', label: 'No preference', icon: 'help-circle' },
  ];

  const handleSelectDiet = (dietId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedDiet(dietId);
  };

  const handleNext = () => {
    if (selectedDiet) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      updateData({ dietPreference: selectedDiet });
      router.push('/onboarding/about-you');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="h2" weight="bold" style={styles.title}>Do you follow a specific diet?</AppText>
        <AppText variant="body1" style={styles.subtitle}>Select the option that best describes your diet preference.</AppText>
      </View>
      
      <View style={styles.contentContainer}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.optionsContainer}>
            {dietOptions.map((option) => (
            <Pressable
              key={option.id}
              style={[
                styles.optionCard,
                selectedDiet === option.id ? styles.selectedCard : null
              ]}
              onPress={() => handleSelectDiet(option.id)}
            >
              <View style={[
                styles.iconContainer,
                selectedDiet === option.id ? styles.selectedIcon : null
              ]}>
                <Ionicons 
                  name={option.icon as any} 
                  size={24} 
                  color={selectedDiet === option.id ? 'white' : '#666'} 
                />
              </View>
              <AppText 
                variant="body1" 
                weight={selectedDiet === option.id ? 'bold' : 'regular'}
                style={[
                  styles.optionText,
                  selectedDiet === option.id ? styles.selectedText : null
                ]}>
                {option.label}
              </AppText>
            </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.button, !selectedDiet ? styles.buttonDisabled : null]}
          onPress={handleNext}
          disabled={!selectedDiet}
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
    color: '#666',
  },
  questionText: {
    color: '#333',
    marginBottom: 16,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  optionsContainer: {
    width: '100%',
    marginTop: 10,
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
  },
  selectedText: {
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
  },
});
