import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOnboarding } from './_layout';

interface SexOption {
  id: string;
  label: string;
  icon: string;
}

export default function SexScreen() {
  const { data, updateData } = useOnboarding();
  const [selectedSex, setSelectedSex] = useState<string | null>(data.sex || null);
  
  const sexOptions: SexOption[] = [
    { id: 'male', label: 'Male', icon: 'male' },
    { id: 'female', label: 'Female', icon: 'female' },
  ];

  const handleSelectSex = (sexId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedSex(sexId);
  };

  const handleNext = () => {
    if (selectedSex) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      updateData({ sex: selectedSex });
      router.push('/onboarding/date-of-birth');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What's your sex?</Text>
        <Text style={styles.subtitle}>Your sex is always kept confidential.</Text>
      </View>
      
      <View style={styles.contentContainer}>
        
        <View style={styles.optionsContainer}>
          {sexOptions.map((option) => (
            <Pressable
              key={option.id}
              style={[
                styles.optionCard,
                selectedSex === option.id ? styles.selectedCard : null
              ]}
              onPress={() => handleSelectSex(option.id)}
            >
              <View style={[
                styles.iconContainer,
                selectedSex === option.id ? styles.selectedIcon : null
              ]}>
                <Ionicons 
                  name={option.icon as any} 
                  size={26} 
                  color={selectedSex === option.id ? 'white' : '#666'} 
                />
              </View>
              <Text style={[
                styles.optionText,
                selectedSex === option.id ? styles.selectedText : null
              ]}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.button, !selectedSex ? styles.buttonDisabled : null]}
          onPress={handleNext}
          disabled={!selectedSex}
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
    fontFamily: 'outfit-bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  questionText: {
    fontSize: 18,
    fontFamily: 'outfit-semibold',
    color: '#333',
    marginBottom: 16,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  optionsContainer: {
    width: '100%',
    marginTop: 10,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  selectedIcon: {
    backgroundColor: '#000',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  selectedText: {
    fontFamily: 'outfit-bold',
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
    fontFamily: 'outfit-semibold',
  },
});
