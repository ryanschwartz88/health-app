import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface GlassPanelProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hasBorder?: boolean;
  className?: string;
}

/**
 * GlassPanel - A reusable semi-transparent panel with glassmorphism effects
 * Use this component to create a consistent glass-like UI element across the app
 */
const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  style,
  contentContainerStyle,
  rounded = 'lg',
  hasBorder = true,
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

  const borderRadius = getBorderRadius();

  return (
    <View style={[styles.shadowContainer, style]}>
      <View style={[{ borderRadius, overflow: 'hidden' }]} className={className}>
        <BlurView
          style={StyleSheet.absoluteFill}
          tint="light"
          intensity={80}
        />
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.overlay,
            hasBorder && styles.border,
          ]}
        />
        <View style={[styles.content, contentContainerStyle]}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // for Android
    marginBottom: 0, // Add space for the shadow to render
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  border: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  content: {
    padding: 0, // Default padding
  },
});

export default GlassPanel;
