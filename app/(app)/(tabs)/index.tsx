import RecommendationCard from "@/components/ai/RecommendationCard";
import SummaryCard from "@/components/ai/SummaryCard";
import AdditiveItem from "@/components/bad_additives/AdditiveItem";
import HealthCategoryCard from "@/components/nutrition/CategoryHomeCard";
import HomeGraph from "@/components/nutrition/HomeGraph";
import TargetedSupportCard from "@/components/nutrition/TargetedSupportCard";
import BottomSpacer from "@/components/ui/BottomSpacer";
import CustomCollapsible from "@/components/ui/CustomCollapsible";
import GlassTabView from "@/components/ui/GlassTabView";
import { AppText } from "@/components/ui/AppText";
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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      
      <View style={styles.content}>
      <SummaryCard
          title="Summary"
          body="Based on your recent activity, your overall health appears to be in excellent shape. Your balanced diet—rich in fruits, vegetables, lean proteins, and whole grains—provides the necessary fuel for your daily activities. Keep up the fantastic work and continue nurturing these healthy habits!"
          tags={['More Protein', 'Great Eating Habits']}
          rounded="lg"
          style={{ width: '100%'}}
        />
        <GlassTabView
          tabs={[
            {
              key: 'today',
              title: 'Today',
              content: (
                <View className="space-y-4">
                  <CustomCollapsible
                    header="Nutrition & Health Goals"
                    >
                      <HomeGraph 
                        data={nutritionData}
                      />
                  </CustomCollapsible>

                  <CustomCollapsible
                    header="Targeted Support"
                    >
                      <TargetedSupportCard
                        iconName="flame"
                        title="Calories"
                        overallPercentage={60}
                        items={[
                          {
                            id: '1',
                            title: 'Calories',
                            takenAmount: 60,
                            limitAmount: 100,
                            unit: 'g',
                          },
                          {
                            id: '2',
                            title: 'Protein',
                            takenAmount: 60,
                            limitAmount: 200,
                            unit: 'g',
                          },
                        ]}
                        onRemove={() => {}}
                      />
                  </CustomCollapsible>

                  <CustomCollapsible
                    header="Unhealthy Additives"
                    >
                    <AdditiveItem 
                      icon={<MaterialCommunityIcons name="candy" size={24} color="black" />}
                      name="Sugar"
                      amount={74}
                      unit="g"
                      color="#F0686F"
                    />
                  </CustomCollapsible>
                  
                  <CustomCollapsible
                    header="Calories & Macros"
                    >
                    <HealthCategoryCard 
                      category="Calories"
                      completionRate={60}
                      icon="flame"
                    />
                  </CustomCollapsible>
                
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

        <AppText variant="h2" family="caslon" style={styles.headerText}>
          Improve <AppText weight="medium" family="caslon">Your Health</AppText>
        </AppText>

        <RecommendationCard
          title="Vitamin D"
          rec="Take 1000 IU per day"
          vitamin_id="vitamin_d"
        />
        <RecommendationCard
          title="Vitamin C"
          rec="Take 1000 IU per day"
          vitamin_id="vitamin_c"
        />
        <RecommendationCard
          title="Vitamin B12"
          rec="Take 1000 IU per day"
          vitamin_id="vitamin_b12"
        />

      </View>
      
      <BottomSpacer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: '#4B4B4B',
    textAlign: 'left',
    marginVertical: 20,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 4,
    paddingBottom: 16,
    paddingTop: 16,
  },
  content: {
    flex: 1,
  },


});
