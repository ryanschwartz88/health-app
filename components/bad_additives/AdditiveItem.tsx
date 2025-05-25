import GlassPanel from '@/components/ui/GlassPanel';
import React from 'react';
import { Text, View } from 'react-native';

type AdditiveItemProps = {
  icon: React.ReactNode;
  name: string;
  amount: number;
  unit: string;
  color: string;
};

const AdditiveItem = ({ icon, name, amount, unit, color }: AdditiveItemProps) => {
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
        <Text className="text-xl font-medium mr-4">
          {amount}{unit}
        </Text>
      </View>
    </GlassPanel>
  );
};

export default AdditiveItem;

