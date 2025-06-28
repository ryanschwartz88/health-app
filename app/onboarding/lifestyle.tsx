import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOnboarding } from './_layout';

interface ActivityOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export default function LifestyleScreen() {
  const { data, updateData } = useOnboarding();
  const [selectedActivity, setSelectedActivity] = useState<string | null>(data.activityLevel || null);
  
  const activityOptions: ActivityOption[] = [
    { 
      id: 'sedentary', 
      label: 'Mostly Sedentary', 
      description: 'under 5,000 steps/day',
      icon: 'body' 
    },
    { 
      id: 'moderate', 
      label: 'Moderately Active', 
      description: '5,000 to 15,000 steps/day',
      icon: 'walk' 
    },
    { 
      id: 'active', 
      label: 'Highly Active', 
      description: '15,000+ steps/day',
      icon: 'bicycle' 
    },
  ];

  const handleSelectActivity = (activityId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedActivity(activityId);
  };

  const handleNext = () => {
    if (selectedActivity) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      updateData({ activityLevel: selectedActivity });
      router.push('/onboarding/exercise');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>How active are you on a daily basis?</Text>
        <Text style={styles.subtitle}>Select the option that best describes your activity level.</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.contentWrapper}>
          <View style={styles.optionsContainer}>
            {activityOptions.map((option) => (
              <Pressable
                key={option.id}
                style={[
                  styles.optionCard,
                  selectedActivity === option.id ? styles.selectedCard : null
                ]}
                onPress={() => handleSelectActivity(option.id)}
              >
                <View style={[
                  styles.iconContainer,
                  selectedActivity === option.id ? styles.selectedIcon : null
                ]}>
                  <Ionicons 
                    name={option.icon as any} 
                    size={24} 
                    color={selectedActivity === option.id ? 'white' : '#666'} 
                  />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={[
                    styles.optionText,
                    selectedActivity === option.id ? styles.selectedText : null
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
          style={[styles.button, !selectedActivity ? styles.buttonDisabled : null]}
          onPress={handleNext}
          disabled={!selectedActivity}
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
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
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
  contentWrapper: {
    width: '100%',
    justifyContent: 'center',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'stretch',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    maxWidth: 500,
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
    fontFamily: 'outfit-medium',
    color: '#333',
  },
  selectedText: {
    fontFamily: 'outfit-bold',
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
    fontFamily: 'outfit-semibold',
  },
});
