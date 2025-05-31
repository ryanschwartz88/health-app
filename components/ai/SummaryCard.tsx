import AiIcon from '@/assets/ai/Group_237.svg';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

type SummaryCardProps = {
  title: string;
  body: string;
  tags: string[];
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
          <Text style={styles.title}>{title}</Text>
        </View>
        
        {/* Body */}
        <Text style={styles.body}>{body}</Text>
        
        {/* Tags */}
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View 
              key={index} 
              style={styles.tagButton}
            >
              <Text style={styles.tagText}>{tag}</Text>
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
    fontSize: 20,
    fontWeight: 'medium',
    color: '#ffffff',
  },
  body: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 16,
    lineHeight: 22,
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
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SummaryCard;