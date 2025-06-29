import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, useWindowDimensions, View, ViewStyle } from 'react-native';

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
    ovalHeightClass,
    ovalWidthClass,
    ovalWidthPx,
    gap,
  } = useMemo(() => {
    // Define sizes based on screen width breakpoints
    if (screenWidth < 400) {
      // Smaller ovals for smaller screens
      return {
        ovalHeightClass: 'h-[14px]',
        ovalWidthClass: 'w-[8px]',
        ovalWidthPx: 8,
        gap: 2, // Replaces 'mx-[1px]'
      };
    } else {
      // Larger ovals for larger screens
      return {
        ovalHeightClass: 'h-[16px]',
        ovalWidthClass: 'w-[10px]',
        ovalWidthPx: 10,
        gap: 2.6, // Replaces 'mx-[1.3px]'
      };
    }
  }, [screenWidth]);

  const determinedFilledColorClass = useMemo(() => {
    if (progressPercent <= 33) return 'bg-red-400';
    if (progressPercent <= 66) return 'bg-yellow-400';
    return 'bg-green-400';
  }, [progressPercent]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const newWidth = event.nativeEvent.layout.width;
    if (newWidth !== containerWidth) {
      setContainerWidth(newWidth);
    }
  };

  const { numberOfOvals, numberOfFilledOvals } = useMemo(() => {
    if (containerWidth === null || containerWidth <= 0 || (ovalWidthPx + gap) <= 0) {
      return { numberOfOvals: 0, numberOfFilledOvals: 0 };
    }
    // Calculate the number of ovals that can fit in the container width with the given gap
    // Formula: N = floor((W + g) / (w + g))
    const maxOvals = Math.max(0, Math.floor((containerWidth + gap) / (ovalWidthPx + gap)));
    const filledCount = Math.min(maxOvals, Math.max(0, Math.round((progressPercent / 100) * maxOvals)));
    return { numberOfOvals: maxOvals, numberOfFilledOvals: filledCount };
  }, [containerWidth, progressPercent, ovalWidthPx, gap]);

  // If containerWidth is null, render a view that will trigger onLayout.
  // This view should be styled to take up the space it's supposed to fill.
  // minHeight ensures it's visible and layout can be calculated.
  if (containerWidth === null) {
    return <View onLayout={handleLayout} style={[{ flex: 1, minHeight: 20 }, style]} />;
  }

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap }, style]} onLayout={handleLayout}>
      {Array.from({ length: numberOfOvals }).map((_, index) => {
        const isFilled = index < numberOfFilledOvals;
        return (
          <View
            key={index}
            className={`rounded-full ${ovalHeightClass} ${ovalWidthClass} ${isFilled ? determinedFilledColorClass : emptyColorClass}`}
          />
        );
      })}
    </View>
  );
};

export default DynamicOvalProgressBar;
