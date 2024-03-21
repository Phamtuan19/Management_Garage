import BaseService from '@Core/Api/BaseService';

const path = {
   base: 'transactions',
};

class TransactionService extends BaseService {
   BASE_ENDPOINT = path.base;

   constructor() {
      super();
      this.setRequest();
   }
}

const transactionService = new TransactionService();

export default transactionService;
