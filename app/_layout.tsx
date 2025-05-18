import { updateSupabaseHeaders } from "@/data/supabaseClient";
import { hasUserId } from "@/utils/secureStorage";
import Superwall from "@superwall/react-native-superwall";
import { Slot, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";

// This hook will protect the route access based on user authentication
function useProtectedRoute(isUserIdPresent: boolean | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Don't do anything while we're still loading user data
    if (isUserIdPresent === null) {
      return;
    }

    // Determine which part of the app the user is in
    const isInWelcome = segments[0] === 'welcome';
    const isInApp = segments[0] === '(app)';
    
    // User has no ID but is trying to access protected areas
    if (!isUserIdPresent && isInApp) {
      // Redirect to the welcome page
      router.replace('/welcome');
      return;
    }
    
    // User has ID but is in welcome (should go to app)
    if (isUserIdPresent && isInWelcome) {
      router.replace('/');
      return;
    }
    
    // Additional logic can be added here for specific onboarding flows
    // For example, if you want to ensure onboarding is completed before going to the app
  }, [isUserIdPresent, segments, router]);
}

export default function RootLayout() {
  const [isUserIdPresent, setIsUserIdPresent] = useState<boolean | null>(null);

  useEffect(() => {
    // Configure Superwall
    const apiKey = process.env.EXPO_PUBLIC_SUPERWALL_API_KEY || '';
    Superwall.configure({
      apiKey: apiKey,
    });

    // Check if user ID exists
    async function checkUserId() {
      const userIdExists = await hasUserId();
      setIsUserIdPresent(userIdExists);
      
      if (userIdExists) {
        // Update Supabase headers with the user ID
        await updateSupabaseHeaders();
      }
    }
    
    checkUserId();
  }, []);

  // Use the hook to protect routes
  useProtectedRoute(isUserIdPresent);

  // Use Slot instead of Stack since each group has its own layout
  return <Slot />;
}
