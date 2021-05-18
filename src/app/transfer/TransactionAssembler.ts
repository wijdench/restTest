import Transaction from '../models/Transaction';
import DateFormatter from '../utils/DateFormatter';

export interface TransactionResponse {
    Date: string;
    Company: string;
    Ledger: string;
    Amount: string;
}

export const responseToTransaction= (transaction: TransactionResponse): Transaction => new Transaction({
    Date: DateFormatter(transaction.Date),
    Company: transaction.Company,
    Account: transaction.Ledger,
    Amount: parseFloat(transaction.Amount),
});

export const responseToTransactions = (transactions: TransactionResponse[]): Transaction[] => transactions.map(responseToTransaction);