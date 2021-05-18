import { FETCH_PARANS_GET, UrlTransactions } from '../constants';
import Transaction from '../models/Transaction';
import { responseToTransactions } from '../transfer/TransactionAssembler';

const FIRST_PAGE = 1;

const TransactionApi = {
     getTransactions(): Promise<Transaction[]> {

          return fetch(`${UrlTransactions}/${FIRST_PAGE}.json`, FETCH_PARANS_GET)
               .then(response => response.json())
               .then((response: any) => {
                    const apiUrls = [];
                    const totalPages = response.totalCount;
                    
                    // get all the url pages
                    for (let i = 1; i <= totalPages; i++) {
                         apiUrls.push(`${UrlTransactions}/${i}.json`);
                    }

                    return apiUrls;
               }).then(urls =>
                    Promise.all(urls.map(url =>
                         fetch(url, FETCH_PARANS_GET).then(resp => {
                              if (resp.ok) { // parse to json only the responses with status ok
                                   return resp.json();
                              }
                         })
                    ))
                         .then(trans => {
                              const transactions = [].concat.apply([], trans.filter(t => t !== undefined).map(t => t.transactions));

                              return transactions
                         })).then(responseToTransactions);
     }
}

export default TransactionApi;
