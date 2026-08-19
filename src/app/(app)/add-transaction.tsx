import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';

import type { TransactionFormType } from '@/components/transaction-form';
import { TransactionForm } from '@/components/transaction-form';
import { FocusAwareStatusBar, Pressable, Text, View } from '@/components/ui';
import { Back } from '@/components/ui/icons';
import { translate } from '@/lib';
import { useStores } from '@/stores';

export default observer(function AddTransaction() {
  const router = useRouter();
  const { finance } = useStores();
  const goHome = () => router.navigate('/');

  const onSubmit = (data: TransactionFormType) => {
    finance.addTransaction({
      amount: Number(data.amount),
      type: data.type,
      category: data.category,
      note: data.note?.trim() || undefined,
    });
    router.navigate('/');
  };

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <View className="flex-row items-center px-5 pt-14">
        <Pressable
          onPress={goHome}
          className="size-10 items-center justify-center rounded-full bg-finance-green/15"
          hitSlop={8}
        >
          <Back />
        </Pressable>
        <View className="mx-3 flex-1 items-center">
          <Text className="text-center text-xl font-bold">
            {translate('finance.add_transaction')}
          </Text>
          <Text className="mt-0.5 text-center text-sm text-neutral-500 dark:text-neutral-400">
            {translate('finance.add_subtitle')}
          </Text>
        </View>
        <View className="size-10" />
      </View>
      <View className="flex-1 px-5 pt-4">
        <TransactionForm onSubmit={onSubmit} onCancel={goHome} />
      </View>
    </View>
  );
});
