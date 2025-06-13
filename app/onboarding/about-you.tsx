import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutYouScreen() {
  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/onboarding/sex');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <Text style={styles.headline}>About You</Text>
          <Text style={styles.description}>
            Help us understand your unique profile so we can create personalized nutrition recommendations.
          </Text>
        </View>
        
        <Pressable
          style={styles.button}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
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
    fontSize: 36,
    fontWeight: '800',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    lineHeight: 26,
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
    fontSize: 16,
    fontWeight: '600',
  },
});
