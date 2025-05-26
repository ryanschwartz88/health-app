import BottomNav from '@/components/ui/BottomNav';
import Header from '@/components/ui/Header';
import { Slot, usePathname } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function TabsLayout() {
  // Handle the plus button press
  const handlePlusButtonPress = () => {
    // You can implement the action for the plus button here
    // For example, open a modal or navigate to a specific screen
    console.log('Plus button pressed');
  };

  let showCalendar = true;
  const pathname = usePathname();
  if (pathname === '/profile') {
    showCalendar = false;
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <ScrollView style={styles.container}>
        <Header name="Ryan" showCalendar={showCalendar} />
      
        {/* Main content area */}
        <Slot />
      </ScrollView>
      
      
      {/* Custom bottom navigation */}
      <BottomNav onPlusButtonPress={handlePlusButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});