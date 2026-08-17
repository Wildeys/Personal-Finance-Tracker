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
    <View className="flex-1 bg-white dark:bg-neutral-900">
  <FocusAwareStatusBar />

  <SafeAreaView className="flex-1">
    {/* Illustration */}
    <View className="flex-[1.45] items-center justify-center px-3 pt-4">
      <Cover width="100%" height="100%" />
    </View>

    {/* Content */}
    <View className="px-7 pb-5">
      {/* Heading */}
      <Text className="text-center text-4xl font-bold leading-[44px] text-[#06233F] dark:text-white">
        Take Control of{'\n'}Your Finances
      </Text>

      {/* Subtitle */}
      <Text className="mx-5 mt-5 text-center text-lg leading-7 text-gray-500 dark:text-neutral-400">
        Track your income, expenses and savings{'\n'}all in one place.
      </Text>

      {/* Pagination dots */}
      <View className="mt-8 flex-row items-center justify-center gap-4">
        <View className="size-3 rounded-full bg-[#209447]" />
        <View className="size-3 rounded-full bg-gray-300 dark:bg-neutral-600" />
        <View className="size-3 rounded-full bg-gray-300 dark:bg-neutral-600" />
      </View>

      {/* Get Started */}
      <View className="mt-8">
        <Button
          label="Get Started"
          className="h-14 rounded-2xl bg-[#209447]"
          textClassName="text-lg font-semibold text-white"
          onPress={async () => {
            await setIsFirstTime(false);
            router.replace('/login');
          }}
        />
      </View>

      {/* Sign In */}
      <View className="mt-6 flex-row items-center justify-center pb-2">
        <Text className="text-base text-gray-500 dark:text-neutral-400">
          Already have an account?{' '}
        </Text>

        <Text
          className="text-base font-semibold text-[#209447]"
          onPress={async () => {
            await setIsFirstTime(false);
            router.replace('/login');
          }}
        >
          Sign In
        </Text>
      </View>
    </View>
  </SafeAreaView>
</View>
  );
}