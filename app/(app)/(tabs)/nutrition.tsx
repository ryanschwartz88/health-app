import BottomSpacer from '@/components/ui/BottomSpacer';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HealthCategoryCard from '../../../components/nutrition/HealthCategoryCard';
import AppText from '../../../components/ui/AppText';
import GlassPanel from '../../../components/ui/GlassPanel';

export default function NutritionScreen() {
  return (
    <ScrollView style={styles.container}>
      
      {/* No need for the separate page title since it's in the Header */}

      {/* Nutritional Categories Section */}
      <View style={styles.section}>
        <AppText variant="title" weight="medium" style={styles.sectionTitle}>
          Daily Progress
        </AppText>
        
        <View style={styles.cardsContainer}>
          <HealthCategoryCard 
            category="Protein" 
            completionRate={75} 
            icon="fitness-outline" 
          />
          
          <HealthCategoryCard 
            category="Carbs" 
            completionRate={45} 
            icon="restaurant-outline" 
          />
          
          <HealthCategoryCard 
            category="Fats" 
            completionRate={30} 
            icon="water-outline" 
          />
        </View>
      </View>

      {/* Quick Add Section */}
      <View style={styles.section}>
        <AppText variant="title" weight="medium" style={styles.sectionTitle}>
          Quick Add
        </AppText>
        
        <GlassPanel rounded="lg" style={styles.quickAddPanel}>
          <View style={styles.quickAddRow}>
            <View style={styles.quickAddItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="nutrition-outline" size={24} color="#333" />
              </View>
              <AppText weight="medium">Meal</AppText>
            </View>
            
            <View style={styles.quickAddItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="water-outline" size={24} color="#333" />
              </View>
              <AppText weight="medium">Water</AppText>
            </View>
            
            <View style={styles.quickAddItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="barbell-outline" size={24} color="#333" />
              </View>
              <AppText weight="medium">Exercise</AppText>
            </View>
          </View>
        </GlassPanel>
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
    padding: 16,
    paddingBottom: 40,
  },
  titleContainer: {
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  cardsContainer: {
    gap: 12,
  },
  quickAddPanel: {
    padding: 16,
  },
  quickAddRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  quickAddItem: {
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
});
