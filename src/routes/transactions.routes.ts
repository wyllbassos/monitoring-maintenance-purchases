import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Category from '../models/Category';

// import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request: Request, response: Response) => {
  // TODO
});

transactionsRouter.post('/', async (request: Request, response: Response) => {
  const { title, value, type, category } = request.body;

  const createTransactionService = new CreateTransactionService();

  const transactions = await createTransactionService.execute({
    title,
    value,
    type,
    category,
  });

  const categoryRepository = getRepository(Category);

  const transactionCategory = await categoryRepository.findOne(
    transactions.category_id,
  );

  return response.json({
    ...transactions,
    category_id: undefined,
    category: transactionCategory,
  });
});

transactionsRouter.delete(
  '/:id',
  async (request: Request, response: Response) => {
    // TODO
  },
);

transactionsRouter.post(
  '/import',
  async (request: Request, response: Response) => {
    // TODO
  },
);

export default transactionsRouter;
