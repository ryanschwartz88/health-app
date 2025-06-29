import DefaultRecPillIcon from '@/assets/ai/Rec_Pill.svg';
import GlassPanel from '@/components/ui/GlassPanel'; // Import GlassPanel
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '../ui/AppText';

interface RecommendationCardProps {
  title: string;
  rec: string;
  vitamin_id: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ title, rec, vitamin_id, icon, onPress }) => {

  const IconComponent: React.ReactNode = icon ? icon : <DefaultRecPillIcon width={16} height={16} />;

  return (
    <>
      <Pressable
        onPress={onPress}
      >
        <GlassPanel rounded="lg" hasBorder={true}> 
          <View style={styles.cardContentWrapper}> 
            <View style={styles.cardHeaderContainer}>
              <View style={styles.cardHeaderLeft}>
                <View style={styles.iconWrapper}>
                  {IconComponent}
                </View>
                <AppText variant="body1" weight="medium" style={{ flex: 1 }} numberOfLines={3} ellipsizeMode="tail">{title}</AppText>
              </View>
              <View style={styles.chevronWrapper}>
                <Feather name="chevron-right" size={24} />
              </View>
            </View>
            <AppText variant="body2">{rec}</AppText>
          </View>
        </GlassPanel>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  cardContentWrapper: { // New style for padding inside GlassPanel
    padding: 16,
    gap: 12,
  },
  cardHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chevronWrapper: {
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 9999,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  iconWrapper: {
    padding: 10,
    backgroundColor: '#D9d9d9',
    borderRadius: 9999,
  },
});

export default RecommendationCard;
