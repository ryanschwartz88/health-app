import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type DatePickerModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onDateSelected: (date: Date) => void;
  initialDate?: Date;
};

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isVisible,
  onClose,
  onDateSelected,
  initialDate = new Date(),
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

  // useEffect to update the selected date when the modal is opened
  useEffect(() => {
    setSelectedDate(initialDate);
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
      <View style={styles.modalContainer}>
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
                      day !== null && isSelectedDay(day) && styles.selectedDayCell,
                      day !== null && !isDateInRange && styles.disabledDayCell
                    ]}
                    onPress={() => day && isDateInRange && handleDayPress(day)}
                    disabled={day === null || !isDateInRange}
                  >
                    {day && (
                      <Text style={[
                        styles.dayText,
                        isSelectedDay(day) && styles.selectedDayText,
                        !isDateInRange && styles.disabledDayText
                      ]}>
                        {day}
                      </Text>
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
      </View>
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
    borderRadius: 20,
  },
  selectedDayCell: {
    backgroundColor: '#000',
  },
  dayText: {
    fontSize: 16,
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
