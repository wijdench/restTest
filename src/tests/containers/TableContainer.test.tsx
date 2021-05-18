import { RenderResult, act, cleanup, render } from '@testing-library/react';
import TableContainer from '../../app/containers/TableContainer';
import TransactionApi from '../../app/api/TransactionApi';
import Transaction from '../../app/models/Transaction';

const TEST_ID = 'ChartContainer';

const firstTransaction = new Transaction({
    Date: "2021-05-17",
    Company: "Company X",
    Account: "Expenses",
    Amount: 1000,
});

const secondTransaction = new Transaction({
    Date: "2021-05-18",
    Company: "Company Y",
    Account: "Expenses",
    Amount: 2000,
});

jest.mock('../../app/components/TableTransactions', () => () => <div data-testid="TableTransaction" />);
jest.mock('../../app/api/TransactionApi');

const TransactionApiMock = TransactionApi as jest.Mocked<typeof TransactionApi>;

const renderTableContainer = () => render(
    <TableContainer />,
);

let getByTestId: RenderResult['getByTestId'];


afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

describe('Given table container', () => {
    describe('When transactions are not loaded', () => {
        beforeEach(() =>{
            act(() => {
                TransactionApiMock.getTransactions.mockImplementationOnce(() => new Promise(() => []));
                ({ getByTestId } = renderTableContainer());
            });
        });

        it('then the transaction table is not rendered', () => {
            expect(() => getByTestId(TEST_ID)).toThrow();
        });
    });

    describe('When transactions are loaded', () => {
        beforeEach(() =>{
            act(() => {
                TransactionApiMock.getTransactions.mockResolvedValueOnce([firstTransaction, secondTransaction]);
                ({ getByTestId } = renderTableContainer());
            });
        });

        it('then transaction table is rendered', () => {
            expect(() => getByTestId(TEST_ID)).toBeTruthy();
        });
    });
});