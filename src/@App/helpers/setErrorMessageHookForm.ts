const setErrorMessageHookForm = (callback: Function, dataError: { [x: string]: any[] }) => {
   return Object.keys(dataError).map((key) => {
      return callback(key, {
         type: 'error',
         message: dataError[key][0],
      });
   });
};

export default setErrorMessageHookForm;
