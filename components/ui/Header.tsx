import {
  LibreCaslonText_400Regular,
  LibreCaslonText_700Bold,
  useFonts
} from '@expo-google-fonts/libre-caslon-text';
import { Ionicons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
// Import from same directory
import DatePickerModal from '@/components/header/DatePickerModal';
import WeekSlider from '@/components/header/WeekSlider';

type HeaderProps = {
  name?: string;
  showCalendar?: boolean;
};

/**
 * Header component that appears on all screens in the app
 */
const Header: React.FC<HeaderProps> = ({
  name,
  showCalendar = true,
}) => {
  const pathname = usePathname();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  
  // Mock completion data - in a real app, this would come from your data source
  const [completionData] = useState<{[key: string]: number}>({
    // Some sample data for the current week
    '2025-05-26': 110,
    '2025-05-27': 50,
    '2025-05-28': 75,
    '2025-05-29': 100,
    '2025-05-23': 200,
    '2025-05-24': 0,
    '2025-05-25': 45,
  });
  
  // Load Libre Caslon Text font
  const [fontsLoaded] = useFonts({
    LibreCaslonText_400Regular,
    LibreCaslonText_700Bold,
  });
  
  // Generate appropriate title based on path or name
  const getTitle = () => {

    if (name && (pathname == '/' || pathname == '/index')) return `Hi, ${name}`;
    
    if (pathname === '/' || pathname === '/index') return 'Home';
    const routeName = pathname.split('/').pop();
    if (!routeName) return 'Nura';
    
    // Convert route name to title case (e.g., 'nutrition' -> 'Nutrition')
    return routeName.charAt(0).toUpperCase() + routeName.slice(1);
  };
  
  // Format the month and year
  const getFormattedMonthYear = () => {
    const month = selectedDate.toLocaleString('default', { month: 'short' });
    return `${month} ${selectedDate.getFullYear()}`;
  };
  
  // Handle date change from WeekSlider
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  
  // Show date picker modal
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  
  // Hide date picker modal
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  
  // Handle date selection from the picker
  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  
  if (!fontsLoaded) {
    return null; // Or return a loading placeholder
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContent}>
        {/* Title and Calendar row */}
        <View style={[styles.titleContainer, showCalendar && styles.titleContainerWithCalendar]}>
          <Text style={styles.title}>{getTitle()}</Text>
          
          {showCalendar && (
            <Pressable onPress={showDatePicker} style={styles.dateContainer}>
              <Text style={styles.dateText}>{getFormattedMonthYear()}</Text>
              <View style={styles.calendarButton}>
                <Ionicons name="calendar-outline" size={24} color="#000" />
              </View>
            </Pressable>
          )}
        </View>
      </View>
      
      {/* Week slider (only show on screens that need the calendar) */}
      {showCalendar && (
        <WeekSlider
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          completionData={completionData}
        />
      )}
      
      {/* Date picker modal */}
      <DatePickerModal
        isVisible={isDatePickerVisible}
        onClose={hideDatePicker}
        onDateSelected={handleDateSelection}
        initialDate={selectedDate}
        completionData={completionData}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginTop: 8,
  },
  titleContainerWithCalendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: '#000',
    fontFamily: 'LibreCaslonText_700Bold',
    letterSpacing: -0.5,
  },
  dateContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
  },
  calendarButton: {
    marginTop: 12,
  },
});

export default Header;
