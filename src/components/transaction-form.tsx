import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import React from 'react';
import type { Control } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput } from 'react-native';
import * as z from 'zod';

import {
  Button,
  ControlledInput,
  ControlledSelect,
  Text,
  View,
  colors,
} from '@/components/ui';
import { ArrowDown, ArrowUp } from '@/components/ui/icons';
import { translate } from '@/lib';
import { useStores } from '@/stores';
import { FINANCE_GREEN } from '@/utils';

const schema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) > 0, {
      message: 'Enter a valid amount greater than 0',
    }),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1, 'Category is required'),
  note: z.string().optional(),
});

export type TransactionFormType = z.infer<typeof schema>;

type Props = {
  onSubmit: (data: TransactionFormType) => void;
  onCancel: () => void;
};

export const TransactionForm = observer(({ onSubmit, onCancel }: Props) => {
  const { finance } = useStores();
  const { handleSubmit, control } = useForm<TransactionFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: '',
      type: 'income',
      category: '',
      note: '',
    },
  });

  const options = finance.categories.map((c) => ({ label: c, value: c }));

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text className="mb-1 text-base font-semibold">
          {translate('finance.amount')}{' '}
          <Text className="text-danger-500">*</Text>
        </Text>
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <View className="mb-4">
              <View className="flex-row items-center rounded-xl border border-neutral-300 bg-white px-3">
                <Text className="pr-2 text-lg font-semibold text-neutral-500">$</Text>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={translate('finance.enter_amount')}
                  placeholderTextColor={colors.neutral[400]}
                  keyboardType="decimal-pad"
                  className="flex-1 py-3 text-base"
                />
              </View>
              {fieldState.error?.message ? (
                <Text className="mt-1 text-sm text-danger-400">
                  {fieldState.error.message}
                </Text>
              ) : null}
            </View>
          )}
        />

        <Text className="mb-1 text-base font-semibold">
          {translate('finance.type')} <Text className="text-danger-500">*</Text>
        </Text>
        <TypeToggle control={control} />

        <ControlledSelect
          control={control}
          name="category"
          label={`${translate('finance.category')} *`}
          placeholder={translate('finance.select_category')}
          options={options}
        />

        <ControlledInput
          control={control}
          name="note"
          label={translate('finance.note')}
          placeholder={translate('finance.add_note')}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          className="min-h-[100px]"
        />

        <Button
          label={translate('finance.save')}
          onPress={handleSubmit(onSubmit)}
          className="mt-4 h-12 rounded-xl"
          textClassName="text-white"
          style={{ backgroundColor: FINANCE_GREEN }}
          testID="save-transaction"
        />
        <Button
          label={translate('finance.cancel')}
          onPress={onCancel}
          variant="outline"
          className="h-12 rounded-xl border-neutral-300 bg-white"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

function TypeToggle({ control }: { control: Control<TransactionFormType> }) {
  return (
    <Controller
      control={control}
      name="type"
      render={({ field: { value, onChange } }) => (
        <View className="mb-4 flex-row gap-3">
          <Pressable
            onPress={() => onChange('income')}
            className="flex-1 flex-row items-center justify-center rounded-xl border py-3"
            style={
              value === 'income'
                ? { backgroundColor: FINANCE_GREEN, borderColor: FINANCE_GREEN }
                : { backgroundColor: '#fff', borderColor: '#D4D4D4' }
            }
          >
            <ArrowDown color={value === 'income' ? '#fff' : '#525252'} />
            <Text
              className={`ml-2 font-semibold ${value === 'income' ? 'text-white' : 'text-neutral-800'}`}
            >
              {translate('finance.income')}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onChange('expense')}
            className="flex-1 flex-row items-center justify-center rounded-xl border py-3"
            style={
              value === 'expense'
                ? { backgroundColor: FINANCE_GREEN, borderColor: FINANCE_GREEN }
                : { backgroundColor: '#fff', borderColor: '#D4D4D4' }
            }
          >
            <ArrowUp color={value === 'expense' ? '#fff' : '#525252'} />
            <Text
              className={`ml-2 font-semibold ${value === 'expense' ? 'text-white' : 'text-neutral-800'}`}
            >
              {translate('finance.expense')}
            </Text>
          </Pressable>
        </View>
      )}
    />
  );
}
