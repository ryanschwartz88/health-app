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
    ovalMarginClass,
    singleOvalEffectiveWidthPx,
  } = useMemo(() => {
    // Define sizes based on screen width breakpoints
    if (screenWidth < 400) {
      // Smaller ovals for smaller screens
      const ovalWidthPx = 8;
      const ovalMarginHorizontalPx = 1;
      return {
        ovalHeightClass: 'h-[14px]',
        ovalWidthClass: 'w-[8px]',
        ovalMarginClass: 'mx-[1px]',
        singleOvalEffectiveWidthPx: ovalWidthPx + (ovalMarginHorizontalPx * 2),
      };
    } else {
      // Larger ovals for larger screens
      const ovalWidthPx = 10;
      const ovalMarginHorizontalPx = 1.3;
      return {
        ovalHeightClass: 'h-[16px]',
        ovalWidthClass: 'w-[10px]',
        ovalMarginClass: 'mx-[1.3px]',
        singleOvalEffectiveWidthPx: ovalWidthPx + (ovalMarginHorizontalPx * 2),
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
    if (containerWidth === null || containerWidth <= 0 || singleOvalEffectiveWidthPx <= 0) {
      return { numberOfOvals: 0, numberOfFilledOvals: 0 };
    }
    const maxOvals = Math.max(0, Math.floor(containerWidth / singleOvalEffectiveWidthPx));
    const filledCount = Math.min(maxOvals, Math.max(0, Math.round((progressPercent / 100) * maxOvals)));
    return { numberOfOvals: maxOvals, numberOfFilledOvals: filledCount };
  }, [containerWidth, progressPercent, singleOvalEffectiveWidthPx]);

  // If containerWidth is null, render a view that will trigger onLayout.
  // This view should be styled to take up the space it's supposed to fill.
  // minHeight ensures it's visible and layout can be calculated.
  if (containerWidth === null) {
    return <View onLayout={handleLayout} style={[{ flex: 1, minHeight: 20 }, style]} />;
  }

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }, style]} onLayout={handleLayout}>
      {Array.from({ length: numberOfOvals }).map((_, index) => {
        const isFilled = index < numberOfFilledOvals;
        return (
          <View
            key={index}
            className={`rounded-full ${ovalHeightClass} ${ovalWidthClass} ${ovalMarginClass} ${isFilled ? determinedFilledColorClass : emptyColorClass}`}
          />
        );
      })}
    </View>
  );
};

export default DynamicOvalProgressBar;
