import { useRouter } from 'expo-router';
import React from 'react';
import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import {
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { useAuth } from '@/providers/auth-provider';

export default function Login() {
  const router = useRouter();
  const { signIn, setIsFirstTime } = useAuth();

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    console.log(data);
    await setIsFirstTime(false);
    await signIn(
      { access: 'access-token', refresh: 'refresh-token' },
      {
        name: data.name,
        email: data.email,
        password: data.password,
      }
    );
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-[#FFF4EA] dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1">
        <View className="items-center pb-6 pt-10">
          <Text className="text-4xl">💰</Text>
          <Text className="mt-2 text-3xl font-bold text-[#06233F] dark:text-white">
            Finance Tracker
          </Text>
          <Text className="mt-1 text-base text-gray-600 dark:text-neutral-400">
            Welcome back
          </Text>
        </View>
        <LoginForm onSubmit={onSubmit} />
      </SafeAreaView>
    </View>
  );
}