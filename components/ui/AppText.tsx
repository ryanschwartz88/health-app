import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface AppTextProps extends TextProps {
  variant?: 'body' | 'title' | 'heading' | 'caption';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  className?: string;
}

/**
 * AppText - Custom text component that uses the Outfit font family
 * Can be used with both StyleSheet styles and NativeWind classes
 */
const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'body',
  weight = 'regular',
  style,
  className,
  ...props
}) => {
  // Map weight to font family
  const getFontFamily = () => {
    switch (weight) {
      case 'light': return 'Outfit-Light';
      case 'regular': return 'Outfit-Regular';
      case 'medium': return 'Outfit-Medium';
      case 'semibold': return 'Outfit-SemiBold';
      case 'bold': return 'Outfit-Bold';
      default: return 'Outfit-Regular';
    }
  };

  // Get variant style
  const getVariantStyle = () => {
    switch (variant) {
      case 'heading': return styles.heading;
      case 'title': return styles.title;
      case 'body': return styles.body;
      case 'caption': return styles.caption;
      default: return styles.body;
    }
  };

  return (
    <Text
      className={className}
      style={[
        { fontFamily: getFontFamily() }, 
        getVariantStyle(),
        style
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    lineHeight: 32,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default AppText;
