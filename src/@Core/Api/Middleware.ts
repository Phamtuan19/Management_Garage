/*
 * Created Date:
 * Author: Phamtuan19
 * Email: phamtuan19hd@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) ...
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import { InternalAxiosRequestConfig } from 'axios';

const middleware = <T>(requestConfig: InternalAxiosRequestConfig<T>) => {
   const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN as string);

   if (authToken) {
      requestConfig.headers.Authorization = `Bearer ${authToken}`;
      return requestConfig;
   }

   return requestConfig;
};

export default middleware;
