import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const originalCarouselImages = [
  require('@/assets/images/phone-mockup.png'),
  require('@/assets/images/phone-mockup.png'),
  require('@/assets/images/phone-mockup.png'),
  require('@/assets/images/phone-mockup.png'),
];

// Create a looped data array for infinite scrolling
const loopedCarouselImages = [
  originalCarouselImages[originalCarouselImages.length - 1], // Prepend last item
  ...originalCarouselImages,
  originalCarouselImages[0], // Append first item
];

export default function Welcome() {
  // Start at index 1 (the first "real" image)
  const [currentIndex, setCurrentIndex] = useState(1);
  const flatListRef = useRef<FlatList | null>(null);

  const handleGetStarted = () => router.push('/onboarding/your-goals');
  const handleSignIn = () => router.push('/login');

  const handleNext = () => {
    // Scroll to the next item. `onMomentumScrollEnd` will handle the loop.
    flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
  };

  const handlePrev = () => {
    // Scroll to the previous item. `onMomentumScrollEnd` will handle the loop.
    flatListRef.current?.scrollToIndex({ index: currentIndex - 1, animated: true });
  };

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollPosition / width);

    if (newIndex === 0) {
      // User scrolled to the fake first item (clone of the last)
      // Jump to the real last item without animation
      flatListRef.current?.scrollToIndex({
        index: originalCarouselImages.length,
        animated: false,
      });
      setCurrentIndex(originalCarouselImages.length);
    } else if (newIndex === loopedCarouselImages.length - 1) {
      // User scrolled to the fake last item (clone of the first)
      // Jump to the real first item without animation
      flatListRef.current?.scrollToIndex({ index: 1, animated: false });
      setCurrentIndex(1);
    } else {
      // It's a regular scroll, just update the index
      setCurrentIndex(newIndex);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ width }} className="items-center justify-center">
      <Image source={item} className="w-full h-full" resizeMode="contain" />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Content Area - Carousel with Gradient */}
      <View className="flex-1 justify-center">
        <LinearGradient
          colors={['#FFFFFF', '#EBEBEB']}
          locations={[0.94, 1.0]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />
        <View className="relative w-full aspect-square max-h-[80%]">
          <FlatList
            ref={flatListRef}
            data={loopedCarouselImages}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={1}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
          />

          <TouchableOpacity
            onPress={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-6 bg-gray-100 rounded-full p-4 shadow-md z-10"
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            className="absolute right-4 top-1/2 -translate-y-6 bg-gray-100 rounded-full p-4 shadow-md z-10"
          >
            <Ionicons name="chevron-forward" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Action Area */}
      <View className="px-6 pb-6 pt-8 border-t border-gray-200">
        <Text className="text-4xl text-center font-bold mb-6">
          Driven by science, feels like magic
        </Text>

        <Pressable
          className="bg-black rounded-full py-4 items-center"
          onPress={handleGetStarted}
        >
          <Text className="text-white text-lg font-semibold">Get Started</Text>
        </Pressable>

        <Pressable onPress={handleSignIn} className="mt-5">
          <Text className="text-center text-gray-600 font-regular">
            Already have an account?{' '}
            <Text className="font-outfit-medium text-black">Log In.</Text>
          </Text>
        </Pressable>

        <Text className="text-center text-gray-500 text-xs mt-6 px-4 font-regular">
          By continuing, you agree to our{' '}
          <Text className="font-outfit-medium underline">Terms of Service</Text> and{' '}
          <Text className="font-outfit-medium underline">Privacy Policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
}
