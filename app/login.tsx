import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold">Login Screen</Text>
        <TouchableOpacity
          className="mt-4 rounded-lg bg-blue-500 px-4 py-2"
          onPress={() => router.back()}
        >
          <Text className="font-semibold text-white">Back to Welcome</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
