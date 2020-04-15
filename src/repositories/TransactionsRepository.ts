import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  // income -> soma de todos os valores de type income
  // outcome -> soma de todos os valors de type outcome
  // total -> valor income - outcome
  public getBalance(): Balance {
    const income = this.getTotalByType('income');
    const outcome = this.getTotalByType('outcome');
    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  private getTotalByType(type: 'income' | 'outcome'): number {
    const transactions = this.all();

    const value = transactions
      .filter(transaction => transaction.type === type)
      .map(transaction => transaction.value)
      .reduce((total, currentValue) => {
        return total + currentValue;
      }, 0);

    return value;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
