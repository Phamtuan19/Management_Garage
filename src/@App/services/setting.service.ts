import BaseService from '@Core/Api/BaseService';

class SettingService extends BaseService {
   BASE_ENDPOINT = 'setting';
}

const settingService = new SettingService();

export default settingService;
