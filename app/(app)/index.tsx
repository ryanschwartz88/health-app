import AdditiveItem from "@/components/bad_additives/AdditiveItem";
import HealthCategoryCard from "@/components/nutrition/HealthCategoryCard";
import HomeGraph from "@/components/nutrition/HomeGraph";
import { getUserId } from "@/utils/secureStorage";
import { resetUser } from "@/utils/userManager";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  
  // Sample data for HomeGraph component
  const nutritionData: [string, number, number][] = [
    ["8:00 AM", 10, 15],
    ["10:00 AM", 20, 25],
    ["12:00 PM", 35, 30],
    ["2:00 PM", 45, 50],
    ["4:00 PM", 55, 60],
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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  const deleteAccount = async () => {
    try {
      // Reset user data and update auth state
      const success = await resetUser();
      
      if (success) {
        // Navigation will be handled by the _layout.tsx component
        // after the auth state changes
        console.log('Account deleted successfully');
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to Health App</Text>
        <Text style={styles.userIdText}>User ID: {userId}</Text>
        <HomeGraph data={nutritionData} />
        
        <View className="mt-4" />
        
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
        
        <Text style={styles.buttonText}>You are a premium user</Text>
        <Button title="Delete Account" onPress={deleteAccount} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
