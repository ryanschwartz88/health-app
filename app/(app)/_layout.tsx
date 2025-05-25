import Superwall from "@superwall/react-native-superwall";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Header from "../../components/ui/Header";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    paddingTop: 10,
    zIndex: 10, // Ensure header stays above other content
  },
});

export default function AppLayout() {
  useEffect(() => {
    // Register the Superwall placement for subscription check
    Superwall.shared.register({
      placement: 'b',
      feature: () => {
        // Place any global feature logic here if needed
      }
    });
  }, []);

  const pathname = usePathname();
  
  // Determine if we should show back button based on route
  const shouldShowBackButton = pathname !== '/';
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E7E3E2', '#DDDBE9']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: .75, y: .5 }}
        style={styles.background}
      >
        {/* Global Header */}
        <View style={styles.headerContainer}>
          <Header />
        </View>
        
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' }
          }}
        />
      </LinearGradient>
    </View>
  );
}
