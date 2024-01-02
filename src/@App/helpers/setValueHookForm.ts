/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */
const setValueHookForm = (callback: Function, dataError: { [key: string]: string }) => {
   return Object.keys(dataError).map((key) => {
      return callback(key, dataError[key] || '');
   });
};

export default setValueHookForm;
