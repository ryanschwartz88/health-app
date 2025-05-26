import AdditiveItem from "@/components/bad_additives/AdditiveItem";
import HealthCategoryCard from "@/components/nutrition/HealthCategoryCard";
import HomeGraph from "@/components/nutrition/HomeGraph";
import BottomSpacer from "@/components/ui/BottomSpacer";
import Header from "@/components/ui/Header";
import { getUserId } from "@/utils/secureStorage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  
  // Sample data for HomeGraph component
  const nutritionData: [string, number, number][] = [
    ["8:00 AM", 10, 15],
    ["10:00 AM", 20, 25],
    ["12:00 PM", 35, 30],
    ["2:00 PM", 45, 50],
    ["6:00 PM", 65, 67],
  ];

  useEffect(() => {
    // Get the user ID when the component mounts
    async function fetchUserId() {
      try {
        const id = await getUserId();
        setUserId(id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserId();
  }, []);

  if (loading) {
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Include Header with personalized greeting and calendar */}
      <Header name="Ryan" showCalendar={true} />
      
      <View style={styles.content}>
        <HomeGraph data={nutritionData} />
        
        <View style={styles.spacing} />
        
        <AdditiveItem 
          icon={<MaterialCommunityIcons name="candy" size={24} color="black" />}
          name="Sugar"
          amount={74}
          unit="g"
          color="#F0686F"
        />
        <HealthCategoryCard 
          category="Calories"
          completionRate={60}
          icon="flame"
        />
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
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  spacing: {
    height: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userIdText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  featureButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
