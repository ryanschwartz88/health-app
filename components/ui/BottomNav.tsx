import HomeIcon from '@/assets/tabs/home-icon.svg';
import LogsIcon from '@/assets/tabs/logs.svg';
import NutritionIcon from '@/assets/tabs/nutrition.svg';
import ProfileIcon from '@/assets/tabs/profile.svg';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import GlassPanel from './GlassPanel';

type TabRoute = {
  name: string;
  path: string;
  icon: any; // Changed to any to support require for SVGs
};

type BottomNavProps = {
  onPlusButtonPress?: () => void;
};


// Define tab routes with SVG icons
const tabs: TabRoute[] = [
  {
    name: 'Home',
    path: '/',
    icon: HomeIcon,
  },
  {
    name: 'Nutrition',
    path: '/nutrition', 
    icon: NutritionIcon,
  },
  // Placeholder for the center plus button. The icon here is just a name, not rendered.
  {
    name: 'Add',
    path: '', 
    icon: null, 
  },
  {
    name: 'Logs',
    path: '/logs',
    icon: LogsIcon,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: ProfileIcon,
  },
];

const BottomNav: React.FC<BottomNavProps> = ({ onPlusButtonPress }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Helper to check if a tab is active
  const isActive = (path: string) => {
    if (path === '/') {
      // Home tab should only be active on exact match
      return pathname === '/' || pathname === '/index';
    }
    // Other tabs are active if the pathname starts with their path
    return pathname.startsWith(path);
  };

  return (
    <View style={styles.container}>
      <GlassPanel rounded="xl" hasBorder={false} style={styles.glassPanel}>
        <View style={styles.navContent}>
          {tabs.map((tab, index) => {
            // For the center button (plus button)
            if (index === 2) {
              return (
                <TouchableOpacity 
                  style={styles.plusButton}
                  onPress={onPlusButtonPress}
                  key={tab.name}
                >
                  <Ionicons name="add" size={36} color="#FFF" />
                </TouchableOpacity>
              );
            }

            // For regular tab buttons
            const active = isActive(tab.path);
            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.tabItem}
                onPress={() => router.push(tab.path as any)}
                disabled={active}
              >
                {React.createElement(tab.icon, { 
                  width: 28, 
                  height: 28, 
                  style: { opacity: active ? 1 : 0.3 } 
                })}
              </TouchableOpacity>
            );
          })}
        </View>
      </GlassPanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    right: 32,
    alignItems: 'center',
    // Drop shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  glassPanel: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 50,
    paddingVertical: 6,
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    padding: 8,

  },
  plusButton: {
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomNav;