import GlassPanel from '@/components/ui/GlassPanel';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useOnboarding } from './_layout';

// Custom hook for picker logic
const usePicker = (
  initialValue: number,
  items: (string | number)[],
  pickerLabel: string,
  itemHeightConstant: number
) => {
  const [selectedIndex, setSelectedIndex] = useState(initialValue);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemHeightConstant);
    const boundedIndex = Math.max(0, Math.min(index, items.length - 1));

    if (selectedIndex !== boundedIndex) {
      setSelectedIndex(boundedIndex);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: boundedIndex * itemHeightConstant, animated: false });
      }, 0);
    } else if (offsetY !== boundedIndex * itemHeightConstant) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: boundedIndex * itemHeightConstant, animated: false });
      }, 0);
    }
  };

  useEffect(() => {
    if (items && items.length > 0 && selectedIndex >= 0 && selectedIndex < items.length) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: selectedIndex * itemHeightConstant, animated: false });
      }, 100);
    }
  }, [items, selectedIndex, pickerLabel, itemHeightConstant]);

  return { selectedIndex, scrollRef, handleScroll, setSelectedIndex };
};

const ITEM_HEIGHT = 50;
const PICKER_HEIGHT = 250; // 5 items visible

export default function GoalWeightScreen() {
  const { data, updateData } = useOnboarding();

  const goalWeightOptions = useMemo(() => Array.from({ length: 351 }, (_, i) => i + 50), []);

  const getInitialPickerIndex = () => {
    if (data.targetWeight) {
      const savedIndex = goalWeightOptions.indexOf(parseInt(data.targetWeight, 10));
      if (savedIndex !== -1) return savedIndex;
    }

    const currentWeight = data.currentWeight || 150;
    let initialTargetWeight = currentWeight;

    if (data.weightGoal === 'increase') {
      initialTargetWeight = currentWeight + 20;
    } else if (data.weightGoal === 'loss') {
      initialTargetWeight = currentWeight - 20;
    }
    
    const closestIndex = goalWeightOptions.indexOf(initialTargetWeight);
    return closestIndex !== -1 ? closestIndex : goalWeightOptions.indexOf(currentWeight) || 100;
  };

  const {
    selectedIndex: goalWeightIndex,
    scrollRef: goalWeightScrollRef,
    handleScroll: handleGoalWeightScroll,
  } = usePicker(getInitialPickerIndex(), goalWeightOptions, "GoalWeight", ITEM_HEIGHT);

  const handleNext = () => {
    const selectedWeight = goalWeightOptions[goalWeightIndex] as number;
    if (selectedWeight) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      updateData({ targetWeight: selectedWeight.toString() });
      router.push('/onboarding/goal-speed');
    }
  };

  const currentWeight = data.currentWeight || 0;
  const selectedGoalWeight = goalWeightOptions[goalWeightIndex] as number;
  const netChange = selectedGoalWeight - currentWeight;
  const netChangeSign = netChange >= 0 ? '+' : '';
  const netChangeFormatted = `${netChangeSign}${netChange} lbs`;

  const renderPicker = (
    scrollRef: React.RefObject<ScrollView>,
    options: (string | number)[],
    selectedIndex: number,
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
    unit: string
  ) => (
    <View style={styles.pickerWrapper}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={onScroll}
        contentContainerStyle={{ paddingVertical: (PICKER_HEIGHT - ITEM_HEIGHT) / 2 }}
        style={styles.picker}
        onLayout={() => {
          scrollRef.current?.scrollTo({ y: selectedIndex * ITEM_HEIGHT, animated: false });
        }}
      >
        {options.map((option, index) => (
          <View key={`${option}-${index}-${unit}`} style={styles.pickerItem}>
            <Text style={[styles.pickerItemText, selectedIndex === index && styles.selectedItemText]}>
              {option} {unit}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pickerHighlight} pointerEvents="none" />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What is your goal weight?</Text>
        <Text style={styles.subtitle}>We'll create a plan to help you reach this target.</Text>
      </View>

      <View style={styles.contentContainer}>
        <GlassPanel style={styles.glassPanel}>
          <View style={styles.pickerContainer}>
            <View style={styles.netChangeContainer}>
              <Text style={styles.netChangeValue}>{netChangeFormatted}</Text>
              <Text style={styles.netChangeLabel}>from current</Text>
              <Text style={styles.netChangeLabel}>weight</Text>
            </View>
            {renderPicker(goalWeightScrollRef, goalWeightOptions, goalWeightIndex, handleGoalWeightScroll, "lbs")}
          </View>
        </GlassPanel>
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
    marginBottom: 20,
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
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassPanel: {
    padding: 24,
    width: '100%',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  netChangeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
  },
  netChangeValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  netChangeLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
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
  pickerWrapper: {
    height: PICKER_HEIGHT,
    width: '60%', // Adjust width as needed
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    width: '100%',
  },
  pickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerItemText: {
    fontSize: 22,
    color: '#aaa',
  },
  selectedItemText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  pickerHighlight: {
    position: 'absolute',
    top: (PICKER_HEIGHT - ITEM_HEIGHT) / 2,
    left: -10,
    right: -10,
    height: ITEM_HEIGHT,
    backgroundColor: 'rgba(100, 100, 100, 0.1)',
    borderRadius: 10,
    padding: 2,
  },
});
