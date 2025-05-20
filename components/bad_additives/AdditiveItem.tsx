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
    <View className="w-full flex-row items-center justify-between px-1 py-1 bg-white rounded-full mb-2 bg-opacity-40 border border-white">
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
  );
};

export default AdditiveItem;
