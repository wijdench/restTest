import { FETCH_PARANS_GET, UrlTransactions }  from '../../app/constants';
import Transaction from '../../app/models/Transaction';
import { TransactionResponse } from '../../app/transfer/TransactionAssembler';
import TransactionApi from '../../app/api/TransactionApi';

const fetchMock = jest.fn();
global.fetch = fetchMock;

const firstTransactionResponse : TransactionResponse = {
    Date: "2021-05-17",
    Company: "Company X",
    Ledger: "Expenses",
    Amount: "1000",
};

const secondTransactionResponse : TransactionResponse = {
    Date: "2021-05-18",
    Company: "Company Y",
    Ledger: "Expenses",
    Amount: "2000",
};

const JSON_RESPONSE: any = {
    totalCount: 5,
    page: 1,
    transactions: [firstTransactionResponse, secondTransactionResponse]
};

afterEach(() => {
    jest.clearAllMocks();
});

describe('Given transaction api', () => {
    let getPromise: Promise<Array<Transaction>>;

    describe('When fetch transactions', () => {
        beforeEach(() =>{
            const json = jest.fn().mockResolvedValue(JSON_RESPONSE);
            fetchMock.mockResolvedValue({ json });
            TransactionApi.getTransactions();
        });

        it('Then the request call the correct endpoint first time to get the totalCount and then call all pages', () => {
            expect(fetch).toHaveBeenCalledWith(`${UrlTransactions}/1.json`, FETCH_PARANS_GET);
            expect(fetch).toHaveBeenCalledWith(`${UrlTransactions}/1.json`, FETCH_PARANS_GET);
            expect(fetch).toHaveBeenCalledWith(`${UrlTransactions}/2.json`, FETCH_PARANS_GET);
            expect(fetch).toHaveBeenCalledWith(`${UrlTransactions}/3.json`, FETCH_PARANS_GET);
            expect(fetch).toHaveBeenCalledWith(`${UrlTransactions}/4.json`, FETCH_PARANS_GET);
            expect(fetch).toHaveBeenCalledWith(`${UrlTransactions}/5.json`, FETCH_PARANS_GET);
            
        });

    });
});