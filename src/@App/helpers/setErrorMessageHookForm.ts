/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
const setErrorMessageHookForm = (callback: Function, dataError: { [key: string]: string[] }) => {
   return Object.keys(dataError).map((key) => {
      return callback(key, {
         type: 'error',
         message: dataError[key][0],
      });
   });
};

export default setErrorMessageHookForm;
