import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOnboarding } from './_layout';

interface SpeedCategory {
  label: 'Gradual' | 'Moderate' | 'Accelerated';
  icon: keyof typeof Ionicons.glyphMap;
}

const MIN_SPEED = 0.2; // lbs/week
const MAX_SPEED = 3.0; // lbs/week
const SPEED_STEP = 0.1;

export default function GoalSpeedScreen() {
  const { data, updateData, goToNextStep } = useOnboarding();
  // Initialize with a midpoint or previous data, ensuring it's a number
  const initialSpeed = data.goalSpeed ? parseFloat(data.goalSpeed) : 1.0;
  const [currentSpeed, setCurrentSpeed] = useState(initialSpeed);

  const isGaining = data.weightGoal === 'increase';

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    updateData({ goalSpeed: currentSpeed.toFixed(1) }); // Save as string with 1 decimal place
    goToNextStep(); // Assuming goToNextStep handles navigation correctly
  };

  const speedCategory = useMemo((): SpeedCategory => {
    if (currentSpeed < 1.0) {
      return { label: 'Gradual', icon: 'hourglass-outline'}
    }
    if (currentSpeed <= 2.0) {
      return { label: 'Moderate', icon: 'speedometer-outline'};
    }
    return { label: 'Accelerated', icon: 'flash-outline'};
  }, [currentSpeed]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>How quickly do you want to {isGaining ? 'gain' : 'lose'} weight?</Text>
        <Text style={styles.subtitle}>
        We recommend aiming for 0.5-2.0 lbs/week for sustainable progress.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.speedDisplayContainer}>
          <Ionicons name={speedCategory.icon} size={36} color={'#000'} style={styles.speedIcon} />
          <View style={styles.speedTextContainer}>
            <Text style={[styles.speedValueText, { color: '#000' }]}>{currentSpeed.toFixed(1)} lbs/week</Text>
            <Text style={[styles.speedLabelText, { color: '#000' }]}>{speedCategory.label}</Text>
          </View>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={MIN_SPEED}
          maximumValue={MAX_SPEED}
          step={SPEED_STEP}
          value={currentSpeed}
          onValueChange={(value) => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setCurrentSpeed(value);
          }}
          minimumTrackTintColor={'#000'} 
          maximumTrackTintColor="#E0E0E0"
          thumbTintColor={'#000'}
        />
        <Text style={styles.note}>
          Faster you go, the more fat you will gain (bulk) and more muscle you will lose (cut)
        </Text>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={handleNext}>
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
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    alignContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedDisplayContainer: {
    alignItems: 'center',
    marginBottom: 40,
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
    justifyContent: 'center',
  },
  speedIcon: {
    marginRight: 15,
  },
  speedTextContainer: {
    alignItems: 'flex-start',
  },
  speedValueText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  speedLabelText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 2,
  },
  note: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginTop: 20,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40, // Standard slider height
  },
  footer: {
    width: '100%',
    marginTop: 'auto',
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
