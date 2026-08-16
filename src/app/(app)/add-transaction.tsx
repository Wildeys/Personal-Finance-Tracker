import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';

import type { TransactionFormType } from '@/components/transaction-form';
import { TransactionForm } from '@/components/transaction-form';
import { FocusAwareStatusBar, Text, View } from '@/components/ui';
import { translate } from '@/lib';
import { useStores } from '@/stores';

export default observer(function AddTransaction() {
  const router = useRouter();
  const { finance } = useStores();

  const onSubmit = (data: TransactionFormType) => {
    finance.addTransaction({
      amount: Number(data.amount),
      type: data.type,
      category: data.category,
      note: data.note?.trim() || undefined,
    });
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-white px-5 pt-16">
      <FocusAwareStatusBar />
      <Text className="mb-6 text-center text-xl font-bold">
        {translate('finance.add_transaction')}
      </Text>
      <TransactionForm onSubmit={onSubmit} onCancel={() => router.replace('/')} />
    </View>
  );
});
