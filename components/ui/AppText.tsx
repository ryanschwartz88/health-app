import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

// Define the available font families
type FontFamily = 'outfit' | 'caslon';

// Define the available variants
type Variant = 'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3' | 'tagline';

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
  italic?: boolean;
  className?: string;
}

// Helper to get the correct font family string based on family and weight
const getFontFamilyName = (
  family: FontFamily,
  weight: Weight<any>,
  italic?: boolean
): string => {
  if (family === 'caslon') {
    // Caslon only supports medium and semibold, default to medium
    const validWeight = weight === 'medium' || weight === 'semibold' ? weight : 'medium';
    return `caslon-${validWeight}${italic ? '-italic' : ''}`;
  }

  // Default to Outfit, ensuring the weight is valid
  const validWeight = ['light', 'regular', 'medium', 'semibold', 'bold'].includes(weight)
    ? weight
    : 'regular';
  return `outfit-${validWeight}`;
};

// The generic component allows for strong type inference
const AppText = <T extends FontFamily>({
  family = 'outfit' as T,
  variant = 'body1',
  weight = 'regular' as Weight<T>,
  italic,
  style,
  className,
  children,
  ...props
}: AppTextProps<T>) => {
  const fontFamily = getFontFamilyName(family, weight, italic);
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
  h0: {
    fontSize: 36,
    lineHeight: 40,
  },
  h1: {
    fontSize: 32,
    lineHeight: 36,
  },
  h2: {
    fontSize: 28,
    lineHeight: 32,
  },
  h3: {
    fontSize: 24,
    lineHeight: 28,
  },
  h4: {
    fontSize: 20,
    lineHeight: 24,
  },
  body1: {
    fontSize: 18,
    lineHeight: 22,
  },
  body2: {
    fontSize: 16,
    lineHeight: 20,
  },
  body3: {
    fontSize: 14,
    lineHeight: 18,
  },
  tagline: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export { AppText };
