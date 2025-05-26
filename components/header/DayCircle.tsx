import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

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
  chosenSize = 42,
  disabled = false,
}) => {
  // Calculate circle parameters
  const size = chosenSize;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;
  
  const isComplete = completionPercentage >= 100;
  const circleColor = isComplete ? '#62DB43' : '#BBBBBB';
  
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
        { width: chosenWidth},
      ]} 
      onPress={handlePress}
      activeOpacity={disabled ? 1 : 0.8}
      disabled={disabled}
    >
      {/* Day of Week */}
      <Text style={[
        styles.dayOfWeek,
        isSelected && !disabled && styles.selectedText,
        disabled && styles.disabledText
      ]}>
        {dayOfWeek}
      </Text>
      
      {/* Day of Month with Progress Circle */}
      <View style={[styles.circleContainer, isSelected && { backgroundColor: 'rgb(217, 217, 217)' }]}>
        {/* Only render SVG if not disabled */}
        {!disabled && (
          <Svg width={size} height={size} style={styles.svg}>
            {/* Progress Circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={circleColor}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90, ${size / 2}, ${size / 2})`}
            />
          </Svg>
        )}
        
        <View style={styles.dayNumberContainer}>
          <Text style={[
            styles.dayNumber,
            disabled && styles.disabledText
          ]}>
            {dayOfMonth}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    height: 85, // Fixed height for all day circles
  },
  selectedContainer: {
    backgroundColor: '#000',
    borderRadius: 16,
  },
  disabledContainer: {
    opacity: 1,
  },
  dayOfWeek: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#000',
    height: 20, // Fixed height for the day text
  },
  selectedText: {
    color: '#FFFFFF',
  },
  disabledText: {
    color: '#ccc',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    height: 48, // Fixed height matching chosenSize default
    width: 48, // Fixed width matching chosenSize default
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
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  }
});

export default DayCircle;
