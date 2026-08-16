import React from 'react';

import { Pressable, Text, View } from '@/components/ui';
import { FINANCE_GREEN, getInitials } from '@/utils';

type Props = {
  name?: string;
  email?: string;
  size?: number;
  onPress?: () => void;
};

export function UserAvatar({ name, email, size = 40, onPress }: Props) {
  const initials = getInitials(name, email);
  const fontSize = Math.max(12, Math.round(size * 0.36));

  const inner = (
    <View
      className="items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: FINANCE_GREEN,
      }}
    >
      <Text className="font-bold text-white" style={{ fontSize }}>
        {initials}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} hitSlop={8}>
        {inner}
      </Pressable>
    );
  }

  return inner;
}
