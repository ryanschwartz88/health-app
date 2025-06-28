import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

// Define the available font families
type FontFamily = 'outfit' | 'caslon';

// Define the available variants
type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'tagline';

// Define the available weights for each font family
type OutfitWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
type CaslonWeight = 'medium' | 'semibold';

// Use a conditional type for the weight prop to ensure type safety
type Weight<T extends FontFamily> = T extends 'outfit' ? OutfitWeight : CaslonWeight;

// Define the component props using generics
interface AppTextProps<T extends FontFamily> extends TextProps {
  family?: T;
  variant?: Variant;
  weight?: Weight<T>;
  className?: string;
}

// Helper to get the correct font family string based on family and weight
const getFontFamilyName = (family: FontFamily, weight: Weight<any>): string => {
  if (family === 'caslon') {
    // Caslon only supports medium and semibold, default to medium
    const validWeight = weight === 'medium' || weight === 'semibold' ? weight : 'medium';
    return `caslon-${validWeight}`;
  }

  // Default to Outfit, ensuring the weight is valid
  if (family === 'outfit') {
    if (weight === 'semibold') {
      return 'Outfit-SemiBold';
    }
    const capitalizedWeight = weight.charAt(0).toUpperCase() + weight.slice(1);
    return `Outfit-${capitalizedWeight}`;
  }

  // Fallback for caslon or other families
  return `caslon-${weight}`;
};

// The generic component allows for strong type inference
const AppText = <T extends FontFamily>({
  family = 'outfit' as T,
  variant = 'body1',
  weight = 'regular' as Weight<T>,
  style,
  className,
  children,
  ...props
}: AppTextProps<T>) => {
  const fontFamily = getFontFamilyName(family, weight);
  const variantStyle = styles[variant];

  return (
    <Text
      className={className}
      style={[{ fontFamily }, variantStyle, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

// Define the styles for each typographic variant
const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    lineHeight: 44,
  },
  h2: {
    fontSize: 32,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    lineHeight: 28,
  },
  body1: {
    fontSize: 16,
    lineHeight: 20,
  },
  body2: {
    fontSize: 14,
    lineHeight: 18,
  },
  tagline: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export { AppText };
