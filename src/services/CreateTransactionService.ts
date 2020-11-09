import { getRepository, Repository } from 'typeorm';

import AppError from '../errors/AppError';
import Category from '../models/Category';

import Transaction from '../models/Transaction';

import CreateCategoryService from './CreateCategoryService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

function checkIfValueIsValid(value: number): void {
  if (!value) {
    throw new AppError('The value field cannot be null');
  }

  const valueString = String(value);
  const valueNumber = Number.parseFloat(valueString);
  const valueSplit = valueString.split('.');

  if (Number.isNaN(valueNumber)) {
    throw new AppError("The value isn't a Number");
  }
  if (valueSplit.length > 1 && valueSplit[1].length > 2) {
    throw new AppError('The max of fractional Part in value is 2 digits');
  }
  if (value <= 0) {
    throw new AppError("The value isn't a positive number");
  }
}

function checkParms(
  { title, type, value }: Omit<Request, 'category'>,
  balance: number,
): void {
  if (!title) {
    throw new AppError('The title field cannot be null');
  }

  if (!type || (type !== 'income' && type !== 'outcome')) {
    throw new AppError('The type field must be income or outcome');
  }

  checkIfValueIsValid(value);

  console.log(type, value, balance);

  if (type === 'outcome' && value > balance) {
    throw new AppError("The account don't have a balance to this transaction");
  }
}

async function getBalance(
  transactionRepository: Repository<Transaction>,
): Promise<number> {
  const transactions = await transactionRepository.find();

  console.log(transactions);

  const income = transactions
    .filter(({ type }) => type === 'income')
    .reduce((total, { value }) => total + value, 0);

  const outcome = transactions
    .filter(({ type }) => type === 'outcome')
    .reduce((total, { value }) => total + value, 0);

  const total = income - outcome;
  return total;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);

    let categoryOfTransaction = new Category();

    const balance = await getBalance(transactionRepository);

    checkParms({ title, value, type }, balance);

    if (category) {
      const createCategoryService = new CreateCategoryService();

      categoryOfTransaction = await createCategoryService.execute({
        title: category,
      });
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: categoryOfTransaction.id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
