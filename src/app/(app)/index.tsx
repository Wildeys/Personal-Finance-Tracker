import { FlashList } from '@shopify/flash-list';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { TransactionItem } from '@/components/transaction-item';
import { FocusAwareStatusBar, Pressable, Text, View } from '@/components/ui';
import { translate } from '@/lib';
import { useStores } from '@/stores';
import {
  FINANCE_GREEN,
  FINANCE_RED,
  formatCurrency,
  getGreetingKey,
} from '@/utils';

const RECENT_LIMIT = 5;

export default observer(function Home() {
  const { finance } = useStores();
  const [showAll, setShowAll] = React.useState(false);
  const greetingKey = getGreetingKey();
  const greeting =
    greetingKey === 'morning'
      ? translate('finance.greeting_morning')
      : greetingKey === 'afternoon'
        ? translate('finance.greeting_afternoon')
        : translate('finance.greeting_evening');

  const all = finance.transactions.slice();
  const data = showAll ? all : all.slice(0, RECENT_LIMIT);
  const canViewAll = all.length > RECENT_LIMIT && !showAll;

  return (
    <View className="flex-1 bg-white">
      <FocusAwareStatusBar />
      <View className="px-5 pt-16">
        <Text className="text-3xl font-bold">{translate('finance.home')}</Text>
        <Text className="mt-1 text-neutral-500">{greeting}</Text>

        <View className="mt-5 rounded-2xl border border-neutral-200 bg-white p-5">
          <Text className="text-sm text-neutral-500">
            {translate('finance.current_balance')}
          </Text>
          <Text
            className="mt-1 text-4xl font-bold"
            style={{ color: FINANCE_GREEN }}
          >
            {formatCurrency(finance.balance)}
          </Text>
          <View className="mt-3 flex-row flex-wrap items-center">
            <Text className="text-sm" style={{ color: FINANCE_GREEN }}>
              {translate('finance.income')} {formatCurrency(finance.incomeTotal)}
            </Text>
            <Text className="mx-2 text-neutral-400">•</Text>
            <Text className="text-sm" style={{ color: FINANCE_RED }}>
              {translate('finance.expense')} {formatCurrency(finance.expenseTotal)}
            </Text>
          </View>
        </View>

        <Text className="mb-1 mt-6 text-lg font-bold">
          {translate('finance.recent_transactions')}
        </Text>
      </View>

      <FlashList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        ListEmptyComponent={
          <Text className="py-8 text-center text-neutral-500">
            {translate('finance.empty')}
          </Text>
        }
        ListFooterComponent={
          canViewAll ? (
            <Pressable onPress={() => setShowAll(true)} className="py-3">
              <Text className="text-center font-semibold" style={{ color: FINANCE_GREEN }}>
                {translate('finance.view_all')}
              </Text>
            </Pressable>
          ) : null
        }
      />
    </View>
  );
});
