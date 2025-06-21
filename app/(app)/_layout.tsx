import {
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  useFonts
} from '@expo-google-fonts/outfit';
import Superwall from "@superwall/react-native-superwall";
import { LinearGradient } from "expo-linear-gradient";
import { Slot, SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  // Load the Outfit font weights
  const [fontsLoaded, fontError] = useFonts({
    'Outfit-Light': Outfit_300Light,
    'Outfit-Regular': Outfit_400Regular,
    'Outfit-Medium': Outfit_500Medium,
    'Outfit-SemiBold': Outfit_600SemiBold,
    'Outfit-Bold': Outfit_700Bold,
    'LibreCaslonText-Medium': require('@/assets/fonts/LibreCaslonText-Medium.ttf'),
    'LibreCaslonText-MediumItalic': require('@/assets/fonts/LibreCaslonText-MediumItalic.ttf'),
    'LibreCaslonText-Semibold': require('@/assets/fonts/LibreCaslonText-Semibold.ttf'),
    'LibreCaslonText-SemiboldItalic': require('@/assets/fonts/LibreCaslonText-SemiboldItalic.ttf'),
  });

  useEffect(() => {
    // Register the Superwall placement for subscription check
    Superwall.shared.register({
      placement: 'b',
      feature: () => {
        // Place any global feature logic here if needed
      }
    });
  }, []);

  // This effect will hide the splash screen once fonts are loaded or if there's an error
  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen once fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  
  // If fonts aren't loaded yet, don't render anything
  if (!fontsLoaded && !fontError) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E7E3E2', '#DDDBE9']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: .75, y: .5 }}
        style={styles.background}
      >
        
        <Slot />
      </LinearGradient>
    </View>
  );
}
