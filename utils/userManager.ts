import { updateSupabaseHeaders } from '@/data/supabaseClient';
import { createUserId } from '@/utils/secureStorage';
import Superwall from '@superwall/react-native-superwall';
import { router } from 'expo-router';

/**
 * Initialize a new user in the system
 * - Creates a new UUID and stores it in secure storage
 * - Identifies the user with Superwall
 * - Updates Supabase headers with the user ID
 * 
 * @returns Promise with the new user ID
 */
export async function initializeUser(): Promise<string> {
  try {
    // Create a new user ID and store it in secure storage
    const userId = await createUserId();

    // Update Superwall with the new user ID
    Superwall.shared.identify({
      userId: userId,
    });

    // Update Supabase headers with the new user ID
    await updateSupabaseHeaders();

    return userId;
  } catch (error) {
    console.error('Error initializing user:', error);
    return '';
  }
}

/**
 * Reset user data in all systems
 * - Deletes the user ID from secure storage
 * - Resets Superwall identity
 * - Clears Supabase headers
 * 
 * @returns Promise<boolean> indicating if the reset was successful
 */
export async function resetUser(): Promise<boolean> {
  try {
    // Import here to avoid circular dependency
    const { deleteUserId } = await import('@/utils/secureStorage');
    
    // Delete user ID from secure storage
    await deleteUserId();
    
    // Reset Superwall identity
    Superwall.shared.reset();

    // Update Supabase headers with an empty user ID
    await updateSupabaseHeaders();

    // Reroute to welcome page
    router.replace('/welcome');
    
    
    return true;
  } catch (error) {
    console.error('Error resetting user:', error);
    return false;
  }
}
