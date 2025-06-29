import { AppText } from '@/components/ui/AppText';
import BottomSpacer from '@/components/ui/BottomSpacer';
import GlassPanel from '@/components/ui/GlassPanel';
import { resetUser } from '@/utils/userManager';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

// Sample profile settings categories
const profileSections = [
  {
    id: 'personal',
    title: 'Personal Information',
    icon: 'person-outline',
    items: [
      { id: 'profile', title: 'Profile Details', icon: 'person-circle-outline' },
      { id: 'goals', title: 'Health Goals', icon: 'trophy-outline' },
      { id: 'measurements', title: 'Body Measurements', icon: 'fitness-outline' }
    ]
  },
  {
    id: 'app',
    title: 'App Settings',
    icon: 'settings-outline',
    items: [
      { id: 'notifications', title: 'Notifications', icon: 'notifications-outline' },
      { id: 'appearance', title: 'Appearance', icon: 'color-palette-outline' },
      { id: 'privacy', title: 'Privacy', icon: 'shield-outline' }
    ]
  },
  {
    id: 'support',
    title: 'Support',
    icon: 'help-circle-outline',
    items: [
      { id: 'faq', title: 'FAQ', icon: 'help-outline' },
      { id: 'contact', title: 'Contact Us', icon: 'mail-outline' },
      { id: 'about', title: 'About App', icon: 'information-circle-outline' }
    ]
  }
];

export default function ProfileScreen() {
  const router = useRouter();
  
  // Function to handle account deletion with confirmation
  const deleteAccount = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Reset user data and update auth state
              const success = await resetUser();
              
              if (success) {
                // Navigation will be handled by the _layout.tsx component
                // after the auth state changes
                console.log('Account deleted successfully');
              } else {
                Alert.alert('Error', 'Failed to delete account');
                console.error('Failed to delete account');
              }
            } catch (error) {
              Alert.alert('Error', 'An error occurred while deleting your account');
              console.error('Error deleting account:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={{ gap: 24 }}>
        {/* Health Stats Summary */}
        <GlassPanel rounded="lg" style={styles.statsPanel}>
        <AppText variant="body1" weight="medium" style={styles.statsPanelTitle}>
          About Me
        </AppText>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <AppText variant="h4" weight="bold">157</AppText>
            <AppText variant="body2">lbs</AppText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <AppText variant="h4" weight="bold">5'10"</AppText>
            <AppText variant="body2">height</AppText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <AppText variant="h4" weight="bold">24.5</AppText>
            <AppText variant="body2">BMI</AppText>
          </View>
        </View>
      </GlassPanel>

      {/* Profile Sections */}
      {profileSections.map(section => (
        <View key={section.id} style={styles.section}>
          <AppText variant="h4" weight="medium" style={styles.sectionTitle}>
            {section.title}
          </AppText>
          
          <GlassPanel rounded="lg" style={styles.menuPanel}>
            {section.items.map((item, index) => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={styles.menuItem}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIconContainer}>
                      <Ionicons name={item.icon as any} size={22} color="#333" />
                    </View>
                    <AppText weight="regular" variant="body1">{item.title}</AppText>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#888" />
                </TouchableOpacity>
                
                {index < section.items.length - 1 && (
                  <View style={styles.menuDivider} />
                )}
              </React.Fragment>
            ))}
          </GlassPanel>
        </View>
      ))}

      {/* Logout Button */}
      <GlassPanel rounded="lg" style={styles.logoutPanel}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={deleteAccount}
        >
          <Ionicons name="log-out-outline" size={20} color="#E53935" />
          <AppText weight="medium" variant="body1" style={styles.logoutText}>Delete Account</AppText>
        </TouchableOpacity>
      </GlassPanel>
        <BottomSpacer />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  statsPanel: {
    padding: 16,
    gap: 12,
  },
  statsPanelTitle: {
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statDivider: {
    height: 30,
    width: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
  },
  menuPanel: {
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginHorizontal: 16,
  },
  logoutPanel: {
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    gap: 8,
  },
  logoutText: {
    color: '#E53935',
  },
});
