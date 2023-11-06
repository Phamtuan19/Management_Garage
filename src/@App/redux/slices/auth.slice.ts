import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import authService from '@App/services/Auth.service';
import { RootState } from '../rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { errorMessage } from '@Core/Helper/message';
import authService from '@App/services/auth.service';

// const actionLogin = createAsyncThunk('auth/login', async (data: { email: string; password: string }) => {
//    try {
//       const res = await authService.login(data);
//       return res;
//    } catch (error: any) {
//       const message = error.response.data.message;
//       return message;
//    }
// });

const actionRefreshToken = createAsyncThunk('auth/refreshToken', async () => {
   // const res = await authService.refreshToken();
   console.log('refresh token');
});

const actionGetUser = createAsyncThunk('auth/getUser', async () => {
   try {
      const res = await authService.getUser();
      const user = res.data;
      // localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN, user.avatar);
      return user;
   } catch (error) {
      throw new Error('');
   }
});

interface InitialState<U> {
   user: Array<U> | null;
   isAuhthentication: boolean;
   isInitialized: boolean;
   userPermission: string | null;
   loading: boolean;
}

const initialState: InitialState<any> = {
   user: null,
   isAuhthentication: false,
   isInitialized: false,
   userPermission: null,
   loading: false,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      actionLoginReducer: (state, action) => {
         const { role, ...user } = action.payload;
         state.user = user;
         state.userPermission = role;
         state.isInitialized = true;
         state.isAuhthentication = true;
      },

      actionLogoutReducer: (state) => {
         state.user = null;
         state.userPermission = null;
         state.isAuhthentication = false;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(actionGetUser.fulfilled, (state, action) => {
            const { role, ...user } = action.payload;
            state.user = user;
            state.userPermission = role;
            state.isInitialized = true;
            state.isAuhthentication = true;
         })
         .addCase(actionGetUser.rejected, (state, _) => {
            state.isInitialized = true;
            state.isAuhthentication = false;
         });
   },
});

const { actionLoginReducer, actionLogoutReducer } = authSlice.actions;

export const useAuth = () => {
   const dispatch: any = useDispatch();
   const auth = useSelector((state: RootState) => state.auth);

   const authRefreshToken = () => {
      return dispatch(actionRefreshToken());
   };

   const authLogin = (data: any) => {
      dispatch(actionLoginReducer(data));
   };

   const authGetUser = () => {
      dispatch(actionGetUser());
   };

   const authLogout = () => {
      localStorage.removeItem('authToken');
      dispatch(actionLogoutReducer());
   };

   return { auth, authRefreshToken, authLogin, authGetUser, authLogout };
};

export default authSlice;
