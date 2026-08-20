import React from 'react';
import { Keyboard, Platform } from 'react-native';

/**
 * Current on-screen keyboard height in px (0 when closed).
 *
 * Needed because `react-native-edge-to-edge` disables Android's
 * `adjustResize`, and `KeyboardAvoidingView` / `automaticallyAdjustKeyboardInsets`
 * are both iOS-only in practice.
 */
export function useKeyboardHeight(): number {
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    // iOS fires the "will" events early, which animates in step with the
    // keyboard. Android only reliably fires the "did" events.
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) =>
      setHeight(e.endCoordinates.height)
    );
    const hideSub = Keyboard.addListener(hideEvent, () => setHeight(0));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return height;
}
