import { cssInterop } from 'nativewind';
import Svg from 'react-native-svg';

export * from './button';
export { default as colors } from './colors';
export * from './focus-aware-status-bar';
export * from './input';
export * from './modal';
export * from './select';
export * from './text';
export * from './themed-rn';

export { ActivityIndicator, TouchableOpacity } from 'react-native';
export { SafeAreaView } from 'react-native-safe-area-context';

//Apply cssInterop to Svg to resolve className string into style
cssInterop(Svg, {
  className: {
    target: 'style',
  },
});
