import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const valueString = String(value);
    const valueNumber = Number.parseFloat(valueString);

    const valueSplit = valueString.split('.');
    if (type !== 'income' && type !== 'outcome') {
      throw new Error("The type isn't a 'income' or 'outcome'");
    }
    if (Number.isNaN(valueNumber)) {
      throw new Error("The value isn't a Number");
    }
    if (valueSplit.length > 1 && valueSplit[1].length > 2) {
      throw new Error('The max of fractional Part in value is 2 digits');
    }
    if (value <= 0) {
      throw new Error("The value isn't a positive number");
    }
    if (
      type === 'outcome' &&
      valueNumber > this.transactionsRepository.getBalance().total
    ) {
      throw new Error("The account don't have a balance to this transaction");
    }
    return this.transactionsRepository.create({
      title,
      value: valueNumber,
      type,
    });
  }
}

export default CreateTransactionService;
