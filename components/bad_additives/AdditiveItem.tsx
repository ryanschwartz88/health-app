import { AppText } from '@/components/ui/AppText';
import GlassPanel from '@/components/ui/GlassPanel';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

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
    <GlassPanel rounded="full" style={{ paddingVertical: 4, paddingHorizontal: 4, width: '100%' }}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <View 
            className="w-14 h-14 rounded-full items-center justify-center"
            style={{ backgroundColor: color }}
          >
            {icon}
          </View>
          <AppText variant="body1" weight="regular">{name}</AppText>
        </View>
        <View className="flex-row items-center gap-3">
          <AppText variant="body1" weight="regular">
            {amount}{unit}
          </AppText>
          <TouchableOpacity onPress={onPress} className="w-8 h-8 rounded-full items-center justify-center bg-white">
            <Feather name="chevron-right" size={20} color="black" />
          </TouchableOpacity>
        </View>
        
      </View>
    </GlassPanel>
  );
};

export default AdditiveItem;

