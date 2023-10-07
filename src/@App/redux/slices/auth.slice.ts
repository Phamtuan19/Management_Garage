import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import loginService from '@App/services/Auth.service';
import { RootState } from '../rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { errorMessage } from '@Core/Helper/message';
import loginService from '@App/services/auth.service';

// const actionLogin = createAsyncThunk('auth/login', async (data: { email: string; password: string }) => {
//    try {
//       const res = await loginService.login(data);
//       return res;
//    } catch (error: any) {
//       const message = error.response.data.message;
//       return message;
//    }
// });

const actionRefreshToken = createAsyncThunk('auth/refreshToken', async () => {
   // const res = await loginService.refreshToken();
   console.log('refresh token');
});

const actionGetUser = createAsyncThunk('auth/getUser', async () => {
   try {
      const res = await loginService.getUser();
      return res;
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
      actionLoginReducer: (state, action: PayloadAction) => {
         console.log(action);
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(actionGetUser.fulfilled, (state, action) => {
            state.isInitialized = true;
            state.isAuhthentication = true;
         })
         .addCase(actionGetUser.rejected, (state, _) => {
            state.isInitialized = true;
            state.isAuhthentication = false;
         });
   },
});

const { actionLoginReducer } = authSlice.actions;

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

   return { auth, authRefreshToken, authLogin, authGetUser };
};

export default authSlice;
