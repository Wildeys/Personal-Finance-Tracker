import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { TransactionItem } from '@/components/transaction-item';
import {
  FlashList,
  FocusAwareStatusBar,
  Pressable,
  Text,
  View,
} from '@/components/ui';
import { Back } from '@/components/ui/icons';
import { translate } from '@/lib';
import { useStores } from '@/stores';

export default observer(function Transactions() {
  const router = useRouter();
  const { finance, uiTheme } = useStores();
  const data = finance.transactions.slice();
  const extraData = `${data[0]?.id ?? ''}-${data.length}-${finance.currency}-${uiTheme.effectiveAppearance}`;

  return (
    <View className="flex-1 bg-white px-5 dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <View className="flex-row items-center pt-14">
        <Pressable
          onPress={() => router.back()}
          className="size-10 items-center justify-center rounded-full bg-finance-green/15"
          hitSlop={8}
        >
          <Back />
        </Pressable>
        <Text className="mx-3 flex-1 text-center text-xl font-bold">
          {translate('finance.history')}
        </Text>
        <View className="size-10" />
      </View>
      <FlashList
        data={data}
        extraData={extraData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 12 }}
        ListEmptyComponent={
          <Text className="py-8 text-center text-neutral-500 dark:text-neutral-400">
            {translate('finance.empty')}
          </Text>
        }
      />
    </View>
  );
});
