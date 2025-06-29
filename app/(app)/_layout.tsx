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
  const [googleFontsLoaded, googleFontError] = useFonts({
    'outfit-light': Outfit_300Light,
    'outfit-regular': Outfit_400Regular,
    'outfit-medium': Outfit_500Medium,
    'outfit-semibold': Outfit_600SemiBold,
    'outfit-bold': Outfit_700Bold,
  });

  // Load the Libre Caslon Text font weights
  const [customFontsLoaded, customFontError] = useFonts({
    'caslon-medium': require('@/assets/fonts/LibreCaslonText-Medium.ttf'),
    'caslon-medium-italic': require('@/assets/fonts/LibreCaslonText-MediumItalic.ttf'),
    'caslon-semibold': require('@/assets/fonts/LibreCaslonText-Semibold.ttf'),
    'caslon-semibold-italic': require('@/assets/fonts/LibreCaslonText-SemiboldItalic.ttf'),
  });

  const fontsLoaded = googleFontsLoaded && customFontsLoaded;
  const fontError = googleFontError || customFontError;

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
        colors={['#E7E3E2', '#DDDEF0']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: .8, y: .6 }}
        style={styles.background}
      >
        
        <Slot />
      </LinearGradient>
    </View>
  );
}
