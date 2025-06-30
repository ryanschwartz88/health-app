import React from 'react';
import { View } from 'react-native';
import { AppText } from './AppText';

interface TitledSectionProps {
  title: string;
  children: React.ReactNode;
}

const TitledSection: React.FC<TitledSectionProps> = ({ title, children }) => {
  return (
    <View className="mb-10">
      <AppText variant="h3" weight="medium" className="mb-3">
        {title}
      </AppText>
      {children}
    </View>
  );
};

export default TitledSection;
