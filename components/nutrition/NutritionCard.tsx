import DynamicOvalProgressBar from '@/components/ui/DynamicOvalProgressBar'; // Assuming this path is correct
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { AppText } from '../ui/AppText';
import GlassPanel from '../ui/GlassPanel'; // Assuming you want to use GlassPanel

// Interface for individual support items
export interface NutritionItemData {
  id: string;
  title: string;
  takenAmount: number;
  limitAmount: number;
  unit: string;
  isTargeted: boolean;
}

// Props for the TargetedSupportCard
interface NutritionCardProps {
  iconName: keyof typeof Ionicons.glyphMap; // For the main icon
  title: string;
  overallPercentage: number; // 0-100
  items: NutritionItemData[];
}

const NutritionCard: React.FC<NutritionCardProps> = ({
  iconName,
  title,
  overallPercentage,
  items,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const normalizedOverallPercentage = Math.min(Math.max(overallPercentage, 0), 100);

  const hasTargetedItems = useMemo(() => 
    items.some(item => item.isTargeted), 
  [items]);

  React.useEffect(() => {
    if (isExpanded && !isInitialized) {
      const timer = setTimeout(() => {
        setIsInitialized(true);
      }, 50); 
      return () => clearTimeout(timer);
    }
    if (!isExpanded) {
        setIsInitialized(true); // If user collapses, it's considered initialized for subsequent expands
    }
  }, [isExpanded, isInitialized]);


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
    <GlassPanel rounded="xl" hasBorder={true} className="pt-4 pl-4 pr-4 m-2">
      {/* Top section: Icon, Title, Overall Percentage */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="h-10 w-10 rounded-full bg-black/10 items-center justify-center mr-3">
            <Ionicons name={iconName} size={20} color="black" />
          </View>
          <AppText variant="h4" weight="medium">{title}</AppText>
        </View>
        <AppText variant="h3" weight="regular">{Math.round(normalizedOverallPercentage)}%</AppText>
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
      <Collapsible collapsed={!isExpanded || !isInitialized}>
        <View className="mt-3">
          {items.map((item) => {
            const itemPercentage = item.limitAmount > 0 
              ? (item.takenAmount / item.limitAmount) * 100 
              : 0;
            const displayPercentage = Math.round(Math.min(Math.max(itemPercentage, 0), 100));

            return (
              <View key={item.id} className="mb-4 border-t border-gray-200 pt-4">
                <View className="flex-row justify-between items-center mb-3">
                  <AppText variant="body1" weight="medium">
                    {item.title}
                    {item.isTargeted && <AppText className="text-red-500">*</AppText>}
                  </AppText>
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

          {hasTargetedItems && (
            <AppText variant="tagline" className="text-right text-gray-500 italic mt-2 mb-2">
              *Targeted Support - Not included in percentage
            </AppText>
          )}

        </View>
      </Collapsible>
    </GlassPanel>
  );
};

export default NutritionCard;