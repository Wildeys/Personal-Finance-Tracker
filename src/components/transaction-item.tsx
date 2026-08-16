import { observer } from 'mobx-react-lite';
import React from 'react';
import { Alert, Pressable } from 'react-native';

import { Text, View } from '@/components/ui';
import { ArrowDown, ArrowUp, Trash } from '@/components/ui/icons';
import { translate } from '@/lib';
import type { Transaction } from '@/stores';
import { useStores } from '@/stores';
import {
  FINANCE_GREEN,
  FINANCE_RED,
  formatCurrency,
  formatTransactionDate,
} from '@/utils';

type Props = {
  item: Transaction;
};

export const TransactionItem = observer(({ item }: Props) => {
  const { finance } = useStores();
  const isIncome = item.type === 'income';
  const title = item.note?.trim() ? item.note : item.category;
  const typeLabel = isIncome
    ? translate('finance.income')
    : translate('finance.expense');

  const onDelete = () => {
    Alert.alert(translate('finance.delete'), translate('finance.delete_confirm'), [
      { text: translate('finance.cancel'), style: 'cancel' },
      {
        text: translate('finance.delete'),
        style: 'destructive',
        onPress: () => finance.deleteTransaction(item.id),
      },
    ]);
  };

  return (
    <View className="flex-row items-center py-3">
      <View
        className="mr-3 size-11 items-center justify-center rounded-full"
        style={{ backgroundColor: isIncome ? FINANCE_GREEN : FINANCE_RED }}
      >
        {isIncome ? <ArrowDown color="#fff" /> : <ArrowUp color="#fff" />}
      </View>
      <View className="flex-1">
        <Text className="font-semibold" numberOfLines={1}>
          {title}
        </Text>
        <Text className="text-sm text-neutral-500 dark:text-neutral-400">
          {typeLabel} • {item.category}
        </Text>
      </View>
      <View className="items-end">
        <Text
          className="font-semibold"
          style={{ color: isIncome ? FINANCE_GREEN : FINANCE_RED }}
        >
          {isIncome ? '+' : '-'}
          {formatCurrency(item.amount, finance.currency)}
        </Text>
        <Text className="text-xs text-neutral-400 dark:text-neutral-500">
          {formatTransactionDate(item.createdAt)}
        </Text>
      </View>
      <Pressable onPress={onDelete} className="ml-2 p-1" hitSlop={8}>
        <Trash color={FINANCE_RED} width={18} height={18} />
      </Pressable>
    </View>
  );
});
