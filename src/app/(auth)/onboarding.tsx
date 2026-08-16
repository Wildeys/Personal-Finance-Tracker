import { useRouter } from 'expo-router';
import React from 'react';
import { Cover } from '@/components/cover';
import {
  Button,
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { useAuth } from '@/providers/auth-provider';

export default function Onboarding() {
  const { setIsFirstTime } = useAuth();
  const router = useRouter();
  return (
    <View className="flex h-full items-center justify-center bg-white dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <View className="w-full flex-1">
        <Cover />
      </View>
      <View className="justify-end">
        <Text className="my-3 text-center text-5xl font-bold text-[#06233F] dark:text-white">
          Finance Tracker
        </Text>
        <Text className="mb-2 text-center text-lg text-gray-600 dark:text-neutral-400">
          Take control of your money, one transaction at a time
        </Text>
        <Text className="my-1 pt-6 text-left text-lg">
          💰 Track income & expenses in seconds
        </Text>
        <Text className="my-1 text-left text-lg">
          📊 See your balance update in real time
        </Text>
        <Text className="my-1 text-left text-lg">
          🏷️ Organize spending with custom categories
        </Text>
        <Text className="my-1 text-left text-lg">
          🔒 Your financial data, private and secure
        </Text>
      </View>
      <SafeAreaView className="mt-6">
        <Button
          label="Let's Get Started"
          className="bg-[#00A878]"
          onPress={async () => {
            await setIsFirstTime(false);
            router.replace('/login');
          }}
        />
      </SafeAreaView>
    </View>
  );
}