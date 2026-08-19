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
<View className="flex-1 bg-white dark:bg-neutral-900">
      <FocusAwareStatusBar />

      <SafeAreaView className="flex-1 px-6">
        {/* Header */}
        <View className="items-center">
          {/* Logo */}
          <View className="items-center justify-center rounded-full">
            <Text className="text-4xl">💰</Text>
          </View>

          <Text className="mt-6 text-center text-4xl font-bold text-[#06233F] dark:text-white">
            Welcome Back
          </Text>

          <Text className="mt-3 text-center text-base leading-6 text-gray-500 dark:text-neutral-400">
            Sign in to continue managing your finances
          </Text>
        </View>

        {/* Login Form */}
        <View className="flex-1">
          <LoginForm onSubmit={onSubmit} />
        </View>

        {/* Demo notice */}
        <View>
          <Text className="text-center text-sm text-gray-400 dark:text-neutral-500">
            Personal Finance Tracker
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}