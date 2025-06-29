import DynamicOvalProgressBar from '@/components/ui/DynamicOvalProgressBar'; // Assuming this path is correct
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { AppText } from '../ui/AppText';
import GlassPanel from '../ui/GlassPanel'; // Assuming you want to use GlassPanel

// Interface for individual support items
export interface SupportItemData {
  id: string;
  title: string;
  takenAmount: number;
  limitAmount: number;
  unit: string;
}

// Props for the TargetedSupportCard
interface TargetedSupportCardProps {
  iconName: keyof typeof Ionicons.glyphMap; // For the main icon
  title: string;
  overallPercentage: number; // 0-100
  items: SupportItemData[];
  onRemove: () => void; // Callback when the remove button is pressed
}

const TargetedSupportCard: React.FC<TargetedSupportCardProps> = ({
  iconName,
  title,
  overallPercentage,
  items,
  onRemove,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const normalizedOverallPercentage = Math.min(Math.max(overallPercentage, 0), 100);


  // Simple horizontal progress bar for individual items
  const ItemProgressBar: React.FC<{ percentage: number }> = ({ percentage }) => {
    const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
    const progressColor = 'bg-[#1AD0A9]';
    
    return (
      <View className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
        <View 
          style={{ width: `${normalizedPercentage}%` }} 
          className={`h-full rounded-full ${progressColor}`} 
        />
      </View>
    );
  };

  return (
    <GlassPanel rounded="xl" hasBorder={true} className="pt-4 pl-4 pr-4">
      {/* Top section: Icon, Title, Overall Percentage */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="h-12 w-12 rounded-full bg-black/10 items-center justify-center mr-3">
            <Ionicons name={iconName} size={20} color="black" />
          </View>
          <AppText variant="h4" weight="regular">{title}</AppText>
        </View>
        <AppText variant="h4" weight="regular">{Math.round(normalizedOverallPercentage)}%</AppText>
      </View>

      {/* Overall Progress Bar */}
      <View className="flex-row mb-3">
        <DynamicOvalProgressBar 
          progressPercent={normalizedOverallPercentage} 
          style={{ flex: 1, justifyContent: 'space-between' }} 
        />
      </View>

      {/* Details/Collapse Toggle Button */}
      <Pressable
        onPress={() => setIsExpanded(!isExpanded)}
        className="flex-row items-center justify-center py-2"
      >
        <AppText variant="body2" weight="medium" className="text-gray-600 mr-1">
          {isExpanded ? 'Collapse' : 'Details'}
        </AppText>
        <Feather 
          name={isExpanded ? 'chevron-up' : 'chevron-down'} 
          size={18} 
          color="rgb(75 85 99)" // text-gray-600
        />
      </Pressable>

      {/* Collapsible Section */}
      <Collapsible collapsed={!isExpanded} duration={300}>
        <View className="mt-3">
          {items.map((item) => {
            const itemPercentage = item.limitAmount > 0 
              ? (item.takenAmount / item.limitAmount) * 100 
              : 0;
            const displayPercentage = Math.round(Math.min(Math.max(itemPercentage, 0), 100));

            return (
              <View key={item.id} className="mb-4 border-t border-n-border pt-4">
                <View className="flex-row justify-between items-center mb-3">
                  <AppText variant="body1" weight="medium">{item.title}</AppText>
                  <View className="flex-row items-center">
                    <View className="flex-row items-baseline">
                      <AppText variant="body1" weight="semibold" className="text-black">{item.takenAmount}/</AppText>
                      <AppText variant="body2" className="text-gray-600">{item.limitAmount}{item.unit}</AppText>
                    </View>
                    <View className="h-4 border-l border-black mx-2 self-center" />
                    <AppText variant="body2" weight="semibold" className="text-right">{displayPercentage}%</AppText>
                  </View>
                </View>
                <ItemProgressBar percentage={itemPercentage} />
              </View>
            );
          })}

          {/* Remove Button */}
          <Pressable
            onPress={onRemove}
            className="flex-row items-center justify-center py-2 mt-4 mb-4 bg-red-100 rounded-xl"
          >
            <Feather name="trash-2" size={16} color="rgb(239 68 68)" /> 
            <AppText variant="body2" weight="medium" className="text-red-600 ml-2">
              Remove Support
            </AppText>
          </Pressable>
        </View>
      </Collapsible>
    </GlassPanel>
  );
};

export default TargetedSupportCard;