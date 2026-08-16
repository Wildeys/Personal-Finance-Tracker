import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import * as z from 'zod';

import {
  Button,
  ControlledInput,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { translate } from '@/lib';

const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({ message: translate('finance.validation.email_required') })
    .min(1, translate('finance.validation.email_required'))
    .email(translate('finance.validation.email_invalid')),
  password: z
    .string({ message: translate('finance.validation.password_required') })
    .min(1, translate('finance.validation.password_required'))
    .min(6, translate('finance.validation.password_short')),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={10}
    >
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <View className="p-4">
          <View className="items-center justify-center">
            <Text
              testID="form-title"
              className="pb-6 text-center text-4xl font-bold"
            >
              {translate('finance.login_title')}
            </Text>

            <Text className="mb-6 max-w-xs text-center text-gray-500 dark:text-neutral-400">
              {translate('finance.login_subtitle')}
            </Text>
          </View>

          <ControlledInput
            testID="name"
            control={control}
            name="name"
            label={translate('finance.login_name')}
          />

          <ControlledInput
            testID="email-input"
            control={control}
            name="email"
            label={translate('finance.login_email')}
          />
          <ControlledInput
            testID="password-input"
            control={control}
            name="password"
            label={translate('finance.login_password')}
            placeholder="***"
            secureTextEntry={true}
          />
          <Button
            testID="login-button"
            label={translate('finance.login_button')}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
