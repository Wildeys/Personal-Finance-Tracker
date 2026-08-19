import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { TransactionItem } from '@/components/transaction-item';
import { UserAvatar } from '@/components/user-avatar';
import {
  FlashList,
  FocusAwareStatusBar,
  Pressable,
  Text,
  View,
} from '@/components/ui';
import { ArrowDown, ArrowUp } from '@/components/ui/icons';
import { translate, type TxKeyPath } from '@/lib';
import { useAuth } from '@/providers/auth-provider';
import { useStores } from '@/stores';
import {
  FINANCE_GREEN,
  FINANCE_RED,
  formatCurrency,
  getGreetingKey,
} from '@/utils';

const RECENT_LIMIT = 5;

const HomeHeader = observer(function HomeHeader() {
  const router = useRouter();
  const { finance } = useStores();
  const { name, email } = useAuth();
  const greetingKey = getGreetingKey();
  const displayName = name.trim();
  const greetingNameKey = `finance.greeting_${greetingKey}_name` as TxKeyPath;
  const greeting = displayName
    ? translate(greetingNameKey, { name: displayName })
    : greetingKey === 'morning'
      ? translate('finance.greeting_morning')
      : greetingKey === 'afternoon'
        ? translate('finance.greeting_afternoon')
        : translate('finance.greeting_evening');

  return (
    <View className="pt-16">
      <View className="flex-row items-start justify-between">
        <View className="mr-3 flex-1">
          <Text className="text-3xl font-bold">{translate('finance.home')}</Text>
          <Text className="mt-1 text-neutral-500 dark:text-neutral-400">
            {greeting}
          </Text>
        </View>
        <UserAvatar
          name={name}
          email={email}
          size={44}
          onPress={() => router.push('/settings/profile')}
        />
      </View>

      <View className="mt-5 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800">
        <Text className="text-sm text-neutral-500 dark:text-neutral-400">
          {translate('finance.current_balance')}
        </Text>
        <Text
          className="mt-1 text-4xl font-bold"
          style={{
            color: finance.balance < 0 ? FINANCE_RED : FINANCE_GREEN,
          }}
        >
          {formatCurrency(finance.balance, finance.currency)}
        </Text>
        <View className="mt-4 flex-row gap-2">
          <View className="flex-1 flex-row items-center rounded-xl bg-finance-green/10 px-3 py-2.5">
            <View
              className="mr-2 size-8 items-center justify-center rounded-full"
              style={{ backgroundColor: FINANCE_GREEN }}
            >
              <ArrowDown color="#fff" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-neutral-500 dark:text-neutral-400">
                {translate('finance.income')}
              </Text>
              <Text className="text-sm font-semibold" style={{ color: FINANCE_GREEN }}>
                {formatCurrency(finance.incomeTotal, finance.currency)}
              </Text>
            </View>
          </View>
          <View className="flex-1 flex-row items-center rounded-xl bg-finance-red/10 px-3 py-2.5">
            <View
              className="mr-2 size-8 items-center justify-center rounded-full"
              style={{ backgroundColor: FINANCE_RED }}
            >
              <ArrowUp color="#fff" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-neutral-500 dark:text-neutral-400">
                {translate('finance.expense')}
              </Text>
              <Text className="text-sm font-semibold" style={{ color: FINANCE_RED }}>
                {formatCurrency(finance.expenseTotal, finance.currency)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mb-1 mt-6 flex-row items-center justify-between">
        <Text className="text-lg font-bold">
          {translate('finance.recent_transactions')}
        </Text>
        <Pressable
          onPress={() => router.push('/transactions')}
          hitSlop={8}
          className="flex-row items-center"
        >
          <Text className="font-semibold" style={{ color: FINANCE_GREEN }}>
            {translate('finance.view_all')} {'>'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
});

export default observer(function Home() {
  const { finance, uiTheme } = useStores();

  const data = finance.transactions.slice(0, RECENT_LIMIT);
  const extraData = `${data[0]?.id ?? ''}-${finance.transactions.length}-${finance.currency}-${uiTheme.effectiveAppearance}`;

  return (
    <View className="flex-1 bg-white px-5 dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <HomeHeader />
      <FlashList
        data={data}
        extraData={extraData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <Text className="py-8 text-center text-neutral-500 dark:text-neutral-400">
            {translate('finance.empty')}
          </Text>
        }
      />
    </View>
  );
});
