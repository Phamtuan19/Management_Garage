import BaseService from '@Core/Api/BaseService'

const carsPath = {
    base:'cars',
};

class CarsService extends BaseService{
    BASE_ENDPOINT = carsPath.base;

    constructor() {
        super();
        this.setRequest();
    }
}
const carsService =  new CarsService();
export default carsService;