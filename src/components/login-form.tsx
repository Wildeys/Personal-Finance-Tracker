import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Button,
  ControlledInput,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { translate, useKeyboardHeight } from '@/lib';
import { useStores } from '@/stores';

const makeSchema = () =>
  z.object({
    name: z.string().optional(),
    email: z
      .string({ error: translate('finance.validation.email_required') })
      .min(1, translate('finance.validation.email_required'))
      .pipe(z.email(translate('finance.validation.email_invalid'))),
    password: z
      .string({ error: translate('finance.validation.password_required') })
      .min(1, translate('finance.validation.password_required'))
      .min(6, translate('finance.validation.password_short')),
  });

export type FormType = z.infer<ReturnType<typeof makeSchema>>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = observer(({ onSubmit = () => {} }: LoginFormProps) => {
  const { uiLanguage } = useStores();
  const keyboardHeight = useKeyboardHeight();
  const schema = React.useMemo(() => makeSchema(), [uiLanguage.language]);
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '' },
  });

  return (
    <ScrollView
      className="flex-1"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: keyboardHeight,
      }}
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
  );
});
