import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type InvertedGlassPanelProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'; // Different rounding options
  hasBorder?: boolean;
  className?: string; // For additional NativeWind styling if needed
};

/**
 * InvertedGlassPanel - A reusable semi-transparent panel with gradient effects
 * Use this component to create a consistent glass-like UI element across the app
 */
const InvertedGlassPanel: React.FC<InvertedGlassPanelProps> = ({
  children,
  style,
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

  return (
    <View 
      style={[
        styles.container, 
        { borderRadius: getBorderRadius() },
        hasBorder && styles.border,
        style
      ]}
      className={className}
    >
      {/* White background with 90% opacity */}
      <View style={styles.baseBackground} />
      
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
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  baseBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // White with 40% opacity
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  border: {
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default InvertedGlassPanel;
