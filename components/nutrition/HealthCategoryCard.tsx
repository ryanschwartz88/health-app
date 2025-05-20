import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

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
  
  // Calculate how many ovals should be filled (out of 16)
  const filledOvals = Math.round((normalizedRate / 100) * 16);
  
  // Determine color based on completion rate
  const getProgressColor = () => {
    if (normalizedRate <= 33) return 'bg-red-400';
    if (normalizedRate <= 66) return 'bg-yellow-400';
    return 'bg-green-400';
  };
  
  const progressColor = getProgressColor();
  
  // Generate an array of 16 ovals for the progress bar
  const progressOvals = Array(16).fill(0).map((_, index) => (
    <View 
      key={index}
      className={`h-4 w-3 rounded-full mx-0.5 ${index < filledOvals ? progressColor : 'bg-gray-300'}`}
    />
  ));

  return (
    <View className="bg-white bg-opacity-40 border border-white rounded-3xl p-4 shadow-sm m-2" style={{shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10}}>
      {/* First row with icon, category name and percentage */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          {/* Icon in circle */}
          <View className="h-12 w-12 rounded-full bg-gray-200 items-center justify-center mr-3">
            <Ionicons name={icon} size={24} color="black" />
          </View>
          
          {/* Category name */}
          <Text className="text-lg font-semibold">{category}</Text>
        </View>
        
        {/* Completion percentage */}
        <Text className="text-3xl font-bold">{Math.round(normalizedRate)}%</Text>
      </View>
      
      {/* Progress bar row */}
      <View className="flex-row">
        {progressOvals}
      </View>
    </View>
  );
};

export default HealthCategoryCard;
