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

const middleware = async <T>(requestConfig: InternalAxiosRequestConfig<T>) => {
   const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN);

   if (authToken) {
      requestConfig.headers.Authorization = `Bearer ${authToken}`;
      // requestConfig.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2FjY291bnQvbG9naW4iLCJpYXQiOjE2OTgwMzEzMzEsImV4cCI6MTY5ODAzMjIzMSwibmJmIjoxNjk4MDMxMzMxLCJqdGkiOiJleVBVUjl1VGFkWnl4eXFCIiwic3ViIjoiNCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ._FrgBwE44vJwDh9jWnTYaWynwSy4sgcR7k1aHr17sEQ`;
      return requestConfig;
   }

   return requestConfig;
};

export default middleware;
