import ArrowIcon from '@/assets/icons/arrow.svg';
import '@/global.css';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, View } from 'react-native';
import { AppText } from './AppText';
import GlassPanel from './GlassPanel';

interface AnimatedArrowProps {
  isActive: boolean;
}

const AnimatedArrow: React.FC<AnimatedArrowProps> = ({ isActive }) => {
  const rotationAnim = useRef(new Animated.Value(isActive ? 0 : 1)).current; // 0 = 0deg, 1 = 180deg

  useEffect(() => {
    Animated.spring(rotationAnim, {
      toValue: isActive ? 0 : 1,
      useNativeDriver: true,
      bounciness: 5,
    }).start();
  }, [isActive]);

  const interpolatedRotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View
      className="w-10 h-10 bg-gray-300 rounded-full items-center justify-center"
      style={{ transform: [{ rotate: interpolatedRotation }] }}
    >
      <ArrowIcon />
    </Animated.View>
  );
};

export type GlassTabViewProps = {
  tabs: {
    key: string;
    title: string;
    content: React.ReactNode;
  }[];
  initialTabIndex?: number;
  onTabChange?: (index: number) => void;
};

export const GlassTabView: React.FC<GlassTabViewProps> = ({
  tabs,
  initialTabIndex = 0,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(initialTabIndex);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <View>
      {/* Tab Headers */}
      <View className='flex-row w-full justify-center mt-4'>
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          
          return (
            <View 
              key={tab.key}
              style={{ 
                width: `${100 / tabs.length}%`,
              }}
            >
              <Pressable
                onPress={() => handleTabPress(index)}
                style={{ width: '100%' }}
              >
                <GlassPanel
                  rounded={'full'}
                  hasBorder={false}
                  style={{
                    padding: 16,
                    marginBottom: isActive ? 0 : 16,
                    paddingBottom: isActive ? 32 : 16,
                    marginLeft: index === 0 ? 0 : 8,
                    marginRight: index === 1 ? 0 : 8,
                    borderTopLeftRadius: isActive ? 24 : undefined,
                    borderTopRightRadius: isActive ? 24 : undefined,
                    borderBottomLeftRadius: isActive ? 0 : undefined,
                    borderBottomRightRadius: isActive ? 0 : undefined,
                  }}
                >
                  <View className="flex flex-row items-center justify-between">
                    <AppText
                      variant="h4"
                      weight="regular"
                      style={{
                        textAlign: 'center',
                        color: '#000000'
                      }}
                    >
                      {tab.title}
                    </AppText>
                    <AnimatedArrow isActive={isActive} />
                    
                  </View>
                </GlassPanel>
              </Pressable>

            </View>
          );
        })}
      </View>

      {/* Tab Content */}
      <View className='relative z-10'>
        {/* Custom curved corners for content container */}
        <View className='absolute h-4 z-10'>
          {tabs.map((tab, index) => {
            const isActive = index === activeTab;
            
            // Only render curved corners for non-active tabs
            if (!isActive) {
              const isLeftTab = index < activeTab;
              const isRightTab = index > activeTab;
              
              return (
                <View 
                  key={`corner-${tab.key}`} 
                  style={[
                    {
                      position: 'absolute',
                      top: 0,
                      width: 20,
                      height: 20,
                      backgroundColor: 'transparent',
                      overflow: 'hidden',
                    }
                  ]}
                >
                </View>
              );
            }
            return null;
          })}
        </View>
        
        {/* Content Container */}
        <GlassPanel
          rounded="xl"
          hasBorder={false}
          style={{
            padding: 12,
            borderTopRightRadius: activeTab === 0 ? 24 : 0,
            borderTopLeftRadius: activeTab === tabs.length - 1 ? 24 : 0,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
        >
          {tabs[activeTab].content}
        </GlassPanel>
      </View>
    </View>
  );
};

export default GlassTabView;