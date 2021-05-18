interface ITransaction {
    Date: string;
    Company: string;
    Account: string;
    Amount: number;
}

export default class Transaction
    implements ITransaction {
        readonly Date: string;
        readonly Company: string;
        readonly Account: string;
        readonly Amount: number;

        constructor({
            Date =  '',
            Company = '',
            Account = '',
            Amount = 0,
        }: Partial<ITransaction> = {}) {
            this.Date = Date;
            this.Company = Company;
            this.Account = Account;
            this.Amount = Amount;
        }
    }