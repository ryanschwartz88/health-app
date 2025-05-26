import { useMemo } from 'react';

/**
 * Hook to provide consistent bottom spacing for content to ensure 
 * it's not hidden behind the custom bottom tab bar
 */
export default function useBottomTabBarHeight() {
  // The height includes the tab bar (64) plus extra padding/margin (32)
  // plus the bottom safe area which varies by device
  return useMemo(() => {
    // Start with base height
    const baseHeight = 64;
    
    return baseHeight;
  }, []);
}
