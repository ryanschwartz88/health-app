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
  itemHeightConstant: number // New parameter for the constant item height
) => {
  const [selectedIndex, setSelectedIndex] = useState(initialValue);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    itemHeight: number,
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // Note: the 'itemHeight' from the event in renderPicker is ITEM_HEIGHT, so using itemHeightConstant here is consistent.
    const index = Math.round(offsetY / itemHeightConstant);
    const boundedIndex = Math.max(0, Math.min(index, items.length - 1));

    // console.log(`Picker (${pickerLabel}): offsetY=${offsetY}, itemHeight=${itemHeightConstant}, rawIndex=${offsetY / itemHeightConstant}, roundedIndex=${index}, boundedIndex=${boundedIndex}, currentSelectedIndex=${selectedIndex}`);

    if (selectedIndex !== boundedIndex) { // Only update and scroll if the index actually changed
      setSelectedIndex(boundedIndex);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: boundedIndex * itemHeightConstant, animated: false });
      }, 0);
    } else if (offsetY !== boundedIndex * itemHeightConstant) {
      // If the index is the same but offset is not perfect, still try to correct it.
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: boundedIndex * itemHeightConstant, animated: false });
      }, 0);
    }
  };

  // Add a useEffect to scroll to initial position or when items change
  useEffect(() => {
    // console.log(`Picker (${pickerLabel}): Initial scroll to index ${selectedIndex} using itemHeight: ${itemHeightConstant}`);
    if (items && items.length > 0 && selectedIndex >= 0 && selectedIndex < items.length) {
        setTimeout(() => { // Ensure layout is complete
            scrollRef.current?.scrollTo({ y: selectedIndex * itemHeightConstant, animated: false });
        }, 100); // A small delay can sometimes help ensure the scroll happens after layout
    }
  }, [items, selectedIndex, pickerLabel, itemHeightConstant]); // Rerun if items change or selectedIndex is programmatically changed

  return { selectedIndex, scrollRef, handleScroll, setSelectedIndex };
};

export default function BodyMeasurementsScreen() {
  const { data, updateData } = useOnboarding();
  const [units, setUnits] = useState<'imperial' | 'metric'>('imperial');

  // Imperial options
  const feetOptions = useMemo(() => Array.from({ length: 6 }, (_, i) => i + 4), []); // 4-9 feet
  const inchOptions = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []); // 0-11 inches
  const weightLbsOptions = useMemo(() => Array.from({ length: 351 }, (_, i) => i + 50), []); // 50-400 lbs

  // Metric options
  const heightCmOptions = useMemo(() => Array.from({ length: 121 }, (_, i) => i + 120), []); // 120-240 cm
  const weightKgOptions = useMemo(() => Array.from({ length: 151 }, (_, i) => i + 30), []); // 30-180 kg

  const ITEM_HEIGHT = 50;
  const PICKER_HEIGHT = 150;

  // Hooks for pickers
  const { selectedIndex: feetIndex, scrollRef: feetScrollRef, handleScroll: handleFeetScroll, setSelectedIndex: setFeetIndex } = usePicker(1, feetOptions, "Feet", ITEM_HEIGHT);
  const { selectedIndex: inchIndex, scrollRef: inchScrollRef, handleScroll: handleInchScroll, setSelectedIndex: setInchIndex } = usePicker(6, inchOptions, "Inches", ITEM_HEIGHT);
  const { selectedIndex: weightLbsIndex, scrollRef: weightLbsScrollRef, handleScroll: handleWeightLbsScroll, setSelectedIndex: setWeightLbsIndex } = usePicker(100, weightLbsOptions, "Lbs", ITEM_HEIGHT);
  const { selectedIndex: heightCmIndex, scrollRef: heightCmScrollRef, handleScroll: handleHeightCmScroll, setSelectedIndex: setHeightCmIndex } = usePicker(50, heightCmOptions, "Cm", ITEM_HEIGHT);
  const { selectedIndex: weightKgIndex, scrollRef: weightKgScrollRef, handleScroll: handleWeightKgScroll, setSelectedIndex: setWeightKgIndex } = usePicker(10, weightKgOptions, "Kg", ITEM_HEIGHT);

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    let heightFeetValue: number;
    let heightInchesValue: number;
    let currentWeightValue: number;

    if (units === 'imperial') {
      heightFeetValue = feetOptions[feetIndex] as number;
      heightInchesValue = inchOptions[inchIndex] as number;
      currentWeightValue = weightLbsOptions[weightLbsIndex] as number;
    } else {
      // Convert metric to imperial for storage
      const heightInCm = heightCmOptions[heightCmIndex] as number;
      const totalInches = heightInCm / 2.54;
      heightFeetValue = Math.floor(totalInches / 12);
      heightInchesValue = Math.round(totalInches % 12);

      const weightInKg = weightKgOptions[weightKgIndex] as number;
      currentWeightValue = Math.round(weightInKg * 2.20462);
    }
    
    updateData({ 
      heightFeet: heightFeetValue,
      heightInches: heightInchesValue,
      currentWeight: currentWeightValue
    });
    router.push('/onboarding/your-fitness-goals');
  };

  const renderPicker = (
    scrollRef: React.RefObject<ScrollView>,
    options: (string | number)[],
    selectedIndex: number,
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>, itemHeight: number) => void,
    unit: string
  ) => (
    <View style={styles.pickerWrapper}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={(e) => onScroll(e, ITEM_HEIGHT)}
        contentContainerStyle={{ paddingVertical: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2 }}
        style={styles.picker}
        onLayout={() => {
          scrollRef.current?.scrollTo({ y: selectedIndex * ITEM_HEIGHT, animated: false });
        }}
      >
        {options.map((option, index) => (
          <View key={`${option}-${index}`} style={styles.pickerItem}>
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
        <Text style={styles.title}>What's your height & weight?</Text>
        <Text style={styles.subtitle}>This helps us calculate your fitness goals.</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.unitSwitcherContainer}>
          <Pressable onPress={() => setUnits('imperial')} style={[styles.unitButton, units === 'imperial' && styles.unitButtonActive]}>
            <Text style={[styles.unitButtonText, units === 'imperial' && styles.unitButtonTextActive]}>Imperial</Text>
          </Pressable>
          <Pressable onPress={() => setUnits('metric')} style={[styles.unitButton, units === 'metric' && styles.unitButtonActive]}>
            <Text style={[styles.unitButtonText, units === 'metric' && styles.unitButtonTextActive]}>Metric</Text>
          </Pressable>
        </View>
  
        <GlassPanel style={{ padding: 12 }}>
          <View style={styles.pickersRow}>
            {units === 'imperial' ? (
              <>
                <View style={styles.pickerColumn}>
                  <Text style={styles.pickerLabel}>Height</Text>
                  <View style={styles.imperialHeightContainer}>
                      {renderPicker(feetScrollRef, feetOptions, feetIndex, handleFeetScroll, "ft")}
                      {renderPicker(inchScrollRef, inchOptions, inchIndex, handleInchScroll, "in")}
                  </View>
                </View>
                <View style={styles.pickerColumn}>
                  <Text style={styles.pickerLabel}>Weight</Text>
                  {renderPicker(weightLbsScrollRef, weightLbsOptions, weightLbsIndex, handleWeightLbsScroll, "lbs")}
                </View>
              </>
            ) : (
              <>
                <View style={styles.pickerColumn}>
                  <Text style={styles.pickerLabel}>Height</Text>
                  {renderPicker(heightCmScrollRef, heightCmOptions, heightCmIndex, handleHeightCmScroll, "cm")}
                </View>
                <View style={styles.pickerColumn}>
                  <Text style={styles.pickerLabel}>Weight</Text>
                  {renderPicker(weightKgScrollRef, weightKgOptions, weightKgIndex, handleWeightKgScroll, "kg")}
                </View>
              </>
            )}
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
  },
  unitSwitcherContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 4,
  },
  unitButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  unitButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unitButtonTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  unitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  pickersRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  pickerColumn: {
    alignItems: 'center',
    flex: 1,
  },
  imperialHeightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  pickerWrapper: {
    height: 150,
    overflow: 'hidden',
    position: 'relative',
    width: 80,
    marginHorizontal: 5,
  },
  picker: {
    width: '100%',
  },
  pickerItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerItemText: {
    fontSize: 18,
    color: '#999',
  },
  selectedItemText: {
    fontWeight: '600',
    color: '#000',
  },
  pickerHighlight: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  footer: {
    width: '100%',
    marginTop: 'auto',
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
