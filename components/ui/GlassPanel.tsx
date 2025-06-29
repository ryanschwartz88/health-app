import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';

type GlassPanelProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hasBorder?: boolean;
  className?: string;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
};

/**
 * GlassPanel - A reusable glassmorphism panel with a true background blur effect.
 * This implementation uses Expo's BlurView for a realistic frosted-glass look.
 */
const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  style,
  rounded = 'lg',
  hasBorder = true,
  className,
  intensity = 80,
  tint = 'light',
}) => {
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

  const borderRadius = getBorderRadius();

  // On Web, BlurView is not supported, so we fall back to a semi-transparent background.
  const Fallback = () => <View style={[styles.fallback, { borderRadius }]} />;

  return (
    <View 
      style={[
        styles.container,
        { borderRadius },
        hasBorder && styles.border,
        style
      ]}
      className={className}
    >
      {Platform.OS !== 'web' ? (
        <BlurView
          tint={tint}
          intensity={intensity}
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <Fallback />
      )}
      
      {/* Sheen Gradients */}
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,0.1)']}
        start={{ x: .1, y: .1 }}
        end={{ x: .75, y: 1.5 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0.5)', 'transparent']}
        start={{ x: .1, y: .1 }}
        end={{ x: .75, y: 1.5 }}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  border: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  fallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  content: {
    flex: 1,
  },
});

export default GlassPanel;
