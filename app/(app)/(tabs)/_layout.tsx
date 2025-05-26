import BottomNav from '@/components/ui/BottomNav';
import { Slot } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function TabsLayout() {
  // Handle the plus button press
  const handlePlusButtonPress = () => {
    // You can implement the action for the plus button here
    // For example, open a modal or navigate to a specific screen
    console.log('Plus button pressed');
  };

  return (
    <View style={styles.container}>
      
      {/* Main content area */}
      <Slot />
      
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