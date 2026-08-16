/* eslint-disable react/no-unstable-nested-components */
import { Redirect, Tabs } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useAuth } from '@/providers/auth-provider';
import {
  Home as HomeIcon,
  PlusCircle,
  Settings as SettingsIcon,
} from '@/components/ui/icons';
import { translate } from '@/lib';
import { FINANCE_GREEN } from '@/utils';

export default observer(function TabLayout() {
  const { status, isFirstTime } = useAuth();

  if (isFirstTime) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  if (status === 'signOut') {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: FINANCE_GREEN,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarStyle: {
          borderTopColor: '#E5E7EB',
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: translate('finance.home'),
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          tabBarButtonTestID: 'home-tab',
        }}
      />
      <Tabs.Screen
        name="add-transaction"
        options={{
          title: translate('finance.add_transaction'),
          tabBarIcon: ({ color }) => <PlusCircle color={color} />,
          tabBarButtonTestID: 'add-tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: translate('finance.settings'),
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarButtonTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
});
