import { useEffect } from 'react';
import { Appearance, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useColorScheme } from 'nativewind';
import { StoresProvider, useStores } from '@/stores';
import { AuthProvider } from './auth-provider';

const ThemedApp = observer(({ children }: { children: React.ReactNode }) => {
  const { uiTheme } = useStores();
  const dark = uiTheme.effectiveAppearance === 'dark';
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    const next = uiTheme.isSystemAppearance ? 'system' : uiTheme.appearance;
    setColorScheme(next);
    Appearance.setColorScheme(
      uiTheme.isSystemAppearance ? null : uiTheme.appearance
    );
  }, [
    setColorScheme,
    uiTheme.isSystemAppearance,
    uiTheme.appearance,
    uiTheme.effectiveAppearance,
  ]);

  return (
    <View
      className={`flex-1 ${dark ? 'dark' : ''}`}
      style={[
        styles.container,
        { backgroundColor: dark ? '#171717' : '#ffffff' },
      ]}
    >
      <ThemeProvider value={uiTheme.navigationTheme}>
        <AuthProvider>
          <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </View>
  );
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StoresProvider>
        <ThemedApp>{children}</ThemedApp>
      </StoresProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
