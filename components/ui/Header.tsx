import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GlassPanel from './GlassPanel';

type HeaderProps = {
  title?: string;
  rightAction?: React.ReactNode;
};

/**
 * Header component that appears on all screens in the app
 */
const Header: React.FC<HeaderProps> = ({
  title,
  rightAction,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Generate default title based on current route if no title provided
  const getDefaultTitle = () => {
    if (pathname === '/') return 'Home';
    return pathname.split('/').pop()?.replace(/^\w/, c => c.toUpperCase()) || 'Health App';
  };
  
  return (
    <GlassPanel
      rounded="lg"
      hasBorder={false}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        
        {/* Title section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title || getDefaultTitle()}</Text>
        </View>
        
        {/* Right section for optional actions */}
        <View style={styles.rightSection}>
          {rightAction}
        </View>
      </View>
    </GlassPanel>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 50, // For status bar
    marginBottom: 16,
    marginHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 4,
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default Header;
