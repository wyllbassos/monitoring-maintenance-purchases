import Transaction from '../models/Transaction';

interface Balance {
  date: Date;
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private privateBalance: Balance;

  constructor() {
    this.transactions = [];
    this.privateBalance = {
      date: new Date(),
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.privateBalance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction: Transaction = new Transaction({
      title,
      value,
      type,
      total: 0,
    });
    this.transactions.push(transaction);
    this.updateBalance();
    const { total } = this.getBalance();
    this.transactions[this.transactions.length - 1].total = total;
    return this.transactions[this.transactions.length - 1];
  }

  private updateBalance(): void {
    const income = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((total, { value }) => total + value, 0);

    const outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((total, { value }) => total + value, 0);

    const total = income - outcome;

    this.privateBalance = {
      date: new Date(),
      income,
      outcome,
      total,
    };
  }
}

export default TransactionsRepository;
