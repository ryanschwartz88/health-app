import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type DatePickerModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onDateSelected: (date: Date) => void;
  initialDate?: Date;
  completionData?: {[key: string]: number}; // Format: 'YYYY-MM-DD' => percentage
};

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isVisible,
  onClose,
  onDateSelected,
  initialDate = new Date(),
  completionData = {},
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  
  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // useEffect to update the selected date and current month view when the initialDate changes
  useEffect(() => {
    setSelectedDate(initialDate);
    // Also update the current month view to match the initialDate's month
    setCurrentMonth(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  }, [initialDate]);
  
  // Get the minimum selectable date (1 year ago from today)
  const getMinDate = () => {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1);
    return minDate;
  };

  // Get the maximum selectable date (today)
  const getMaxDate = () => {
    return new Date();
  };

  // Check if a month is within the valid range
  const isMonthInRange = (date: Date, direction: 'prev' | 'next') => {
    const minDate = getMinDate();
    const maxDate = getMaxDate();
    
    if (direction === 'prev') {
      // For previous, check if the first day of the month is after or equal to the min date's month
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const firstDayOfMinMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
      return firstDayOfMonth >= firstDayOfMinMonth;
    } else {
      // For next, check if the first day of the month is before or equal to the max date's month
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const firstDayOfMaxMonth = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
      return firstDayOfMonth <= firstDayOfMaxMonth;
    }
  };
  
  // Navigate to previous month if within range
  const goToPreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    
    if (isMonthInRange(previousMonth, 'prev')) {
      setCurrentMonth(previousMonth);
    }
  };
  
  // Navigate to next month if within range
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    if (isMonthInRange(nextMonth, 'next')) {
      setCurrentMonth(nextMonth);
    }
  };
  
  // Check if a date is selectable (between min and max dates)
  const isDateSelectable = (date: Date) => {
    const minDate = getMinDate();
    const maxDate = getMaxDate();
    
    // Set time to midnight for accurate date comparison
    const dateToCheck = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const minDateMidnight = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    const maxDateMidnight = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
    
    return dateToCheck >= minDateMidnight && dateToCheck <= maxDateMidnight;
  };
  
  // Generate days for the current month view
  const generateDays = () => {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    
    // Get the last day of the month (0-6, where 0 is Sunday, 6 is Saturday)
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), daysInMonth).getDay();
    
    const days: (number | null)[] = [];
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    // Add empty cells for days after the end of the month to complete the week
    // If the month ends on Saturday (6), we don't need to add any cells
    // Otherwise, add cells until we reach Saturday
    if (lastDayOfMonth < 6) {
      const emptyCellsNeeded = 6 - lastDayOfMonth;
      for (let i = 0; i < emptyCellsNeeded; i++) {
        days.push(null);
      }
    }
    
    return days;
  };
  
  // Check if a day is selected
  const isSelectedDay = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };
  
  // Handle day selection
  const handleDayPress = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
  };
  
  // Confirm selection
  const confirmSelection = () => {
    onDateSelected(selectedDate);
    onClose();
  };
  
  const days = generateDays();
  
  // Check if we can navigate to previous or next month
  const canGoToPreviousMonth = isMonthInRange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1), 'prev');
  const canGoToNextMonth = isMonthInRange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1), 'next');
  
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <View style={styles.panel}>
                {/* Header */}
                <View style={styles.header}>
                  <Text style={styles.title}>Select Date</Text>
                  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
                
                {/* Month navigation */}
                <View style={styles.monthNavigation}>
                  <TouchableOpacity 
                    onPress={canGoToPreviousMonth ? goToPreviousMonth : undefined} 
                    style={styles.navButton}
                    disabled={!canGoToPreviousMonth}
                  >
                    <Ionicons name="chevron-back" size={24} color={canGoToPreviousMonth ? "#000" : "#ccc"} />
                  </TouchableOpacity>
                  
                  <Text style={styles.monthYearText}>
                    {`${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}
                  </Text>
                  
                  <TouchableOpacity 
                    onPress={canGoToNextMonth ? goToNextMonth : undefined} 
                    style={styles.navButton}
                    disabled={!canGoToNextMonth}
                  >
                    <Ionicons name="chevron-forward" size={24} color={canGoToNextMonth ? "#000" : "#ccc"} />
                  </TouchableOpacity>
                </View>
                
                {/* Day names */}
                <View style={styles.dayNamesContainer}>
                  {dayNames.map(day => (
                    <Text key={day} style={styles.dayName}>{day}</Text>
                  ))}
                </View>
                
                {/* Calendar grid */}
                <View style={styles.calendarGrid}>
                  {days.map((day, index) => {
                    // Determine if this date is selectable (if it's in the valid range)
                    const isDateInRange = day !== null ? isDateSelectable(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)) : false;
                    
                    return (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.dayCell,
                          day !== null && isDateInRange && styles.dayCellWithCircle,
                          day !== null && isSelectedDay(day) && styles.selectedDayCell,
                          day !== null && !isDateInRange && styles.disabledDayCell
                        ]}
                        onPress={() => day && isDateInRange && handleDayPress(day)}
                        disabled={day === null || !isDateInRange}
                      >
                        {day && (
                          <View style={styles.dayCircleContainer}>
                            {/* Only render SVG progress circle if the date is in range */}
                            {isDateInRange && (
                              <Svg width={40} height={40} style={styles.svg}>
                                {/* Progress Circle */}
                                {(() => {
                                  // Calculate circle parameters
                                  const size = 40;
                                  const strokeWidth = 5; // Thicker circle
                                  const radius = (size - strokeWidth) / 2;
                                  const circumference = 2 * Math.PI * radius;
                                  
                                  // Get completion percentage for this date
                                  const dateKey = day ? new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0] : '';
                                  const completionPercentage = completionData[dateKey] || 0;
                                  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;
                                  
                                  // Determine circle color based on completion and selection
                                  const isComplete = completionPercentage >= 100;
                                  const circleColor = isComplete ? '#62DB43' : '#BBBBBB';
                                  
                                  // Just draw the progress circle if needed
                                  return (
                                    <>
                                      {/* Progress circle (only shown if there's completion data) */}
                                      {completionPercentage > 0 && (
                                        <Circle
                                          cx={size / 2}
                                          cy={size / 2}
                                          r={radius}
                                          stroke={circleColor}
                                          strokeWidth={strokeWidth}
                                          fill="transparent"
                                          strokeDasharray={circumference}
                                          // If 100% or more, show full circle without offset
                                          strokeDashoffset={completionPercentage >= 100 ? 0 : strokeDashoffset}
                                          strokeLinecap="round"
                                          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
                                        />
                                      )}
                                    </>
                                  );
                                })()}
                              </Svg>
                            )}
                            
                            <View style={[
                              styles.dayCircle,
                              isSelectedDay(day) && styles.selectedDayCircle,
                              !isDateInRange && styles.disabledDayCircle
                            ]}>
                              <Text style={[
                                styles.dayText,
                                !isDateInRange && styles.disabledDayText
                              ]}>
                                {day}
                              </Text>
                            </View>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
                
                {/* Action buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={[styles.button, styles.cancelButton]} 
                    onPress={onClose}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.button, styles.confirmButton]} 
                    onPress={confirmSelection}
                  >
                    <Text style={[styles.buttonText, styles.confirmButtonText]}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  panel: {
    padding: 20,
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    padding: 8,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '500',
  },
  dayNamesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayName: {
    width: 40,
    textAlign: 'center',
    fontWeight: '500',
    color: '#757575',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dayCell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  dayCellWithCircle: {
    // No specific styling needed here, just a marker for cells with days
  },
  selectedDayCell: {
    // Cell background color removed, now using circle
  },
  dayCircleContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  dayCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    backgroundColor: 'transparent',
  },
  selectedDayCircle: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  disabledDayCircle: {
    opacity: 0.5,
  },
  dayText: {
    fontSize: 16,
    zIndex: 3,
  },
  selectedDayText: {
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  confirmButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    fontWeight: '500',
  },
  confirmButtonText: {
    color: '#fff',
  },
  disabledDayCell: {
    opacity: 0.5,
  },
  disabledDayText: {
    color: '#ccc',
  },
});

export default DatePickerModal;
