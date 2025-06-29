import DynamicOvalProgressBar from '@/components/ui/DynamicOvalProgressBar';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { AppText } from '../ui/AppText';
import GlassPanel from '../ui/GlassPanel';

interface HealthCategoryCardProps {
  category: string;
  completionRate: number; // 0 to 100
  icon?: keyof typeof Ionicons.glyphMap;
}

export const HealthCategoryCard: React.FC<HealthCategoryCardProps> = ({
  category,
  completionRate,
  icon = 'heart-outline', // Default icon
}) => {
  // Ensure completion rate is between 0-100
  const normalizedRate = Math.min(Math.max(completionRate, 0), 100);

  return (
    <GlassPanel 
      rounded="xl" 
      hasBorder={true}
      className="p-4 m-2" 
      style={{shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10}}
    >
      {/* First row with icon, category name and percentage */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          {/* Icon in circle */}
          <View className="h-12 w-12 rounded-full bg-black/10 items-center justify-center mr-3">
            <Ionicons name={icon} size={24} color="black" />
          </View>
          
          {/* Category name */}
          <AppText variant="h3" weight="regular">{category}</AppText>
        </View>
        
        {/* Completion percentage */}
        <AppText variant="h2" weight="regular">{Math.round(normalizedRate)}%</AppText>
      </View>
      
      {/* Progress bar row */}
      <View className="flex-row">
        <DynamicOvalProgressBar progressPercent={normalizedRate} style={{ flex: 1, justifyContent: 'space-between' }} />
      </View>
    </GlassPanel>
  );
};

export default HealthCategoryCard;
