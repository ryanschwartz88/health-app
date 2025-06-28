import AiIcon from '@/assets/ai/Group_237.svg';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { AppText } from '../ui/AppText';

type SummaryCardProps = {
  title: string;
  body?: string;
  tags?: string[];
  style?: ViewStyle;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
};

/**
 * SummaryCard - A component to display AI-generated summaries with a stylish gradient background
 * Displays a title, body text, and interactive tags
 */
const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  body,
  tags,
  style,
  rounded = 'lg',
  className,
}) => {
  // Map rounded prop to actual border radius values
  const getBorderRadius = () => {
    switch (rounded) {
      case 'none': return 0;
      case 'sm': return 8;
      case 'md': return 12;
      case 'lg': return 16;
      case 'xl': return 24;
      case 'full': return 9999;
      default: return 16;
    }
  };

  return (
    <View 
      style={[
        styles.container, 
        { borderRadius: getBorderRadius() },
        style
      ]}
      className={className}
    >
      {/* Custom gradient background with 80% opacity */}
      <LinearGradient
        colors={['#251D7F', '#000000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.75, y: 0.9 }}
        style={[StyleSheet.absoluteFill, { opacity: 0.8 }]}
      />

      {/* First gradient: transparent to white with 10% opacity */}
        <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.1)']}
            start={{ x: .1, y: .1 }}
            end={{ x: .75, y: 1.5 }}
        />
        
        {/* Second gradient: white to transparent with 50% opacity */}
        <LinearGradient
            colors={['rgba(255,255,255,0.5)', 'transparent']}
            start={{ x: .1, y: .1 }}
            end={{ x: .75, y: 1.5 }}
        />
      
      {/* Content container */}
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <AiIcon width={24} height={24}/>
          <AppText variant="h4" weight="medium" style={styles.title}>{title}</AppText>
        </View>
        
        {/* Body */}
        { body ? (
          <AppText variant="body1" style={styles.body}>{body}</AppText>
        ) :
        (
          <AppText variant="body1" style={styles.body}>Welcome to Nura! As you log more data, we'll provide personalized summaries and recommendations here.</AppText>
        )
        }
        
        
        {/* Tags */}
        <View style={styles.tagsContainer}>
          {tags && tags.map((tag, index) => (
            <View 
              key={index} 
              style={styles.tagButton}
            >
              <AppText variant="body2" weight="medium" style={styles.tagText}>{tag}</AppText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#ffffff',
  },
  body: {
    color: '#ffffff',
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    color: '#000000',
  },
});

export default SummaryCard;