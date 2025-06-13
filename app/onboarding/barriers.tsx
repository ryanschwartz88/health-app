import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useOnboarding } from './_layout';

interface BarrierOption {
  id: string;
  label: string;
  icon: string;
}

export default function BarriersScreen() {
  const { data, updateData } = useOnboarding();
  const [selectedBarriers, setSelectedBarriers] = useState<string[]>(data.barriers || []);
  
  const barrierOptions: BarrierOption[] = [
    { id: 'time', label: 'Lack of time', icon: 'time' },
    { id: 'knowledge', label: 'Not enough nutrition knowledge', icon: 'book' },
    { id: 'cost', label: 'Cost of healthy food', icon: 'cash' },
    { id: 'cravings', label: 'Food cravings & emotional eating', icon: 'fast-food' },
    { id: 'motivation', label: 'Maintaining motivation', icon: 'trending-up' },
    { id: 'social', label: 'Social pressure & events', icon: 'people' },
    { id: 'planning', label: 'Meal planning struggles', icon: 'calendar' },
    { id: 'tracking', label: 'Tracking consistency', icon: 'clipboard' },
    { id: 'travel', label: 'Travel & eating out', icon: 'airplane' },
    { id: 'stress', label: 'Stress & busy lifestyle', icon: 'alert-circle' },
    { id: 'none', label: 'No obstacles, I\'m ready!', icon: 'checkmark-circle' },
  ];

  const handleSelectBarrier = (barrierId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    setSelectedBarriers(prev => {
      // If "none" is selected, clear other selections
      if (barrierId === 'none') {
        return ['none'];
      }
      
      // If selecting another option while "none" is selected, remove "none"
      if (prev.includes('none')) {
        return [barrierId];
      }
      
      // Toggle the selected barrier
      if (prev.includes(barrierId)) {
        return prev.filter(id => id !== barrierId);
      } else {
        return [...prev, barrierId];
      }
    });
  };

  const handleNext = () => {
    if (selectedBarriers.length > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      updateData({ barriers: selectedBarriers });
      router.push('/onboarding/personalization');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What obstacles might you face in achieving your goals?</Text>
        <Text style={styles.hint}>Select all that apply.</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.optionsContainer}>
            {barrierOptions.map((option) => (
              <Pressable
                key={option.id}
                style={[
                  styles.optionCard,
                  selectedBarriers.includes(option.id) ? styles.selectedCard : null
                ]}
                onPress={() => handleSelectBarrier(option.id)}
              >
                <View style={[
                  styles.iconContainer,
                  selectedBarriers.includes(option.id) ? styles.selectedIcon : null
                ]}>
                  <Ionicons 
                    name={option.icon as any} 
                    size={24} 
                    color={selectedBarriers.includes(option.id) ? 'white' : '#666'} 
                  />
                </View>
                <Text style={[
                  styles.optionText,
                  selectedBarriers.includes(option.id) ? styles.selectedText : null
                ]}>
                  {option.label}
                </Text>
                {selectedBarriers.includes(option.id) && (
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
          style={[styles.button, selectedBarriers.length === 0 ? styles.buttonDisabled : null]}
          onPress={handleNext}
          disabled={selectedBarriers.length === 0}
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
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  hint: {
    fontSize: 16,
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
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedText: {
    fontWeight: 'bold',
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
    fontSize: 16,
    fontWeight: '600',
  },
});
