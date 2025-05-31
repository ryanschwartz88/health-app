import GlassPanel from '@/components/ui/GlassPanel';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type AdditiveItemProps = {
  icon: React.ReactNode;
  name: string;
  amount: number;
  unit: string;
  color: string;
  onPress?: () => void;
};

const AdditiveItem = ({ icon, name, amount, unit, color, onPress }: AdditiveItemProps) => {
  return (
    <GlassPanel rounded="full" style={{ paddingVertical: 4, paddingHorizontal: 4, marginBottom: 8, width: '100%' }}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View 
            className="w-14 h-14 rounded-full items-center justify-center mr-4"
            style={{ backgroundColor: color }}
          >
            {icon}
          </View>
          <Text className="text-xl font-medium">{name}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-xl font-medium mr-3">
            {amount}{unit}
          </Text>
          <TouchableOpacity onPress={onPress} className="w-10 h-10 rounded-full items-center justify-center bg-white mr-2">
            <Feather name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        
      </View>
    </GlassPanel>
  );
};

export default AdditiveItem;

