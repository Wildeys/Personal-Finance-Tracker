import {
  FlashList as NFlashList,
  type FlashListProps,
  type FlashListRef,
} from '@shopify/flash-list';
import { cssInterop } from 'nativewind';
import { useColorScheme } from 'nativewind';
import React from 'react';
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  TextInput as RNTextInput,
  View as RNView,
  type KeyboardAvoidingViewProps,
  type PressableProps,
  type ScrollViewProps,
  type TextInputProps,
  type ViewProps,
} from 'react-native';

export const View = React.forwardRef<RNView, ViewProps>(function View(
  props,
  ref
) {
  useColorScheme();
  return <RNView ref={ref} {...props} />;
});

export const Pressable = React.forwardRef<
  React.ElementRef<typeof RNPressable>,
  PressableProps
>(function Pressable(props, ref) {
  useColorScheme();
  return <RNPressable ref={ref} {...props} />;
});

export const ScrollView = React.forwardRef<RNScrollView, ScrollViewProps>(
  function ScrollView(props, ref) {
    useColorScheme();
    return <RNScrollView ref={ref} {...props} />;
  }
);

export const KeyboardAvoidingView = React.forwardRef<
  React.ElementRef<typeof RNKeyboardAvoidingView>,
  KeyboardAvoidingViewProps
>(function KeyboardAvoidingView(props, ref) {
  useColorScheme();
  return <RNKeyboardAvoidingView ref={ref} {...props} />;
});

export const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  function TextInput(props, ref) {
    useColorScheme();
    return <RNTextInput ref={ref} {...props} />;
  }
);

export const FlashList = React.forwardRef(function FlashList<T>(
  props: FlashListProps<T>,
  ref: React.ForwardedRef<FlashListRef<T>>
) {
  useColorScheme();
  return <NFlashList ref={ref} {...props} />;
}) as <T>(
  props: FlashListProps<T> & { ref?: React.Ref<FlashListRef<T>> }
) => React.ReactElement | null;

cssInterop(View, { className: 'style' });
cssInterop(Pressable, { className: 'style' });
cssInterop(ScrollView, { className: 'style' });
cssInterop(KeyboardAvoidingView, { className: 'style' });
cssInterop(TextInput, { className: 'style' });
cssInterop(FlashList, { className: 'style' });
