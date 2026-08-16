import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function ArrowDown({ color = '#fff', ...props }: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 5v14M6 13l6 6 6-6"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ArrowUp({ color = '#fff', ...props }: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 19V5M6 11l6-6 6 6"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
