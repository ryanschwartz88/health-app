import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';

// Default Tailwind class for styling
const DEFAULT_EMPTY_COLOR_CLASS = 'bg-gray-300';

interface DynamicOvalProgressBarProps {
  progressPercent: number; // 0-100
  emptyColorClass?: string;
  style?: ViewStyle; // For the container view
}

const DynamicOvalProgressBar: React.FC<DynamicOvalProgressBarProps> = ({
  progressPercent,
  emptyColorClass = DEFAULT_EMPTY_COLOR_CLASS,
  style,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  const {
    barHeightClass,
    barWidthClass,
    barWidthPx,
    gap,
  } = useMemo(() => {
    // Define sizes based on screen width breakpoints
    if (screenWidth < 400) {
      // Smaller bars for smaller screens
      return {
        barHeightClass: 'h-[20px]',
        barWidthClass: 'w-[3px]',
        barWidthPx: 3,
        gap: 3,
      };
    } else {
      // Larger bars for larger screens
      return {
        barHeightClass: 'h-[24px]',
        barWidthClass: 'w-[4px]',
        barWidthPx: 4,
        gap: 3.5,
      };
    }
  }, [screenWidth]);

  const determinedGradientColors = useMemo((): readonly [string, string] => {
    if (progressPercent <= 33) return ['#F87171', '#FCA5A5']; // Red gradient
    if (progressPercent <= 66) return ['#FBBF24', '#FCD34D']; // Yellow gradient
    return ['#34D399', '#6EE7B7']; // Green gradient
  }, [progressPercent]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const newWidth = event.nativeEvent.layout.width;
    if (newWidth !== containerWidth) {
      setContainerWidth(newWidth);
    }
  };

  const { numberOfOvals, numberOfFilledOvals } = useMemo(() => {
    if (containerWidth === null || containerWidth <= 0 || (barWidthPx + gap) <= 0) {
      return { numberOfOvals: 0, numberOfFilledOvals: 0 };
    }
    // Calculate the number of bars that can fit in the container width with the given gap
    const maxOvals = Math.max(0, Math.floor((containerWidth + gap) / (barWidthPx + gap)));
    const filledCount = Math.min(maxOvals, Math.max(0, Math.round((progressPercent / 100) * maxOvals)));
    return { numberOfOvals: maxOvals, numberOfFilledOvals: filledCount };
  }, [containerWidth, progressPercent, barWidthPx, gap]);

  // If containerWidth is null, render a view that will trigger onLayout.
  if (containerWidth === null) {
    return <View onLayout={handleLayout} style={[{ flex: 1, minHeight: 24 }, style]} />;
  }

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap }, style]} onLayout={handleLayout}>
      {Array.from({ length: numberOfOvals }).map((_, index) => {
        const isFilled = index < numberOfFilledOvals;
        if (isFilled) {
          return (
            <View key={index} className={`rounded-full ${barHeightClass} ${barWidthClass} overflow-hidden`}>
              <LinearGradient
                colors={determinedGradientColors}
                style={StyleSheet.absoluteFill}
              />
            </View>
          );
        }
        return (
          <View
            key={index}
            className={`rounded-full ${barHeightClass} ${barWidthClass} ${emptyColorClass}`}
          />
        );
      })}
    </View>
  );
};

export default DynamicOvalProgressBar;
