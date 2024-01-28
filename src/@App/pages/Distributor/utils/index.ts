/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';

const baseUrlProvince = 'https://provinces.open-api.vn/api/';

export const getProvinces = async () => {
   const response = await axios.get(baseUrlProvince + '?depth=2');
   return response.data;
};

export const getDistricts = async (provinces_code?: string | number) => {
   if (provinces_code) {
      const response = await axios.get(baseUrlProvince + `p/${provinces_code}?depth=2`);
      return response.data.districts;
   }
   return [];
};

export const getWards = async (districts_code: string | number) => {
   if (districts_code) {
      const response = await axios.get(`${baseUrlProvince}d/${districts_code}?depth=2`);
      return response.data.wards;
   }
   return [];
};
