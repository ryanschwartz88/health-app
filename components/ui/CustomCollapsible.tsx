import ArrowIcon from '@/assets/icons/arrow.svg'; // Make sure this path is correct and arrow.svg is an SVG component
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { AppText } from './AppText';

interface CustomCollapsibleProps {
  header: string;
  children: React.ReactNode;
  initialCollapsed?: boolean; // Optional: to start collapsed if needed, defaults to expanded
}

const CustomCollapsible: React.FC<CustomCollapsibleProps> = ({
  header,
  children,
  initialCollapsed = false, // Default to expanded (open to begin with)
}) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  // Handles react-native-collapsible's initial rendering when starting expanded
  const [isInitialized, setIsInitialized] = useState(initialCollapsed); 

  useEffect(() => {
    if (!initialCollapsed && !isInitialized) {
      // If starting expanded and not yet initialized
      const timer = setTimeout(() => {
        setIsInitialized(true);
      }, 50); // Small delay to allow layout calculation
      return () => clearTimeout(timer);
    }
  }, [initialCollapsed, isInitialized]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (!isInitialized) {
      setIsInitialized(true); // Mark as initialized on first toggle if it started expanded
    }
  };

  // SVG points upwards by default.
  // Expanded (initial state): Rotated 45 degrees to the right.
  // Collapsed: Rotated an additional 180 degrees from its expanded state.
  const rotationAnim = useRef(new Animated.Value(isCollapsed ? 1 : 0)).current; // 0 for expanded, 1 for collapsed

  useEffect(() => {
    Animated.spring(rotationAnim, {
      toValue: isCollapsed ? 1 : 0,
      useNativeDriver: true,
      bounciness: 5,
    }).start();
  }, [isCollapsed, rotationAnim]);

  const interpolatedRotate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '225deg'], // 45deg when expanded, 225deg when collapsed
  });

  return (
    <View className="mb-4 mt-2">
      <Pressable onPress={toggleCollapse}>
        <View className="flex-row items-center justify-between">
          <AppText variant="h2" weight="medium">{header}</AppText>
          <Animated.View 
            className="w-10 h-10 bg-white rounded-full items-center justify-center"
            style={{ transform: [{ rotate: interpolatedRotate }] }}
          >
            <ArrowIcon width={14} height={14} color="black" /> 
          </Animated.View>
        </View>
      </Pressable>
      {/* 
        If not initialized and meant to start expanded, it's briefly collapsed.
        The useEffect then sets isInitialized, triggering a re-render to expand it.
      */}
      <Collapsible collapsed={!isInitialized ? true : isCollapsed} duration={300}>
        <View className='pt-4'>
          {children}
        </View>
      </Collapsible>
    </View>
  );
};

export default CustomCollapsible;