import { observer } from 'mobx-react-lite';
import React from 'react';
import { type ScrollView as RNScrollView } from 'react-native';

import { CurrencyItem } from '@/components/settings/currency-item';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import {
  Button,
  FocusAwareStatusBar,
  Input,
  Pressable,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { GridIcon, Trash } from '@/components/ui/icons';
import { translate } from '@/lib';
import { useStores } from '@/stores';
import { FINANCE_GREEN, FINANCE_RED, confirm, getCategoryColor, notify } from '@/utils';

export default observer(function Settings() {
  const { finance } = useStores();
  const [newCategory, setNewCategory] = React.useState('');
  const categoryListRef = React.useRef<RNScrollView>(null);

  const onAdd = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;

    const added = finance.addCategory(trimmed);
    if (added) {
      setNewCategory('');
      requestAnimationFrame(() => {
        categoryListRef.current?.scrollToEnd({ animated: false });
      });
      return;
    }

    notify(
      translate('finance.categories'),
      translate('finance.category_exists', { name: trimmed })
    );
  };

  const onDeleteCategory = (name: string) => {
    const count = finance.transactions.filter((t) => t.category === name).length;
    const message =
      count > 0
        ? translate('finance.delete_category_in_use', { name, count })
        : translate('finance.delete_category_confirm', { name });
    confirm(
      translate('finance.delete'),
      message,
      () => finance.removeCategory(name),
      translate('finance.delete'),
      translate('finance.cancel')
    );
  };

  const onClear = () => {
    confirm(
      translate('finance.clear_all'),
      translate('finance.clear_confirm'),
      () => finance.clearTransactions(),
      translate('finance.delete'),
      translate('finance.cancel')
    );
  };

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="flex-1 bg-white dark:bg-neutral-900">
        <View className="flex-1 px-5 pb-10 pt-16">
          <Text className="mb-6 text-3xl font-bold">
            {translate('settings.title')}
          </Text>

          <View className="mb-3 flex-row items-center">
            <GridIcon />
            <Text className="ml-2 text-lg font-bold">
              {translate('finance.categories')}
            </Text>
          </View>
          <View className="mb-4 flex-row items-center gap-2">
            <View className="flex-1">
              <Input
                placeholder={translate('finance.new_category')}
                value={newCategory}
                onChangeText={setNewCategory}
              />
            </View>
            <Button
              label={translate('finance.add')}
              onPress={onAdd}
              className="h-12 rounded-xl px-5"
              textClassName="text-white"
              style={{ backgroundColor: FINANCE_GREEN }}
            />
          </View>

          <ScrollView
            ref={categoryListRef}
            nestedScrollEnabled
            className="mb-2 max-h-[280px]"
          >
            {finance.categories.map((name) => (
              <View
                key={name}
                className="flex-row items-center border-b border-neutral-100 py-3 dark:border-neutral-700"
              >
                <View
                  className="mr-3 size-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: getCategoryColor(name) }}
                >
                  <Text className="text-sm font-bold text-white">
                    {name.slice(0, 1).toUpperCase()}
                  </Text>
                </View>
                <Text className="flex-1 font-medium">{name}</Text>
                <Pressable
                  onPress={() => onDeleteCategory(name)}
                  hitSlop={8}
                >
                  <Trash color={FINANCE_RED} />
                </Pressable>
              </View>
            ))}
          </ScrollView>

          <Text className="mb-2 mt-8 text-lg font-bold">
            {translate('finance.preferences')}
          </Text>

          <View className="mb-2 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800">
            <CurrencyItem />
            <ThemeItem />
            <LanguageItem />
          </View>

          <Pressable
            onPress={onClear}
            className="flex-row items-center justify-between py-3"
          >
            <Text className="font-medium" style={{ color: FINANCE_RED }}>
              {translate('finance.clear_all')}
            </Text>
            <Trash color={FINANCE_RED} />
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
});
