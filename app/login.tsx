import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AppText } from '../components/ui/AppText';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
        <AppText className="text-2xl font-outfit-bold">Login Screen</AppText>
        <TouchableOpacity
          className="mt-4 rounded-lg bg-blue-500 px-4 py-2"
          onPress={() => router.back()}
        >
          <AppText className="font-outfit-semibold text-white">Back to Welcome</AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
