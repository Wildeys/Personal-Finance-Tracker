import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

function Base({ children, ...props }: SvgProps & { children: React.ReactNode }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      {children}
    </Svg>
  );
}

export function FoodIcon({ color = '#2E7D32', ...props }: SvgProps) {
  return (
    <Base {...props}>
      <Path
        d="M8 3v8M6 3c0 3 2 4 2 8M10 3c0 3-2 4-2 8M8 11v10"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M16 4c0 4 2 5 2 8h-4c0-3 2-4 2-8ZM16 12v8"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Base>
  );
}

export function TransportIcon({ color = '#1E88E5', ...props }: SvgProps) {
  return (
    <Base {...props}>
      <Path
        d="M4 13h16l-1.2-5.2A2 2 0 0 0 16.9 6H7.1a2 2 0 0 0-1.9 1.8L4 13Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path d="M4 13v4h2.5M20 13v4h-2.5" stroke={color} strokeWidth={1.8} />
      <Circle cx={7.5} cy={18} r={1.7} stroke={color} strokeWidth={1.8} />
      <Circle cx={16.5} cy={18} r={1.7} stroke={color} strokeWidth={1.8} />
    </Base>
  );
}

export function UtilitiesIcon({ color = '#F9A825', ...props }: SvgProps) {
  return (
    <Base {...props}>
      <Path
        d="M12 3c3 4 5 6.2 5 9.2A5 5 0 0 1 7 12.2C7 9.2 9 7 12 3Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path d="M10 20h4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Base>
  );
}

export function ShoppingIcon({ color = '#8E24AA', ...props }: SvgProps) {
  return (
    <Base {...props}>
      <Path
        d="M6 8h12l-1 12H7L6 8Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path
        d="M9 8V7a3 3 0 0 1 6 0v1"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Base>
  );
}

export function HealthIcon({ color = '#E53935', ...props }: SvgProps) {
  return (
    <Base {...props}>
      <Path
        d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </Base>
  );
}

export function EntertainmentIcon({ color = '#FB8C00', ...props }: SvgProps) {
  return (
    <Base {...props}>
      <Rect x={3} y={6} width={18} height={13} rx={2} stroke={color} strokeWidth={1.8} />
      <Path d="M8 6 6 3M16 6l2-3" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Base>
  );
}

export function SalaryIcon({ color = '#43A047', ...props }: SvgProps) {
  return (
    <Base {...props}>
      <Rect x={3} y={6} width={18} height={12} rx={2} stroke={color} strokeWidth={1.8} />
      <Circle cx={12} cy={12} r={2.4} stroke={color} strokeWidth={1.8} />
    </Base>
  );
}

export function WorkIcon({ color = '#1565C0', ...props }: SvgProps) {
  return (
    <Base {...props}>
      <Rect x={3} y={8} width={18} height={12} rx={2} stroke={color} strokeWidth={1.8} />
      <Path
        d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8M3 13h18"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Base>
  );
}

export function OtherIcon({ color = '#607D8B', ...props }: SvgProps) {
  return (
    <Base {...props}>
      <Circle cx={6} cy={12} r={1.6} fill={color} />
      <Circle cx={12} cy={12} r={1.6} fill={color} />
      <Circle cx={18} cy={12} r={1.6} fill={color} />
    </Base>
  );
}

const CATEGORY_ICONS: Record<string, React.FC<SvgProps>> = {
  Food: FoodIcon,
  Transport: TransportIcon,
  Utilities: UtilitiesIcon,
  Shopping: ShoppingIcon,
  Health: HealthIcon,
  Entertainment: EntertainmentIcon,
  Salary: SalaryIcon,
  Work: WorkIcon,
  Other: OtherIcon,
};

export function hasCategoryIcon(name: string): boolean {
  return Boolean(CATEGORY_ICONS[name]);
}

export function CategoryGlyph({
  name,
  color,
  size = 22,
}: {
  name: string;
  color?: string;
  size?: number;
}) {
  const Icon = CATEGORY_ICONS[name];
  if (!Icon) return null;
  return <Icon color={color} width={size} height={size} />;
}
