import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
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
  // Keep track of multiple weeks of dates (for pager view)
  const [weekPages, setWeekPages] = useState<Date[][]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Start with middle page (current week)
  const pagerRef = useRef<PagerView>(null);
  
  // Total number of pages to show (past, current, future)
  const TOTAL_PAGES = 3;
  
  // Generate week dates for each page
  useEffect(() => {
    const weekPagesData: Date[][] = [];
    
    // Generate 3 pages: previous week, current week, next week
    for (let pageOffset = -1; pageOffset <= 1; pageOffset++) {
      const dates: Date[] = [];
      const baseDate = new Date(selectedDate);
      
      // Apply the week offset
      baseDate.setDate(baseDate.getDate() + (pageOffset * 7));
      
      const currentDay = baseDate.getDay(); // 0 = Sunday, 6 = Saturday
      
      // Calculate the Sunday of this week
      const sundayDate = new Date(baseDate);
      sundayDate.setDate(baseDate.getDate() - currentDay);
      
      // Generate dates for the entire week
      for (let i = 0; i < 7; i++) {
        const date = new Date(sundayDate);
        date.setDate(sundayDate.getDate() + i);
        dates.push(date);
      }
      
      weekPagesData.push(dates);
    }
    
    setWeekPages(weekPagesData);
    
    // Reset to middle page when selected date changes
    if (pagerRef.current) {
      pagerRef.current.setPage(1);
    }
    setCurrentPage(1);
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
  

  
  // Handle page change
  const handlePageChange = (event: { nativeEvent: { position: number } }) => {
    const newPage = event.nativeEvent.position;
    setCurrentPage(newPage);
    
    // When we reach the first or last page, regenerate pages and reset position
    if (newPage === 0 || newPage === TOTAL_PAGES - 1) {
      // Get the selected week's first day (Sunday)
      const selectedWeek = weekPages[newPage][0];
      
      // Update the selected date with a date from the newly selected week
      // Find the closest day to the previously selected day of week
      const previousDayOfWeek = selectedDate.getDay();
      let targetDate = selectedWeek;
      
      // Find the day in the new week that matches the previously selected day of week
      for (let i = 0; i < 7; i++) {
        if (weekPages[newPage][i].getDay() === previousDayOfWeek) {
          targetDate = weekPages[newPage][i];
          break;
        }
      }
      
      // Make sure the selected date is not in the future
      const now = new Date();
      if (targetDate > now) {
        // Find the latest valid date in this week
        for (let i = 6; i >= 0; i--) {
          if (weekPages[newPage][i] <= now) {
            targetDate = weekPages[newPage][i];
            break;
          }
        }
      }
      
      onDateChange(targetDate);
    }
  };

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={1}
        onPageSelected={handlePageChange}
        pageMargin={10}
      >
        {weekPages.map((weekDates, pageIndex) => (
          <View key={`week-${pageIndex}`} style={styles.pageContainer}>
            <View style={styles.daysContainer}>
              {weekDates.map((date) => {
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
                    disabled={date > new Date()}
                  />
                );
              })}
            </View>
          </View>
        ))}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    height: 80, // Fixed height for the slider
  },
  pagerView: {
    flex: 1,
    height: 80,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default WeekSlider;
