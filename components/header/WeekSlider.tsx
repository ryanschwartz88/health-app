import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DayCircle from './DayCircle';

type WeekSliderProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  completionData?: {[key: string]: number}; // Format: 'YYYY-MM-DD' => percentage
};

const WeekSlider: React.FC<WeekSliderProps> = ({
  selectedDate,
  onDateChange,
  completionData = {},
}) => {
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  
  // Get the week dates (Sunday to Saturday) for the selected date
  useEffect(() => {
    const dates: Date[] = [];
    const currentDay = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Calculate the date of the Sunday of this week
    const sundayDate = new Date(selectedDate);
    sundayDate.setDate(selectedDate.getDate() - currentDay);
    
    // Generate dates for the entire week
    for (let i = 0; i < 7; i++) {
      const date = new Date(sundayDate);
      date.setDate(sundayDate.getDate() + i);
      dates.push(date);
    }
    
    setWeekDates(dates);
  }, [selectedDate]);
  
  // Format date as YYYY-MM-DD for completion data lookup
  const formatDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
  
  // Day of week abbreviations
  const dayAbbreviations = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {weekDates.map((date, index) => {
          const dateKey = formatDateKey(date);
          const completionPercentage = completionData[dateKey] || 0;
          const isSelected = isSameDay(date, selectedDate);
          
          return (
            <DayCircle
              key={dateKey}
              dayOfWeek={dayAbbreviations[date.getDay()]}
              dayOfMonth={date.getDate()}
              completionPercentage={completionPercentage}
              isSelected={isSelected}
              onPress={() => onDateChange(date)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
});

export default WeekSlider;
