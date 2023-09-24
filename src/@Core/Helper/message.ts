import useToastMessage from '@App/redux/slices/toastMessage.slice';

export const errorMessage = (error: any) => {
   // const { setToastMessage } = useToastMessage();

   if (error) {
      if (error.response.data.message) {
         console.error('---------------- Server Error', error.response.data.message);
         // setToastMessage({ message: error.response.data.message, status: 'error' });
      } else {
         console.error('---------------- Api Error', error.message);
         // setToastMessage(error.message);
      }
   }
};
