import { useIsFocused } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Platform } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';

type Props = { hidden?: boolean };

export const FocusAwareStatusBar = ({ hidden = false }: Props) => {
  const isFocused = useIsFocused();
  const { colorScheme } = useColorScheme();
  if (Platform.OS === 'web') return null;

  // Light background needs dark icons, dark background needs light icons.
  const statusBarStyle = colorScheme === 'dark' ? 'light' : 'dark';

  return isFocused ? (
    <SystemBars style={statusBarStyle} hidden={hidden} />
  ) : null;
};