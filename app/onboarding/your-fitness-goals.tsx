import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '../../components/ui/AppText';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function YourFitnessGoalsScreen() {
  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/onboarding/fitness-goals');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <AppText variant="h1" weight="bold" style={styles.headline}>Your Fitness & Weight Goals</AppText>
          <AppText variant="body1" style={styles.description}>
            Let's understand what you're working toward so we can build a nutrition plan aligned with your goals.
          </AppText>
        </View>
        
        <Pressable
          style={styles.button}
          onPress={handleContinue}
        >
          <AppText variant="body1" weight="semibold" style={styles.buttonText}>Continue</AppText>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: '90%',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
  },
});
