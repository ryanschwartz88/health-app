import NutritionCard from '@/components/nutrition/NutritionCard';
import BottomSpacer from '@/components/ui/BottomSpacer';
import GlassPanel from '@/components/ui/GlassPanel';
import InvertedGlassPanel from '@/components/ui/InvertedGlassPanel'; // Import InvertedGlassPanel
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type ActiveSegment = 'Health Categories' | 'All Nutrients';

const healthCategoriesData: Array<Omit<React.ComponentProps<typeof NutritionCard>, 'key'>> = [
  {
    iconName: 'medkit-outline',
    title: 'Bone Support',
    overallPercentage: 75,
    items: [
      { id: 'hc1_1', title: 'Calcium', takenAmount: 800, limitAmount: 1200, unit: 'mg', isTargeted: false },
      { id: 'hc1_2', title: 'Vitamin D3', takenAmount: 1500, limitAmount: 2000, unit: 'IU', isTargeted: false },
      { id: 'hc1_3', title: 'Magnesium', takenAmount: 200, limitAmount: 400, unit: 'mg', isTargeted: true },
    ],
  },
  {
    iconName: 'heart-outline',
    title: 'Heart Health',
    overallPercentage: 60,
    items: [
      { id: 'hc2_1', title: 'Omega-3 EPA', takenAmount: 500, limitAmount: 1000, unit: 'mg', isTargeted: false },
      { id: 'hc2_2', title: 'CoQ10', takenAmount: 90, limitAmount: 150, unit: 'mg', isTargeted: false },
    ],
  },
  {
    iconName: 'bulb-outline',
    title: 'Cognitive Function',
    overallPercentage: 45,
    items: [
      { id: 'hc3_1', title: 'Vitamin B12', takenAmount: 2, limitAmount: 2.4, unit: 'mcg', isTargeted: false },
      { id: 'hc3_2', title: 'Choline', takenAmount: 300, limitAmount: 550, unit: 'mg', isTargeted: false },
    ],
  },
  {
    iconName: 'leaf-outline', // Placeholder, consider a skin-related icon
    title: 'Skin Vitality',
    overallPercentage: 80,
    items: [
      { id: 'hc4_1', title: 'Vitamin C', takenAmount: 70, limitAmount: 90, unit: 'mg', isTargeted: false },
      { id: 'hc4_2', title: 'Collagen Peptides', takenAmount: 8, limitAmount: 10, unit: 'g', isTargeted: true },
    ],
  },
];

const allNutrientsData: Array<Omit<React.ComponentProps<typeof NutritionCard>, 'key'>> = [
  {
    iconName: 'nutrition-outline',
    title: 'Vitamins',
    overallPercentage: 85,
    items: [
      { id: 'an1_1', title: 'Vitamin A', takenAmount: 700, limitAmount: 900, unit: 'mcg RAE', isTargeted: false },
      { id: 'an1_2', title: 'Vitamin K2', takenAmount: 90, limitAmount: 120, unit: 'mcg', isTargeted: false },
    ],
  },
  {
    iconName: 'flask-outline', // Placeholder
    title: 'Minerals',
    overallPercentage: 70,
    items: [
      { id: 'an2_1', title: 'Iron', takenAmount: 12, limitAmount: 18, unit: 'mg', isTargeted: false },
      { id: 'an2_2', title: 'Zinc', takenAmount: 8, limitAmount: 11, unit: 'mg', isTargeted: false },
      { id: 'an2_3', title: 'Selenium', takenAmount: 40, limitAmount: 55, unit: 'mcg', isTargeted: true },
    ],
  },
  {
    iconName: 'flame-outline', // Placeholder
    title: 'Macros',
    overallPercentage: 55,
    items: [
      { id: 'an3_1', title: 'Protein', takenAmount: 60, limitAmount: 100, unit: 'g', isTargeted: false },
      { id: 'an3_2', title: 'Fiber', takenAmount: 20, limitAmount: 30, unit: 'g', isTargeted: false },
    ],
  },
  {
    iconName: 'rocket-outline', // Placeholder
    title: 'Boosters',
    overallPercentage: 90,
    items: [
      { id: 'an4_1', title: 'Probiotics', takenAmount: 1, limitAmount: 1, unit: 'serving', isTargeted: false },
      { id: 'an4_2', title: 'Antioxidant Blend', takenAmount: 1, limitAmount: 1, unit: 'scoop', isTargeted: true },
    ],
  },
];

export default function NutritionScreen() {
  const [activeSegment, setActiveSegment] = useState<ActiveSegment>('Health Categories');

  const currentData = activeSegment === 'Health Categories' ? healthCategoriesData : allNutrientsData;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

      {/* Segmented Control Buttons */}
      <View style={styles.switcherButtonContainer}>
        {activeSegment === 'Health Categories' ? (
          <InvertedGlassPanel rounded="full" hasBorder={true} style={styles.activeSwitcherButtonWrapper}>
            <Pressable style={styles.switcherButton} onPress={() => setActiveSegment('Health Categories')}>
              <Text style={[styles.switcherText, styles.activeSwitcherText]}>Health Categories</Text>
            </Pressable>
          </InvertedGlassPanel>
        ) : (
          <GlassPanel rounded="full" hasBorder={true} style={styles.inactiveSwitcherButtonWrapper}>
            <Pressable style={styles.switcherButton} onPress={() => setActiveSegment('Health Categories')}>
              <Text style={styles.switcherText}>Health Categories</Text>
            </Pressable>
          </GlassPanel>
        )}

        {activeSegment === 'All Nutrients' ? (
          <InvertedGlassPanel rounded="full" hasBorder={false} style={styles.activeSwitcherButtonWrapper}>
            <Pressable style={styles.switcherButton} onPress={() => setActiveSegment('All Nutrients')}>
              <Text style={[styles.switcherText, styles.activeSwitcherText]}>All Nutrients</Text>
            </Pressable>
          </InvertedGlassPanel>
        ) : (
          <GlassPanel rounded="full" hasBorder={false} style={styles.inactiveSwitcherButtonWrapper}>
            <Pressable style={styles.switcherButton} onPress={() => setActiveSegment('All Nutrients')}>
              <Text style={styles.switcherText}>All Nutrients</Text>
            </Pressable>
          </GlassPanel>
        )}
      </View>

      {/* Nutritional Cards Section */}
      <View style={styles.section}>
        
        <View style={styles.cardsContainer}>
          {currentData.map((cardProps, index) => (
            <NutritionCard key={`${activeSegment}-${index}`} {...cardProps} />
          ))}
        </View>
      </View>
      <BottomSpacer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 8, // Use 8 for less side padding if cards have m-2
    paddingTop: 16,
    paddingBottom: 24,
  },
  switcherButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  activeSwitcherButtonWrapper: {
    flex: 1,
    marginHorizontal: 4, // Add some space between buttons
  },
  inactiveSwitcherButtonWrapper: {
    flex: 1,
    marginHorizontal: 4, // Add some space between buttons
  },
  switcherButton: { // Style for the Pressable area inside the panels
    paddingVertical: 12, // Increased padding for larger touch area
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Ensure Pressable fills the panel
  },
  switcherText: {
    fontSize: 16, // Increased text size
    color: 'black', // gray-700 for inactive
    textAlign: 'center',
  },
  activeSwitcherText: {
    color: 'white', // Text color for active button (inside InvertedGlassPanel)
  },
  section: {
    marginBottom: 24,
  },
  cardsContainer: {
    gap: 12,
  },
});
