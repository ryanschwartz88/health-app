import GlassPanel from '@/components/ui/GlassPanel';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
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

export default function DateOfBirthScreen() {
  const { data, updateData } = useOnboarding();
  
  // Initialize with saved data or defaults
  const initialDate = data.dateOfBirth ? new Date(data.dateOfBirth) : new Date();
  const initialMonth = initialDate.getMonth();
  const initialDay = initialDate.getDate() - 1; // Arrays are 0-indexed
  const initialYear = initialDate.getFullYear() - 1940; // Start from 1940
  
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Generate days 1-31
  const days = Array.from({ length: 31 }, (_, i) => (i + 1));
  
  // Generate years from 1940 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1940 + 1 },
    (_, i) => (1940 + i)
  );

    // Function to handle scroll events and selection
  const handleScroll = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    event: NativeSyntheticEvent<NativeScrollEvent>,
    itemHeight: number,
    maxItems: number
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const selectedIndex = Math.round(offsetY / itemHeight);
    const boundedIndex = Math.max(0, Math.min(selectedIndex, maxItems - 1));
    
    setter(boundedIndex);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Create a date object from the selected values
    const birthDate = new Date(
      years[selectedYear],
      selectedMonth,
      days[selectedDay]
    );
    
    updateData({ dateOfBirth: birthDate.toISOString() });
    router.push('/onboarding/body-measurements');
  };

  // References for scrolling to initial position
  const monthScrollRef = useRef<ScrollView>(null);
  const dayScrollRef = useRef<ScrollView>(null);
  const yearScrollRef = useRef<ScrollView>(null);

  // Constants for picker dimensions
  const ITEM_HEIGHT = 50;
  const VISIBLE_ITEMS = 3;
  const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>When were you born?</Text>
        <Text style={styles.subtitle}>This helps us calculate age-appropriate nutritional needs.</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <GlassPanel style={{padding: 10}}>
        <View style={styles.pickerContainer}>
          {/* Month Picker */}
          <View style={styles.pickerColumn}>
            <Text style={styles.pickerLabel}>Month</Text>
                        <View style={styles.pickerWrapper}>
              <ScrollView
                ref={monthScrollRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={(e) => handleScroll(setSelectedMonth, e, ITEM_HEIGHT, months.length)}
                contentContainerStyle={{
                  paddingVertical: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2,
                }}
                style={styles.picker}
                onLayout={() => {
                  monthScrollRef.current?.scrollTo({
                    y: selectedMonth * ITEM_HEIGHT,
                    animated: false,
                  });
                }}
              >
                {months.map((month, index) => (
                  <View
                    key={month}
                    style={[
                      styles.pickerItem,
                    ]}
                  >
                    <Text
                      style={[
                        styles.pickerItemText,
                        selectedMonth === index && styles.selectedItemText,
                      ]}
                    >
                      {month}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.pickerHighlight} pointerEvents="none" />
            </View>

          </View>

          {/* Day Picker */}
          <View style={styles.pickerColumn}>
            <Text style={styles.pickerLabel}>Day</Text>
                        <View style={styles.pickerWrapper}>
              <ScrollView
                ref={dayScrollRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={(e) => handleScroll(setSelectedDay, e, ITEM_HEIGHT, days.length)}
                contentContainerStyle={{
                  paddingVertical: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2,
                }}
                style={styles.picker}
                onLayout={() => {
                  dayScrollRef.current?.scrollTo({
                    y: selectedDay * ITEM_HEIGHT,
                    animated: false,
                  });
                }}
              >
                {days.map((day) => (
                  <View
                    key={day}
                    style={[
                      styles.pickerItem,
                    ]}
                  >
                    <Text
                      style={[
                        styles.pickerItemText,
                        selectedDay === day - 1 && styles.selectedItemText,
                      ]}
                    >
                      {day}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.pickerHighlight} pointerEvents="none" />
            </View>

          </View>

          {/* Year Picker */}
          <View style={styles.pickerColumn}>
            <Text style={styles.pickerLabel}>Year</Text>
                        <View style={styles.pickerWrapper}>
              <ScrollView
                ref={yearScrollRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={(e) => handleScroll(setSelectedYear, e, ITEM_HEIGHT, years.length)}
                contentContainerStyle={{
                  paddingVertical: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2,
                }}
                style={styles.picker}
                onLayout={() => {
                  yearScrollRef.current?.scrollTo({
                    y: selectedYear * ITEM_HEIGHT,
                    animated: false,
                  });
                }}
              >
                {years.map((year, index) => (
                  <View
                    key={year}
                    style={[
                      styles.pickerItem
                    ]}
                  >
                    <Text
                      style={[
                        styles.pickerItemText,
                        selectedYear === index && styles.selectedItemText,
                      ]}
                    >
                      {year}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.pickerHighlight} pointerEvents="none" />
            </View>

          </View>
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
    fontFamily: 'outfit-bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  pickerColumn: {
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 14,
    fontFamily: 'outfit-medium',
    color: '#666',
    marginVertical: 8,
  },
    pickerWrapper: {
    height: 150,
    overflow: 'hidden',
    position: 'relative',
    width: 100,
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
    fontFamily: 'outfit-medium',
    color: '#999',
  },
  selectedItemText: {
    fontFamily: 'outfit-semibold',
    color: '#000',
  },
  pickerHighlight: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    zIndex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  wheelPickerText: {
    fontSize: 16,
    color: '#333',
  },
  selectedIndicator: {
    borderColor: '#e0e0e0',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'outfit-semibold',
  },
});
