import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';

// Pixel equivalents for default oval styling. Assuming 1rem = 16px for Tailwind.
const OVAL_WIDTH_PX = 10; // Corresponds to 'w-2.5' (0.625rem)
const OVAL_MARGIN_HORIZONTAL_PX = 1; // Each side, for a 3px total gap between ovals
const SINGLE_OVAL_EFFECTIVE_WIDTH_PX = OVAL_WIDTH_PX + (OVAL_MARGIN_HORIZONTAL_PX * 2);

// Default Tailwind classes for styling
const DEFAULT_EMPTY_COLOR_CLASS = 'bg-gray-300';
const OVAL_HEIGHT_CLASS = 'h-4'; // 1rem = 16px
const OVAL_WIDTH_CLASS = 'w-2.5';
const OVAL_MARGIN_CLASS = 'mx-[1px]'; // Arbitrary value for 1.5px margin on left/right

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
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

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
    if (containerWidth === null || containerWidth <= 0) {
      return { numberOfOvals: 0, numberOfFilledOvals: 0 };
    }
    const maxOvals = Math.max(0, Math.floor(containerWidth / SINGLE_OVAL_EFFECTIVE_WIDTH_PX ));
    const filledCount = Math.min(maxOvals, Math.max(0, Math.round((progressPercent / 100) * maxOvals)));
    return { numberOfOvals: maxOvals, numberOfFilledOvals: filledCount };
  }, [containerWidth, progressPercent]);

  // If containerWidth is null, render a view that will trigger onLayout.
  // This view should be styled to take up the space it's supposed to fill.
  // minHeight ensures it's visible and layout can be calculated.
  if (containerWidth === null) {
    return <View style={[{ flex: 1, minHeight: 16 /* Approx oval height from h-4 */ }, style]} onLayout={handleLayout} />;
  }

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]} onLayout={handleLayout}>
      {Array.from({ length: numberOfOvals }).map((_, index) => (
        <View
          key={index}
          // className is a prop specific to NativeWind for Tailwind CSS class strings
          className={`${OVAL_HEIGHT_CLASS} ${OVAL_WIDTH_CLASS} rounded-full ${OVAL_MARGIN_CLASS} ${
            index < numberOfFilledOvals ? determinedFilledColorClass : emptyColorClass
          }`}
        />
      ))}
    </View>
  );
};

export default DynamicOvalProgressBar;
