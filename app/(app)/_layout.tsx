import Superwall from "@superwall/react-native-superwall";
import { Stack } from "expo-router";
import React, { useEffect } from "react";

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

  return <Stack screenOptions={{ headerShown: false }} />;
}
