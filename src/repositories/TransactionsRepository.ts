import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface ArrayOfInfos {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ArrayOfInfos {
    const allTransactions = this.transactions;

    const balance = this.getBalance();

    return { transactions: allTransactions, balance };
  }

  public getBalance(): Balance {
    function getSum(totalValue: number, value: number): number {
      return totalValue + value;
    }

    const outcomes: number[] = [];
    const incomes: number[] = [];

    this.transactions.map(trans => {
      if (trans.type === 'income') {
        incomes.push(trans.value);
        return incomes;
      }
      outcomes.push(trans.value);
      return outcomes;
    });

    const income = incomes.reduce(getSum, 0);
    const outcome = outcomes.reduce(getSum, 0);

    const total = income - outcome;

    const balance = { income, outcome, total };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
