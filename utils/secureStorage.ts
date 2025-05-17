import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'user_id';

/**
 * Gets the user ID from secure storage or creates a new one if it doesn't exist
 * @returns Promise with the user ID
 */
export async function getUserId(): Promise<string> {
  try {
    const userId = await SecureStore.getItemAsync(USER_ID_KEY);
    return userId || '';
  } catch (error) {
    console.error('Error getting user ID:', error);
    return '';
  }
}

/**
 * Creates a new user ID and saves it to secure storage
 * @returns Promise with the new user ID
 */
export async function createUserId(): Promise<string> {
  try {
    const newUserId = uuidv4();
    await SecureStore.setItemAsync(USER_ID_KEY, newUserId);
    return newUserId;
  } catch (error) {
    console.error('Error creating user ID:', error);
    return '';
  }
}

/**
 * Checks if a user ID exists in secure storage
 * @returns Promise with boolean indicating if user ID exists
 */
export async function hasUserId(): Promise<boolean> {
  try {
    const userId = await SecureStore.getItemAsync(USER_ID_KEY);
    return !!userId;
  } catch (error) {
    console.error('Error checking user ID:', error);
    return false;
  }
}

/**
 * DANGER: Deletes the user ID from secure storage.
 * This will effectively log the user out and they will lose access to any user-specific data.
 * Use with extreme caution as this cannot be undone and may result in data loss.
 * @returns Promise<boolean> indicating if the deletion was successful
 */
export async function deleteUserId(): Promise<boolean> {
  try {
    await SecureStore.deleteItemAsync(USER_ID_KEY);
    return true;
  } catch (error) {
    console.error('Error deleting user ID:', error);
    return false;
  }
}
