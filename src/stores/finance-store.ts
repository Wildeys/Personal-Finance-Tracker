import { makeAutoObservable } from 'mobx';
import { makePersistable, hydrateStore } from 'mobx-persist-store';

export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  note?: string;
  createdAt: string;
};

export const DEFAULT_CATEGORIES = [
  'Food',
  'Transport',
  'Utilities',
  'Shopping',
  'Health',
  'Entertainment',
  'Salary',
  'Work',
  'Other',
];

export type CurrencyCode = 'USD' | 'MVR';

export class FinanceStore {
  transactions: Transaction[] = [];
  categories: string[] = [...DEFAULT_CATEGORIES];
  removedDefaults: string[] = [];
  currency: CurrencyCode = 'MVR';

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'FinanceStore',
      properties: ['transactions', 'categories', 'removedDefaults', 'currency'],
    });
  }

  get incomeTotal(): number {
    return this.transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get expenseTotal(): number {
    return this.transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get balance(): number {
    return this.incomeTotal - this.expenseTotal;
  }

  addTransaction(input: Omit<Transaction, 'id' | 'createdAt'>) {
    this.transactions.unshift({
      ...input,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    });
  }

  deleteTransaction(id: string) {
    this.transactions = this.transactions.filter((t) => t.id !== id);
  }

  addCategory(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return false;
    const exists = this.categories.some(
      (c) => c.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) return false;
    this.removedDefaults = this.removedDefaults.filter(
      (d) => d !== trimmed.toLowerCase()
    );
    this.categories.push(trimmed);
    return true;
  }

  removeCategory(name: string) {
    const isDefault = DEFAULT_CATEGORIES.some(
      (d) => d.toLowerCase() === name.toLowerCase()
    );
    if (isDefault && !this.removedDefaults.includes(name.toLowerCase())) {
      this.removedDefaults.push(name.toLowerCase());
    }
    this.categories = this.categories.filter((c) => c !== name);
  }

  setCurrency(currency: CurrencyCode) {
    this.currency = currency;
  }

  clearTransactions() {
    this.transactions = [];
  }

  ensureDefaultCategories() {
    const byLower = new Map(
      this.categories.map((name) => [name.toLowerCase(), name])
    );
    const merged: string[] = [];

    for (const name of DEFAULT_CATEGORIES) {
      const key = name.toLowerCase();
      if (this.removedDefaults.includes(key)) continue;
      merged.push(byLower.get(key) ?? name);
      byLower.delete(key);
    }

    for (const name of this.categories) {
      const key = name.toLowerCase();
      if (byLower.has(key)) {
        merged.push(name);
        byLower.delete(key);
      }
    }

    this.categories = merged;
  }

  hydrate = async (): Promise<void> => {
    await hydrateStore(this);
    this.ensureDefaultCategories();
  };
}
