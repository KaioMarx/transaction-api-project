import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, title, type }: CreateTransaction): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (!title) {
      throw Error('Transactions missing title');
    }

    if (!(type === 'income' || type === 'outcome')) {
      throw Error('Transactions missing type');
    }

    if (value <= 0) {
      throw Error('Value invalid to do transactions');
    }

    if (type === 'outcome' && value > total) {
      throw Error('the withdraw transaction exceeds the disposable income');
    }

    const transaction = this.transactionsRepository.create({
      type,
      title,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
