export const FINANCE_GREEN = '#2E7D32';
export const FINANCE_RED = '#E53935';

const CATEGORY_COLORS: Record<string, string> = {
  Food: '#2E7D32',
  Transport: '#1E88E5',
  Utilities: '#F9A825',
  Shopping: '#8E24AA',
  Health: '#E53935',
  Entertainment: '#FB8C00',
  Salary: '#43A047',
  Other: '#607D8B',
};

const FALLBACK_COLORS = [
  '#2E7D32',
  '#1E88E5',
  '#F9A825',
  '#8E24AA',
  '#E53935',
  '#FB8C00',
  '#00897B',
  '#5E35B1',
];

export function formatCurrency(amount: number): string {
  const abs = Math.abs(amount).toFixed(2);
  const withCommas = abs.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${withCommas}`;
}

export function formatTransactionDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getGreetingKey(): 'morning' | 'afternoon' | 'evening' {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

export function getCategoryColor(name: string): string {
  if (CATEGORY_COLORS[name]) return CATEGORY_COLORS[name];
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}
