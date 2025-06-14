import DefaultRecPillIcon from '@/assets/ai/Rec_Pill.svg';
import GlassPanel from '@/components/ui/GlassPanel'; // Import GlassPanel
import { Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
        style={styles.touchableWrapper}
        onPress={onPress}
      >
        <GlassPanel rounded="lg" hasBorder={true}> 
          <View style={styles.cardContentWrapper}> 
            <View style={styles.cardHeaderContainer}>
              <View style={styles.cardHeaderLeft}>
                <View style={styles.iconWrapper}>
                  {IconComponent}
                </View>
                <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
              </View>
              <View style={styles.chevronWrapper}>
                <Feather name="chevron-right" size={24} />
              </View>
            </View>
            <Text style={styles.recText}>{rec}</Text>
          </View>
        </GlassPanel>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  touchableWrapper: { // Renamed from cardContainer, handles margin
    marginBottom: 16,
  },
  cardContentWrapper: { // New style for padding inside GlassPanel
    padding: 16,
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
  },
  iconWrapper: {
    padding: 10,
    backgroundColor: '#D9d9d9',
    borderRadius: 9999,
    marginRight: 12,
  },
  titleText: {
    fontSize: 18,
    flex: 1,
  },
  recText: {
    marginTop: 12,
    fontSize: 14,
  },
});

export default RecommendationCard;
