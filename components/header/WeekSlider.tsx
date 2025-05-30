import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import DayCircle from './DayCircle';

type WeekSliderProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  completionData?: {[key: string]: number}; // Format: 'YYYY-MM-DD' => percentage
};

// Constants
const WEEKS_TO_RENDER = 7; // Render 7 weeks at once (3 before, current, 3 after)
const MIDDLE_WEEK_INDEX = Math.floor(WEEKS_TO_RENDER / 2); // Index of the middle week (3)

const WeekSlider: React.FC<WeekSliderProps> = ({
  selectedDate,
  onDateChange,
  completionData = {},
}) => {
  // Track the visible week index (0-6)
  const [visibleWeekIndex, setVisibleWeekIndex] = useState<number>(MIDDLE_WEEK_INDEX);
  
  // Track the reference date (middle of our date range)
  const [referenceDate, setReferenceDate] = useState<Date>(new Date(selectedDate));
  
  // Reference to the pager view
  const pagerRef = useRef<PagerView>(null);
  
  // Day of week abbreviations
  const dayAbbreviations = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Check if two dates are the same day
  const isSameDay = useCallback((date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }, []);
  
  // Format date as YYYY-MM-DD for completion data lookup
  const formatDateKey = useCallback((date: Date): string => {
    return date.toISOString().split('T')[0];
  }, []);
  
  // Get current date to determine if we're in the current week
  const today = useMemo(() => new Date(), []);
  
  // Check if a date is in the future
  const isDateInFuture = useCallback((date: Date): boolean => {
    const now = new Date(today);
    now.setHours(0, 0, 0, 0);
    const testDate = new Date(date);
    testDate.setHours(0, 0, 0, 0);
    return testDate > now;
  }, [today]);

  // Calculate all week dates based on the reference date
  // This will only recalculate when referenceDate changes, not on every render
  const allWeekDates = useMemo(() => {
    const weeks: Date[][] = [];
    
    // Generate weeks centered around the reference date
    for (let offset = -MIDDLE_WEEK_INDEX; offset <= MIDDLE_WEEK_INDEX; offset++) {
      const weekDates: Date[] = [];
      const baseDate = new Date(referenceDate);
      
      // Offset by the week
      baseDate.setDate(baseDate.getDate() + (offset * 7));
      
      // Find Sunday of this week
      const dayOfWeek = baseDate.getDay();
      const sundayDate = new Date(baseDate);
      sundayDate.setDate(baseDate.getDate() - dayOfWeek);
      
      // Generate all days in the week
      for (let i = 0; i < 7; i++) {
        const date = new Date(sundayDate);
        date.setDate(sundayDate.getDate() + i);
        weekDates.push(date);
      }
      
      weeks.push(weekDates);
    }
    
    return weeks;
  }, [referenceDate]);
  
  // Find the current week's index
  const currentWeekIndex = useMemo(() => {
    const now = new Date(today);
    for (let i = 0; i < allWeekDates.length; i++) {
      const weekDates = allWeekDates[i];
      if (!weekDates || weekDates.length === 0) continue;
      
      // Check if this week contains today
      for (let j = 0; j < weekDates.length; j++) {
        if (isSameDay(weekDates[j], now)) {
          return i;
        }
      }
    }
    return MIDDLE_WEEK_INDEX; // Default to middle if not found
  }, [allWeekDates, today, isSameDay]);
  
  // Handle page selection
  const handlePageChange = useCallback((event: any) => {
    const newPageIndex = event.nativeEvent.position;
    
    // Prevent scrolling into the future weeks
    if (newPageIndex > currentWeekIndex) {
      // Reset back to the current week
      if (pagerRef.current) {
        setTimeout(() => {
          pagerRef.current?.setPageWithoutAnimation(currentWeekIndex);
        }, 0);
      }
      return;
    }
    
    setVisibleWeekIndex(newPageIndex);
    
    // Update the selected date to match the displayed week
    const weekDates = allWeekDates[newPageIndex];
    if (!weekDates || weekDates.length === 0) return;
    
    // Find a matching day of week to the currently selected date
    const selectedDayOfWeek = selectedDate.getDay();
    let targetDate = weekDates[0]; // Default to first day
    
    for (let i = 0; i < weekDates.length; i++) {
      if (weekDates[i].getDay() === selectedDayOfWeek) {
        targetDate = weekDates[i];
        break;
      }
    }
    
    // Make sure we're not selecting a future date
    const now = new Date();
    if (targetDate > now) {
      for (let i = weekDates.length - 1; i >= 0; i--) {
        if (weekDates[i] <= now) {
          targetDate = weekDates[i];
          break;
        }
      }
    }
    
    // Update the selected date
    onDateChange(targetDate);
    
    // If we're at an edge page, shift the reference date and reset to middle
    if (newPageIndex === 0) {
      // Update our reference date to center around the new target date
      setReferenceDate(new Date(targetDate));
      
      // Reset to the middle page without animation
      if (pagerRef.current) {
        // Short delay to avoid visual glitches
        setTimeout(() => {
          pagerRef.current?.setPageWithoutAnimation(Math.min(MIDDLE_WEEK_INDEX, currentWeekIndex));
          setVisibleWeekIndex(Math.min(MIDDLE_WEEK_INDEX, currentWeekIndex));
        }, 10);
      }
    }
  }, [allWeekDates, currentWeekIndex, selectedDate, onDateChange]);
  
  // Render a single week
  const renderWeek = useCallback((weekDates: Date[], weekIndex: number) => {
    return (
      <View key={`week-${weekIndex}`} style={styles.pageContainer}>
        <View style={styles.daysContainer}>
          {weekDates.map((date, dayIndex) => {
            const dateKey = formatDateKey(date);
            const completionPercentage = completionData[dateKey] || 0;
            const isSelected = isSameDay(date, selectedDate);
            const dayOfWeekIndex = date.getDay();
            
            return (
              <DayCircle
                key={`${weekIndex}-${dayIndex}`}
                dayOfWeek={dayAbbreviations[dayOfWeekIndex]}
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
    );
  }, [dayAbbreviations, completionData, formatDateKey, isSameDay, selectedDate, onDateChange]);
  
  // When the selected date changes from the parent, update our reference date
  // This ensures our week view is centered correctly
  useMemo(() => {
    setReferenceDate(new Date(selectedDate));
    if (pagerRef.current && visibleWeekIndex !== MIDDLE_WEEK_INDEX) {
      pagerRef.current.setPageWithoutAnimation(MIDDLE_WEEK_INDEX);
      setVisibleWeekIndex(MIDDLE_WEEK_INDEX);
    }
  }, [selectedDate]);
  
  // Memoize the pages to prevent unnecessary re-rendering when scrolling
  const weekPages = useMemo(() => 
    allWeekDates.map((weekDates, index) => renderWeek(weekDates, index)),
    [allWeekDates, renderWeek]
  );

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={MIDDLE_WEEK_INDEX}
        onPageSelected={handlePageChange}
        pageMargin={0}
      >
        {weekPages}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
  },
  pagerView: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default WeekSlider;