/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const successMessage = (message = 'Thành công!') => {
   toast.success(message);
};

export const errorMessage = (error: Error | AxiosError<unknown, unknown>) => {
   if (error instanceof AxiosError) {
      if (error.response?.data.message) {
         console.error('---------------- Server Error', error.response.data.message);
         toast.error(error.response.data.message);
      } else {
         console.error('---------------- Api Error', error.message);
         toast.error(error.message);
      }
   } else if (typeof error === 'string') {
      toast.error(error);
   } else {
      toast.error('Có lỗi xảy ra!');
   }
};
