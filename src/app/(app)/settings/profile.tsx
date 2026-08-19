import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { type TextInput as RNTextInput } from 'react-native';

import { CurrencyItem } from '@/components/settings/currency-item';
import { UserAvatar } from '@/components/user-avatar';
import {
  FocusAwareStatusBar,
  Input,
  Pressable,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import {
  Back,
  ArrowRight,
  CalendarIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  ShieldIcon,
  SignOutIcon,
  UserIcon,
} from '@/components/ui/icons';
import { translate } from '@/lib';
import { useAuth } from '@/providers/auth-provider';
import { FINANCE_GREEN, FINANCE_RED, formatTransactionDate, notify } from '@/utils';

export default observer(function Profile() {
  const router = useRouter();
  const {
    name,
    email,
    phone,
    memberSince,
    updateProfile,
    signOut,
  } = useAuth();
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState({
    name,
    email,
    password: '',
    phone,
  });
  const passwordRef = React.useRef<RNTextInput>(null);

  const displayName = name.trim() || translate('profile.no_name');

  const startEditing = (focusPassword = false) => {
    setDraft({ name, email, password: '', phone });
    setEditing(true);
    if (focusPassword) {
      requestAnimationFrame(() => passwordRef.current?.focus());
    }
  };

  const onHeaderAction = () => {
    if (editing) {
      const { password: nextPassword, ...rest } = draft;
      updateProfile(
        nextPassword.trim()
          ? { ...rest, password: nextPassword }
          : rest
      );
      setEditing(false);
      return;
    }
    startEditing();
  };

  const onChangePassword = () => startEditing(true);

  const onSecurity = () => {
    notify(
      translate('profile.security_title'),
      translate('profile.security_body')
    );
  };

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="flex-row items-center px-5 pt-14">
          <Pressable
            onPress={() => router.back()}
            className="size-10 items-center justify-center rounded-full bg-finance-green/15"
            hitSlop={8}
          >
            <Back />
          </Pressable>
          <Text className="flex-1 text-center text-2xl font-bold">
            {translate('profile.title')}
          </Text>
          <Pressable onPress={onHeaderAction} hitSlop={8} className="min-w-10">
            <Text className="text-right font-semibold" style={{ color: FINANCE_GREEN }}>
              {editing ? translate('profile.save') : translate('profile.edit')}
            </Text>
          </Pressable>
        </View>

        <View className="mt-6 items-center px-5">
          <UserAvatar name={name} email={email} size={88} />
          <Text className="mt-3 text-xl font-bold">{displayName}</Text>
          {email ? (
            <Text className="mt-1 text-neutral-500 dark:text-neutral-400">
              {email}
            </Text>
          ) : null}
        </View>

        {editing ? (
          <View className="mt-6 px-5">
            <Input
              label={translate('profile.full_name')}
              value={draft.name}
              onChangeText={(value) => setDraft((prev) => ({ ...prev, name: value }))}
            />
            <Input
              label={translate('profile.email')}
              value={draft.email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(value) => setDraft((prev) => ({ ...prev, email: value }))}
            />
            <Input
              ref={passwordRef}
              label={translate('profile.password')}
              value={draft.password}
              secureTextEntry
              placeholder={translate('profile.password_unchanged')}
              onChangeText={(value) =>
                setDraft((prev) => ({ ...prev, password: value }))
              }
            />
            <Input
              label={translate('profile.phone')}
              value={draft.phone}
              keyboardType="phone-pad"
              placeholder={translate('profile.phone_placeholder')}
              onChangeText={(value) => setDraft((prev) => ({ ...prev, phone: value }))}
            />
          </View>
        ) : (
          <>
            <Text className="mb-2 mt-8 px-5 text-lg font-bold">
              {translate('profile.account_info')}
            </Text>
            <View className="mx-5 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800">
              <InfoRow
                icon={<UserIcon />}
                label={translate('profile.full_name')}
                value={displayName}
              />
              <InfoRow
                icon={<MailIcon />}
                label={translate('profile.email')}
                value={email || translate('profile.empty')}
              />
              <InfoRow
                icon={<PhoneIcon />}
                label={translate('profile.phone')}
                value={phone.trim() || translate('profile.no_phone')}
              />
              <InfoRow
                icon={<CalendarIcon />}
                label={translate('profile.member_since')}
                value={
                  memberSince
                    ? formatTransactionDate(memberSince)
                    : translate('profile.empty')
                }
              />
            </View>
          </>
        )}

        <Text className="mb-2 mt-8 px-5 text-lg font-bold">
          {translate('profile.account_prefs')}
        </Text>
        <View className="mx-5 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800">
          <InfoRow
            icon={<LockIcon />}
            label={translate('profile.change_password')}
            onPress={onChangePassword}
          />
          <InfoRow
            icon={<ShieldIcon />}
            label={translate('profile.security')}
            onPress={onSecurity}
          />
          <CurrencyItem text="profile.preferred_currency" />
        </View>

        <Pressable
          onPress={() => signOut()}
          className="mx-5 mt-8 flex-row items-center justify-center rounded-xl border py-3.5"
          style={{ borderColor: FINANCE_RED }}
        >
          <SignOutIcon color={FINANCE_RED} />
          <Text className="ml-2 font-semibold" style={{ color: FINANCE_RED }}>
            {translate('profile.sign_out')}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
});

function InfoRow({
  icon,
  label,
  value,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      pointerEvents={onPress ? 'auto' : 'none'}
      className="w-full flex-row items-center justify-between px-4 py-3"
    >
      <View className="flex-1 flex-row items-center pr-2">
        <View className="pr-3">{icon}</View>
        <View className="flex-1">
          <Text className="text-sm text-neutral-500 dark:text-neutral-400">
            {label}
          </Text>
          {value ? <Text className="font-medium">{value}</Text> : null}
        </View>
      </View>
      <ArrowRight />
    </Pressable>
  );
}
