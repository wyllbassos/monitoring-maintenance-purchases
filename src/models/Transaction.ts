import { v4 as uuid } from 'uuid';

class Transaction {
  id: string;

  date: Date;

  title: string;

  type: 'income' | 'outcome';

  value: number;

  total: number;

  constructor({ title, value, type, total }: Omit<Transaction, 'id' | 'date'>) {
    this.id = uuid();
    this.date = new Date();
    this.title = title;
    this.type = type;
    this.value = value;
    this.total = total;
  }
}

export default Transaction;
