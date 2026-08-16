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
  'Other',
];

export class FinanceStore {
  transactions: Transaction[] = [];
  categories: string[] = [...DEFAULT_CATEGORIES];

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'FinanceStore',
      properties: ['transactions', 'categories'],
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
    this.categories.push(trimmed);
    return true;
  }

  removeCategory(name: string) {
    this.categories = this.categories.filter((c) => c !== name);
  }

  clearTransactions() {
    this.transactions = [];
  }

  hydrate = async (): Promise<void> => {
    await hydrateStore(this);
  };
}
