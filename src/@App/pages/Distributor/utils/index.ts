import axios from 'axios';

const baseUrlProvince = 'https://provinces.open-api.vn/api/';

export const getProvinces = async () => {
   const response = await axios.get(baseUrlProvince + '?depth=2');
   return response.data;
};

export const getDistricts = async (provinces_code: string) => {
   const response = await axios.get(baseUrlProvince + `p/${provinces_code}?depth=2`);
   return response.data.districts;
};

export const getWards = async (districts_code: string) => {
   const response = await axios.get(`${baseUrlProvince}d/${districts_code}?depth=2`);
   return response.data.wards;
};
