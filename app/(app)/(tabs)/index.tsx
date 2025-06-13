import SummaryCard from "@/components/ai/SummaryCard";
import AdditiveItem from "@/components/bad_additives/AdditiveItem";
import HealthCategoryCard from "@/components/nutrition/CategoryHomeCard";
import BottomSpacer from "@/components/ui/BottomSpacer";
import GlassTabView from "@/components/ui/GlassTabView";
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
      
      <View style={styles.content}>
        <SummaryCard
          title="Summary"
          body="This is a summary of your health data for the week."
          tags={['Health', 'Nutrition', 'Exercise']}
          rounded="lg"
          style={{ width: '100%' }}
        />
        <GlassTabView
          tabs={[
            {
              key: 'summary',
              title: 'Summary',
              content: (
                <View className="space-y-4">
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
              ),
            },
            {
              key: 'nutrition',
              title: 'Nutrition',
              content: (
                <View style={{width: '100%', minWidth: '100%'}} className="space-y-4">
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
              ),
            },
          ]}
          initialTabIndex={0}
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
