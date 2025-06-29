import { initializeUser } from '@/utils/userManager';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { AppText } from '../../components/ui/AppText';
import { useOnboarding } from './_layout';

export default function PersonalizationScreen() {
  const { data, updateData } = useOnboarding();
  const [isLoading, setIsLoading] = useState(true);
  const [insightItems, setInsightItems] = useState<string[]>([]);

  useEffect(() => {
    // Simulate generating personalization insights
    const timer = setTimeout(() => {
      generateInsights();
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const generateInsights = () => {
    const insights: string[] = [];
    
    // Generate insights based on user data
    if (data.goals && data.goals.length > 0) {
      if (data.goals.includes('cognitive')) {
        insights.push('Omega-3s and B vitamins to support brain health');
      }
      if (data.goals.includes('muscle')) {
        insights.push('Protein balance optimization across meals');
      }
      if (data.goals.includes('heart')) {
        insights.push('Heart-healthy fats and antioxidant tracking');
      }
      if (data.goals.includes('energy')) {
        insights.push('B vitamin and iron status monitoring');
      }
    }
    
    // Add insights based on activity level
    if (data.activityLevel === 'active') {
      insights.push('Electrolyte and hydration tracking');
    }
    
    // Add insights based on diet preference
    if (data.dietPreference === 'vegetarian' || data.dietPreference === 'vegan') {
      insights.push('Plant protein completeness analysis');
      insights.push('B12, iron, and zinc monitoring');
    }
    
    // Add insights based on fitness goals
    if (data.fitnessGoal === 'lose-weight') {
      insights.push('Customized calorie and macro targets');
    } else if (data.fitnessGoal === 'build-muscle') {
      insights.push('Protein timing and leucine threshold tracking');
    }
    
    // Add barriers-specific insights
    if (data.barriers && data.barriers.includes('time')) {
      insights.push('Quick meal recommendations and time-saving suggestions');
    }
    if (data.barriers && data.barriers.includes('cravings')) {
      insights.push('Satiety analysis and craving pattern identification');
    }
    
    // If we don't have enough insights, add some generic ones
    if (insights.length < 3) {
      insights.push('Personalized nutrient target tracking');
      insights.push('Daily nutrition quality score');
      insights.push('Weekly nutrient balance analysis');
    }
    
    // Limit to 5 insights maximum
    setInsightItems(insights.slice(0, 5));
  };

  const handleComplete = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Mark onboarding as complete and redirect to main app
    updateData({ onboardingComplete: true });
    await initializeUser();
    router.replace('/');
  };

  return (
    <LinearGradient
      colors={['#F0F0F0', '#E7E3E2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <AppText variant="h2" weight="bold" style={styles.title}>Your Personalized Plan</AppText>
          <AppText variant="body1" style={styles.subtitle}>
            Based on your profile, here's how we'll help you achieve your goals.
          </AppText>
        </View>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
            <AppText variant="body1" style={styles.loadingText}>Personalizing your experience...</AppText>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            {/* Summary Section */}
            <View style={styles.summaryContainer}>
              <AppText variant="h4" weight="semibold" style={styles.sectionTitle}>Your Profile</AppText>
              
              <View style={styles.summaryItem}>
                <Ionicons name="person" size={22} color="#333" />
                <AppText variant="body1" style={styles.summaryText}>
                  {data.name || 'User'}, {data.sex === 'male' ? 'Male' : data.sex === 'female' ? 'Female' : 'Not specified'}
                </AppText>
              </View>
              
              {data.fitnessGoal && (
                <View style={styles.summaryItem}>
                  <Ionicons name="barbell" size={22} color="#333" />
                  <AppText variant="body1" style={styles.summaryText}>
                    Goal: {data.fitnessGoal === 'lose-weight' 
                      ? 'Lose weight' 
                      : data.fitnessGoal === 'gain-weight' 
                        ? 'Gain weight' 
                        : data.fitnessGoal === 'build-muscle' 
                          ? 'Build muscle' 
                          : 'Maintain/Improve health'}
                  </AppText>
                </View>
              )}
              
              {data.dietPreference && (
                <View style={styles.summaryItem}>
                  <Ionicons name="nutrition" size={22} color="#333" />
                  <AppText variant="body1" style={styles.summaryText}>
                    {data.dietPreference.charAt(0).toUpperCase() + data.dietPreference.slice(1)} diet
                  </AppText>
                </View>
              )}

              {data.activityLevel && (
                <View style={styles.summaryItem}>
                  <Ionicons name="walk" size={22} color="#333" />
                  <AppText variant="body1" style={styles.summaryText}>
                    Activity: {data.activityLevel.charAt(0).toUpperCase() + data.activityLevel.slice(1).replace('-', ' ')}
                  </AppText>
                </View>
              )}

              {data.goals && data.goals.length > 0 && (
                <View style={styles.summaryItem}>
                  <Ionicons name="trophy" size={22} color="#333" />
                  <AppText variant="body1" style={[styles.summaryText, { flex: 1 }]}>
                    Priorities: <AppText weight="semibold">{data.goals.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(', ')}</AppText>
                  </AppText>
                </View>
              )}
              
              {data.exerciseFrequency && (
                <View style={styles.summaryItem}>
                  <Ionicons name="fitness" size={22} color="#333" />
                  <AppText variant="body1" style={styles.summaryText}>
                    Exercise: {data.exerciseFrequency === 'rarely' 
                      ? 'Rarely' 
                      : data.exerciseFrequency === 'sometimes' 
                        ? 'Sometimes' 
                        : data.exerciseFrequency === 'often' 
                          ? 'Often' 
                          : 'Daily'}
                  </AppText>
                </View>
              )}
            </View>
            
            {/* Insights Section */}
            <View style={styles.insightsContainer}>
              <AppText variant="h4" weight="semibold" style={styles.sectionTitle}>Your Nutrition Insights</AppText>
              
              {insightItems.map((insight, index) => (
                <View key={index} style={styles.insightItem}>
                  <Ionicons name="checkmark-circle" size={22} color="#000" />
                  <AppText variant="body1" style={styles.insightText}>{insight}</AppText>
                </View>
              ))}
            </View>
            
            {/* Next Steps */}
            <View style={styles.nextStepsContainer}>
              <AppText variant="h4" weight="semibold" style={styles.sectionTitle}>Ready to begin?</AppText>
              <AppText variant="body1" style={styles.nextStepsText}>
                Your personalized nutrition dashboard is ready. Start tracking your foods to get insights tailored to your goals.
              </AppText>
            </View>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        <Pressable
          style={styles.button}
          onPress={handleComplete}
          disabled={isLoading}
        >
          <AppText variant="body1" weight="semibold" style={styles.buttonText}>Start Tracking</AppText>
          <Ionicons name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 30,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    marginBottom: 12,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    color: '#555',
    textAlign: 'center',
    maxWidth: '80%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    color: '#555',
  },
  contentContainer: {
    width: '100%',
  },
  sectionTitle: {
    color: '#333',
    marginBottom: 16,
  },
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryText: {
    color: '#333',
    marginLeft: 12,
  },
  insightsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  insightText: {
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  nextStepsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  nextStepsText: {
    color: '#333',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});
