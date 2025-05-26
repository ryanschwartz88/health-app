import useBottomTabBarHeight from '@/hooks/useBottomTabBarHeight';
import React from 'react';
import { View } from 'react-native';

type BottomSpacerProps = {
  customHeight?: number;
};

/**
 * A component that adds appropriate spacing at the bottom of scrollable content
 * to ensure it's not hidden behind the custom tab bar
 */
const BottomSpacer: React.FC<BottomSpacerProps> = ({ customHeight }) => {
  const tabBarHeight = useBottomTabBarHeight();
  
  return (
    <View style={{ height: customHeight || tabBarHeight }} />
  );
};

export default BottomSpacer;
