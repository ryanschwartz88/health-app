import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

interface GenderOption {
  id: string;
  label: string;
  icon: string;
}

export default function GenderScreen() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  
  const genderOptions: GenderOption[] = [
    { id: 'female', label: 'Female', icon: 'female' },
    { id: 'male', label: 'Male', icon: 'male' },
    { id: 'non-binary', label: 'Non-binary', icon: 'person' },
    { id: 'other', label: 'Other', icon: 'ellipsis-horizontal' },
    { id: 'prefer-not-to-say', label: 'Prefer not to say', icon: 'shield' },
  ];

  const handleSelectGender = (genderId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedGender(genderId);
  };

  const handleNext = () => {
    if (selectedGender) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      // Save gender to your user state/profile here
      // Example: saveUserData({ gender: selectedGender });
      
      // Navigate to the next onboarding screen
      router.push('age' as any); // Using relative path within same directory
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 p-6 pt-12">
        {/* Header */}
        <View className="mb-10">
          <Text className="text-3xl font-bold text-gray-900 mb-2">What's your gender?</Text>
          <Text className="text-base text-gray-500">
            This helps us personalize your health recommendations.
          </Text>
        </View>

        {/* Gender Options */}
        <View className="mb-10">
          {genderOptions.map((option) => (
            <Pressable
              key={option.id}
              className={`flex-row items-center p-4 mb-3 rounded-xl border ${
                selectedGender === option.id
                  ? 'bg-blue-50 border-blue-500'
                  : 'bg-gray-50 border-gray-200'
              }`}
              onPress={() => handleSelectGender(option.id)}
            >
              <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
                selectedGender === option.id ? 'bg-blue-500' : 'bg-gray-200'
              }`}>
                <Ionicons 
                  name={option.icon as any} 
                  size={22} 
                  color={selectedGender === option.id ? 'white' : '#666'} 
                />
              </View>
              <Text className={`text-lg ${
                selectedGender === option.id ? 'font-semibold text-blue-700' : 'text-gray-700'
              }`}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Next Button */}
        <Pressable
          className={`py-4 rounded-xl items-center ${
            selectedGender ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          onPress={handleNext}
          disabled={!selectedGender}
        >
          <Text className="text-white text-lg font-semibold">Next</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}