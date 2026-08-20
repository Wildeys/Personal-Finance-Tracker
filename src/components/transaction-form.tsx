import { zodResolver } from '@hookform/resolvers/zod';
import { useFocusEffect } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useColorScheme } from 'nativewind';
import React from 'react';
import type { Control } from 'react-hook-form';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Keyboard, type ScrollView as RNScrollView } from 'react-native';
import * as z from 'zod';

import {
  Button,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  colors,
} from '@/components/ui';
import { ArrowDown, ArrowUp, CategoryGlyph, hasCategoryIcon } from '@/components/ui/icons';
import { translate, useKeyboardHeight } from '@/lib';
import { useStores } from '@/stores';
import { FINANCE_GREEN, FINANCE_RED, getCategoryColor } from '@/utils';

const NOTE_MAX = 120;

const makeSchema = () =>
  z.object({
    amount: z
      .string()
      .min(1, translate('finance.validation.amount_required'))
      .refine((v) => /^\d+(\.\d{1,2})?$/.test(v.trim()) && Number(v) > 0, {
        message: translate('finance.validation.amount_invalid'),
      }),
    type: z.enum(['income', 'expense']),
    category: z.string().min(1, translate('finance.validation.category_required')),
    note: z
      .string()
      .max(NOTE_MAX, translate('finance.validation.note_too_long'))
      .optional(),
  });

export type TransactionFormType = z.infer<ReturnType<typeof makeSchema>>;

const EMPTY_FORM: TransactionFormType = {
  amount: '',
  type: 'income',
  category: '',
  note: '',
};

type Props = {
  onSubmit: (data: TransactionFormType) => void;
  onCancel: () => void;
};

export const TransactionForm = observer(({ onSubmit, onCancel }: Props) => {
  const { finance, uiLanguage } = useStores();
  const { colorScheme } = useColorScheme();
  const scrollRef = React.useRef<RNScrollView>(null);
  const keyboardHeight = useKeyboardHeight();
  const [amountFocused, setAmountFocused] = React.useState(false);
  const schema = React.useMemo(
    () => makeSchema(),
    [uiLanguage.language]
  );
  const { handleSubmit, control, reset } = useForm<TransactionFormType>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_FORM,
  });

  const clearForm = React.useCallback(() => {
    reset(EMPTY_FORM);
    setAmountFocused(false);
  }, [reset]);

  const submit = handleSubmit((data) => {
    Keyboard.dismiss();
    onSubmit(data);
    clearForm();
  });

  useFocusEffect(
    React.useCallback(
      () => () => {
        clearForm();
      },
      [clearForm]
    )
  );

  const noteValue = useWatch({ control, name: 'note' }) ?? '';
  const currencyPrefix = finance.currency === 'MVR' ? 'Rf' : '$';

  return (
    <ScrollView
      ref={scrollRef}
      className="flex-1 bg-white dark:bg-neutral-900"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      contentContainerStyle={{ paddingBottom: 48 + keyboardHeight }}
    >
        <Text className="mb-1 text-base font-semibold">
          {translate('finance.amount')}
        </Text>
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <View className="mb-4">
              <View
                className={`flex-row items-center rounded-2xl border bg-white dark:bg-neutral-800 ${
                  amountFocused
                    ? 'border-finance-green'
                    : 'border-neutral-300 dark:border-neutral-700'
                }`}
              >
                <Text className="pl-4 pr-1 text-2xl font-bold text-finance-green">
                  {currencyPrefix}
                </Text>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={() => {
                    setAmountFocused(false);
                    onBlur();
                  }}
                  onFocus={() => setAmountFocused(true)}
                  placeholder={translate('finance.enter_amount')}
                  placeholderTextColor={
                    colorScheme === 'dark'
                      ? colors.neutral[500]
                      : colors.neutral[400]
                  }
                  keyboardType="decimal-pad"
                  className="flex-1 py-4 pr-4 text-3xl font-bold text-black dark:text-white"
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

        <Text className="mb-2 text-base font-semibold">
          {translate('finance.type')}
        </Text>
        <TypeToggle control={control} />

        <Text className="mb-2 text-base font-semibold">
          {translate('finance.category')}
        </Text>
        <CategoryGrid control={control} categories={finance.categories} />

        <Text className="mb-1 text-base font-semibold">
          {translate('finance.note')}
        </Text>
        <Controller
          control={control}
          name="note"
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <View className="mb-2">
              <View className="rounded-2xl border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800">
                <TextInput
                  value={value}
                  onChangeText={(text) => onChange(text.slice(0, NOTE_MAX))}
                  onBlur={onBlur}
                  onFocus={() => {
                    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
                  }}
                  placeholder={translate('finance.add_note')}
                  placeholderTextColor={
                    colorScheme === 'dark'
                      ? colors.neutral[500]
                      : colors.neutral[400]
                  }
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  maxLength={NOTE_MAX}
                  className="min-h-[88px] text-base text-black dark:text-white"
                />
                <Text className="self-end text-xs text-neutral-400">
                  {noteValue.length}/{NOTE_MAX}
                </Text>
              </View>
              {fieldState.error?.message ? (
                <Text className="mt-1 text-sm text-danger-400">
                  {fieldState.error.message}
                </Text>
              ) : null}
            </View>
          )}
        />

        <Button
          label={translate('finance.save')}
          onPress={submit}
          className="mt-4 h-12 rounded-xl bg-finance-green"
          textClassName="text-white"
          testID="save-transaction"
        />
        <Pressable onPress={onCancel} className="mt-2 items-center py-3">
          <Text className="font-semibold" style={{ color: FINANCE_GREEN }}>
            {translate('finance.cancel')}
          </Text>
        </Pressable>
      </ScrollView>
  );
});

function CategoryGrid({
  control,
  categories,
}: {
  control: Control<TransactionFormType>;
  categories: string[];
}) {
  return (
    <Controller
      control={control}
      name="category"
      render={({ field: { value, onChange }, fieldState }) => (
        <View className="mb-4">
          <View className="flex-row flex-wrap">
            {categories.map((name) => {
              const selected = value === name;
              const color = getCategoryColor(name);
              return (
                <View key={name} className="w-1/3 p-1">
                  <Pressable
                    onPress={() => onChange(name)}
                    className={`items-center rounded-2xl border py-3 ${
                      selected
                        ? 'border-finance-green bg-finance-green/10'
                        : 'border-neutral-200 dark:border-neutral-700'
                    }`}
                  >
                    <View className="mb-1 size-8 items-center justify-center">
                      {hasCategoryIcon(name) ? (
                        <CategoryGlyph
                          name={name}
                          color={selected ? FINANCE_GREEN : color}
                        />
                      ) : (
                        <View
                          className="size-8 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${color}22` }}
                        >
                          <Text
                            className="text-xs font-bold"
                            style={{ color }}
                          >
                            {name.slice(0, 1).toUpperCase()}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text
                      className={`mt-1 px-0.5 text-center text-xs font-semibold ${
                        selected
                          ? 'text-finance-green'
                          : 'text-neutral-800 dark:text-neutral-200'
                      }`}
                      numberOfLines={1}
                    >
                      {name}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
          {fieldState.error?.message ? (
            <Text className="mt-1 text-sm text-danger-400">
              {fieldState.error.message}
            </Text>
          ) : null}
        </View>
      )}
    />
  );
}

function TypeToggle({ control }: { control: Control<TransactionFormType> }) {
  return (
    <Controller
      control={control}
      name="type"
      render={({ field: { value, onChange } }) => (
        <View className="mb-4 flex-row gap-3">
          <Pressable
            onPress={() => onChange('income')}
            className={`flex-1 flex-row items-center justify-center rounded-2xl border py-3 ${
              value === 'income'
                ? 'border-finance-green bg-finance-green/10'
                : 'border-neutral-200 dark:border-neutral-700'
            }`}
          >
            <ArrowDown color={FINANCE_GREEN} />
            <Text
              className={`ml-2 font-semibold ${
                value === 'income'
                  ? 'text-finance-green'
                  : 'text-neutral-800 dark:text-neutral-200'
              }`}
            >
              {translate('finance.income')}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onChange('expense')}
            className={`flex-1 flex-row items-center justify-center rounded-2xl border py-3 ${
              value === 'expense'
                ? 'border-finance-red bg-finance-red/10'
                : 'border-neutral-200 dark:border-neutral-700'
            }`}
          >
            <ArrowUp color={FINANCE_RED} />
            <Text
              className={`ml-2 font-semibold ${
                value === 'expense'
                  ? 'text-finance-red'
                  : 'text-neutral-800 dark:text-neutral-200'
              }`}
            >
              {translate('finance.expense')}
            </Text>
          </Pressable>
        </View>
      )}
    />
  );
}
