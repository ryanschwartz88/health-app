import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { AppText } from '../ui/AppText';

type DayCircleProps = {
  dayOfWeek: string; // First letter of day (S, M, T, W, T, F, S)
  dayOfMonth: number; // 1-31
  completionPercentage: number; // 0-100
  isSelected: boolean;
  onPress: () => void;
  chosenWidth?: number;
  chosenSize?: number;
  disabled?: boolean;
};

const deviceWidth = Dimensions.get('window').width;

const DayCircle: React.FC<DayCircleProps> = ({
  dayOfWeek,
  dayOfMonth,
  completionPercentage,
  isSelected,
  onPress,
  chosenWidth = deviceWidth / 7,
  disabled = false,
}) => {
  // Calculate SVG properties based on chosenWidth
  const circleSize = chosenWidth * 0.75;
  const size = circleSize; // SVG size
  const radius = (size / 2) * 0.8; // 80% of half the size
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 5; // Scale stroke width with container
  
  // Change color at 80%, but keep filling until 100%
  const isFullyComplete = completionPercentage >= 100;
  const strokeDashoffset = isFullyComplete ? 0 : circumference - (completionPercentage / 100) * circumference;
  
  const circleColor = completionPercentage >= 80 ? '#62DB43' : '#BBBBBB';
  
  // Handle touchable press when not disabled
  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isSelected && !disabled && styles.selectedContainer,
        disabled && styles.disabledContainer,
        { width: chosenWidth, height: chosenWidth * 1.45 },
      ]} 
      onPress={handlePress}
      activeOpacity={disabled ? 1 : 0.8}
      disabled={disabled}
    >
      {/* Day of Week */}
      <AppText variant="body2" weight="medium" style={[
        isSelected && !disabled && styles.selectedText,
        disabled && styles.disabledText
      ]}>
        {dayOfWeek}
      </AppText>
      
      {/* Day of Month with Progress Circle */}
      <View style={[styles.circleContainer, isSelected && { backgroundColor: 'rgb(217, 217, 217)' }, { width: chosenWidth * 0.75, height: chosenWidth * 0.75 }]}>
        {/* Only render SVG if not disabled */}
        {!disabled && (
          <Svg width={circleSize} height={circleSize} style={styles.svg}>
            {/* Progress Circle */}
            <Circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius}
              stroke={circleColor}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90, ${circleSize / 2}, ${circleSize / 2})`}
            />
          </Svg>
        )}
        
        <View style={styles.dayNumberContainer}>
          <AppText variant="body1" weight="regular" style={[
            styles.dayNumber,
            disabled && styles.disabledText
          ]}>
            {dayOfMonth}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    gap: 4,
  },
  selectedContainer: {
    backgroundColor: '#000',
    borderRadius: 20,
  },
  disabledContainer: {
    opacity: 1,
  },
  selectedText: {
    color: '#FFFFFF',
  },
  disabledText: {
    color: '#A0A0A0', // A darker, more visible gray
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  svg: {
    position: 'absolute',
  },
  dayNumberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  dayNumber: {
    color: '#000',
  }
});

export default DayCircle;
