import { useEffect, useState } from 'react';
import TransactionApi from '../api/TransactionApi';
import Transaction from '../models/Transaction'
import TableTransactions from '../components/TableTransactions';

const TableContainer = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(true);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        TransactionApi.getTransactions()
        .then(setTransactions)
        .then(() => setLoading(false));
    }, []);

    return (
        <>
        {!loading && <TableTransactions  transactions={transactions} />}
        </>
    );
};

export default TableContainer;
