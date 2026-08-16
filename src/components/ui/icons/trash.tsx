import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Trash({ color = '#E53935', ...props }: SvgProps) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M9 3h6m-9 4h12m-1.5 0-.7 11.2a1.8 1.8 0 0 1-1.8 1.7H8a1.8 1.8 0 0 1-1.8-1.7L5.5 7"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 11v6M14 11v6"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
    </Svg>
  );
}
