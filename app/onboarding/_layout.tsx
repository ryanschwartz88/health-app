import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Slot, router, usePathname } from 'expo-router';
import React, { createContext, useContext, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define onboarding data types
interface OnboardingData {
  name: string;
  // Date of birth fields
  dateOfBirth?: string;
  // Body measurements
  heightFeet: number;
  heightInches: number;
  currentWeight: number;
  // Personal information
  sex: string;
  // Goals section
  goals: string[];
  overallGoal: string;
  // Lifestyle section
  activityLevel: string;
  exerciseFrequency: string;
  dietPreference: string;
  // Fitness & Weight Goals
  fitnessGoal: string;
  weightGoal: 'increase' | 'loss' | 'maintain' | null;
  targetWeight: string;
  goalSpeed: string | null; // Changed to string to store numeric speed value
  // Barriers & completion
  barriers: string[];
  onboardingComplete: boolean;
}

// Define the context type
interface OnboardingContextType {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  resetData: () => void;
  currentStep: number;
  totalSteps: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Create the context
const OnboardingContext = createContext<OnboardingContextType | null>(null);

// Define the initial data state
const initialData: OnboardingData = {
  name: '',
  dateOfBirth: new Date(2000, 0, 1).toISOString(),
  heightFeet: 5,
  heightInches: 8,
  currentWeight: 150,
  sex: '',
  goals: [],
  overallGoal: '',
  activityLevel: '',
  exerciseFrequency: '',
  dietPreference: '',
  fitnessGoal: '',
  weightGoal: null,
  targetWeight: '',
  goalSpeed: null,
  barriers: [],
  onboardingComplete: false,
};

// Routes in order
const ROUTES = [
  // Section 1: Goals
  'your-goals',
  'overall-goal',
  
  // Section 2: Lifestyle
  'your-lifestyle', // Section header
  'lifestyle',
  'exercise',
  'diet',
  
  // Section 3: About You
  'about-you', // Section header
  'sex',
  'date-of-birth',
  'body-measurements',
  
  // Section 4: Fitness & Weight Goals
  'your-fitness-goals', // Section header
  'fitness-goals',
  'goal-weight',  // Only shown if fitness goal is weight-related
  'goal-speed',   // Only shown if weight-goal is set
  
  // Section 5: Barriers
  'whats-holding-you-back', // Section header
  'barriers',
  
  // Final personalization
  'personalization',
];

// Custom hook to use the onboarding context
export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}

export default function OnboardingLayout() {
  const [data, setData] = useState<OnboardingData>(initialData);
  const pathname = usePathname();
  
  // Extract the current screen name from the path
  const currentScreen = pathname.split('/').pop() || '';
  
  // Calculate current step (1-indexed for display purposes)
  const currentStep = ROUTES.findIndex(route => route === currentScreen) + 1;
  const totalSteps = ROUTES.length;
  
  // Calculate progress percentage
  const progressPercentage = Math.min((currentStep / totalSteps) * 100, 100);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(initialData);
  };

  const goToNextStep = () => {
    const currentIndex = ROUTES.findIndex(route => route === currentScreen);
    if (currentIndex < ROUTES.length - 1) {
      const nextRoute = ROUTES[currentIndex + 1];
      // Use type assertion to handle the router path type
      const nextRoutePath = `/onboarding/${nextRoute}`;
      router.push(nextRoutePath as any);
    } else {
      // Complete onboarding
      // Store data or submit it to your backend here
      router.replace('/');
    }
  };

  const goToPreviousStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const currentIndex = ROUTES.findIndex(route => route === currentScreen);
    if (currentIndex > 0) {
      router.back();
    } else {
      router.replace('/welcome');
    }
  };

  // Create context value
  const contextValue = {
    data,
    updateData,
    resetData,
    currentStep,
    totalSteps,
    goToNextStep,
    goToPreviousStep,
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      <LinearGradient
        colors={['#E7E3E2', '#DDDBE9']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: .75, y: .5 }}
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          {/* Header with back button and progress bar */}
          <View style={styles.header}>
            <Pressable 
              style={styles.backButton} 
              onPress={goToPreviousStep}
            >
              <Ionicons name="chevron-back" size={24} color="#333" />
            </Pressable>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${progressPercentage}%` }]} />
              </View>
            </View>
          </View>

          {/* Content */}
          <View style={styles.contentWrapper}>
            <Slot />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </OnboardingContext.Provider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#000', // Black color
    borderRadius: 3,
  },
  content: {
    flex: 1,
  },
});
