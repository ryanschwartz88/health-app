import { getUserId } from '@/utils/secureStorage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// There is NO global client exported. Always use getSupabaseClient() to get a client with the user ID header.

/**
 * Get a Supabase client with the current user ID in the headers
 * This creates a new client instance with the user ID header
 */
export async function getSupabaseWithUser() {
  const userId = await getUserId();

  if (userId == '') {
    return createClient(supabaseUrl, supabaseAnonKey);
  }
  
  // Create a new client with the user ID in the headers
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        'current_user_id': userId || '',
      },
    },
  });
}

/**
 * Updates the Supabase headers with the current user ID
 * This is a utility function to be called when the user ID changes
 */
export async function updateSupabaseHeaders() {
  // For compatibility with existing code, but we recommend using getSupabaseWithUser()
  // for new code as it's more reliable
  return await getSupabaseWithUser();
}
