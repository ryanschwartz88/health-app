import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type DayCircleProps = {
  dayOfWeek: string; // First letter of day (S, M, T, W, T, F, S)
  dayOfMonth: number; // 1-31
  completionPercentage: number; // 0-100
  isSelected: boolean;
  onPress: () => void;
};

const DayCircle: React.FC<DayCircleProps> = ({
  dayOfWeek,
  dayOfMonth,
  completionPercentage,
  isSelected,
  onPress,
}) => {
  // Calculate circle parameters
  const size = 56;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;
  
  const isComplete = completionPercentage >= 100;
  const circleColor = isComplete ? '#4CAF50' : '#E0E0E0';
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isSelected && styles.selectedContainer
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Day of Week */}
      <Text style={[
        styles.dayOfWeek,
        isSelected && styles.selectedText
      ]}>
        {dayOfWeek}
      </Text>
      
      {/* Day of Month with Progress Circle */}
      <View style={styles.circleContainer}>
        <Svg width={size} height={size} style={styles.svg}>
          {/* Background Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F0F0F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
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
        
        <View style={styles.dayNumberContainer}>
          <Text style={[
            styles.dayNumber,
            isSelected && styles.selectedText
          ]}>
            {dayOfMonth}
          </Text>
          
          {/* Show dot for incomplete days */}
          {!isComplete && !isSelected && (
            <View style={styles.dot} />
          )}
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
    width: 60,
  },
  selectedContainer: {
    backgroundColor: '#000',
    borderRadius: 16,
    paddingVertical: 8,
  },
  dayOfWeek: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#757575',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  circleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    transform: [{ rotate: '-90deg' }],
  },
  dayNumberContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: '#757575',
    borderRadius: 2,
    marginTop: 2,
  },
});

export default DayCircle;
