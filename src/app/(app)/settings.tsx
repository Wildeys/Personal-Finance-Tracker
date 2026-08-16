import { observer } from 'mobx-react-lite';
import React from 'react';
import { Alert } from 'react-native';

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
import { Trash } from '@/components/ui/icons';
import { translate } from '@/lib';
import { useAuth } from '@/providers/auth-provider';
import { useStores } from '@/stores';
import { FINANCE_GREEN, FINANCE_RED, getCategoryColor } from '@/utils';

export default observer(function Settings() {
  const { signOut } = useAuth();
  const { finance } = useStores();
  const [newCategory, setNewCategory] = React.useState('');

  const onAdd = () => {
    const added = finance.addCategory(newCategory);
    if (added) setNewCategory('');
  };

  const onClear = () => {
    Alert.alert(
      translate('finance.clear_all'),
      translate('finance.clear_confirm'),
      [
        { text: translate('finance.cancel'), style: 'cancel' },
        {
          text: translate('finance.delete'),
          style: 'destructive',
          onPress: () => finance.clearTransactions(),
        },
      ]
    );
  };

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 px-5 pb-10 pt-16">
          <Text className="mb-6 text-3xl font-bold">
            {translate('settings.title')}
          </Text>

          <Text className="mb-3 text-lg font-bold">
            {translate('finance.categories')}
          </Text>
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

          {finance.categories.map((name) => (
            <View
              key={name}
              className="flex-row items-center border-b border-neutral-100 py-3"
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
                onPress={() => finance.removeCategory(name)}
                hitSlop={8}
              >
                <Trash color={FINANCE_RED} />
              </Pressable>
            </View>
          ))}

          <Text className="mb-2 mt-8 text-lg font-bold">
            {translate('finance.actions')}
          </Text>

          <Pressable
            onPress={onClear}
            className="flex-row items-center justify-between py-3"
          >
            <Text className="font-medium" style={{ color: FINANCE_RED }}>
              {translate('finance.clear_all')}
            </Text>
            <Trash color={FINANCE_RED} />
          </Pressable>

          <View className="mt-2 rounded-xl border border-neutral-200">
            <ThemeItem />
            <LanguageItem />
          </View>

          <Pressable onPress={() => signOut()} className="mt-6 py-3">
            <Text className="text-base font-semibold" style={{ color: FINANCE_RED }}>
              {translate('settings.logout')}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
});
