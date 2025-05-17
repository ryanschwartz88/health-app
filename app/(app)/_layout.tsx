import Superwall from "@superwall/react-native-superwall";
import React, { useEffect } from "react";
import { Stack } from "expo-router";

export default function AppLayout() {
  useEffect(() => {
    // Register the Superwall placement for subscription check
    Superwall.shared.register({
      placement: 'check_subscription',
      feature: () => {
        console.log("App is unlocked");
        // Place any global feature logic here if needed
      }
    });
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
