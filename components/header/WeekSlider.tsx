import React, { useCallback, useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import DayCircle from './DayCircle';

type WeekSliderProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  completionData?: {[key: string]: number}; // Format: 'YYYY-MM-DD' => percentage
  onWeekChange?: (startDate: Date, endDate: Date) => void; // Callback for when week changes to fetch completion data
};

const deviceWidth = Dimensions.get('window').width;

const WeekSlider: React.FC<WeekSliderProps> = ({
  selectedDate,
  onDateChange,
  completionData = {},
  onWeekChange,
}) => {
  // Day of week abbreviations
  const dayAbbreviations = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Get current date to determine what is "today"
  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);
  
  // Helper functions
  const isSameDay = useCallback((date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }, []);
  
  const formatDateKey = useCallback((date: Date): string => {
    // Use local date parts to avoid timezone issues
    const year = date.getFullYear();
    // Month is 0-indexed, so add 1 and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);
  
  // Calculate the dates for the week containing the selected date
  const currentWeekDates = useMemo(() => {
    // Find the Sunday of the week containing the selected date
    const dateCopy = new Date(selectedDate);
    const dayOfWeek = dateCopy.getDay();
    dateCopy.setDate(dateCopy.getDate() - dayOfWeek); // Go back to Sunday
    
    // Generate all days in the week
    const weekDates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      // Create a new date and add the days properly
      const date = new Date(dateCopy.getFullYear(), dateCopy.getMonth(), dateCopy.getDate() + i);
      weekDates.push(date);
    }
    
    return weekDates;
  }, [selectedDate]);
  
  // Notify parent about date range when the component mounts
  useEffect(() => {
    if (onWeekChange && currentWeekDates.length > 0) {
      onWeekChange(currentWeekDates[0], currentWeekDates[6]);
    }
  }, [onWeekChange, currentWeekDates]);
  
  // Render the week with memoization to prevent unnecessary re-renders
  const renderedWeek = useMemo(() => {
    return currentWeekDates.map((date, index) => {
      const dateKey = formatDateKey(date);
      const completionPercentage = completionData[dateKey] || 0;
      const isSelected = isSameDay(date, selectedDate);
      const dayOfWeekIndex = date.getDay();
      const isDisabled = date > today;
      
      return (
        <DayCircle
          key={`day-${index}`}
          dayOfWeek={dayAbbreviations[dayOfWeekIndex]}
          dayOfMonth={date.getDate()}
          completionPercentage={completionPercentage}
          isSelected={isSelected}
          onPress={() => onDateChange(date)}
          disabled={isDisabled}
          chosenWidth={deviceWidth / 7.1}
          chosenSize={42}
        />
      );
    });
  }, [currentWeekDates, formatDateKey, completionData, selectedDate, isSameDay, today, dayAbbreviations, onDateChange]);
  
  return (
    <View style={styles.container}>
      <View style={styles.weekContainer}>
        {renderedWeek}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
  },
  weekContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default WeekSlider;