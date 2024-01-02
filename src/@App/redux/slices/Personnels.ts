/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PageActionPropsType } from '@App/configs/page-action';
import personnelService from '@App/services/personnel.service';

const initialState = {
   personnel: [],
   userPermission: null,
   loading: false,
   error: '',
} as {
   personnel: any[];
   userPermission: UserPermission | null;
   loading: boolean;
   error: string;
};
// interface InitialState<U> {
//     personnel: Array<U> | null;
//     userPermission: UserPermission | null;
//     loading: boolean;
//  }

//  const initialState: InitialState<any> = {
//     personnel: null,
//     userPermission: null,
//     loading: false,
//  };
export const getPersonnel = createAsyncThunk('personnel/getPersonnel', async () => {
   try {
      const data = await personnelService.getUser();
      return data.data;
   } catch (error: any) {
      throw new Error(error);
   }
});

type UserPermission = {
   [key: string]: PageActionPropsType[];
};

const personnelSlice = createSlice({
   name: 'personnel',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getPersonnel.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(getPersonnel.fulfilled, (state, action) => {
         const { access: permissionAccess, ...personerl } = action.payload;
         state.loading = false;
         state.personnel = personerl;
         state.personnel = action.payload;
         state.userPermission = {
            permissions: ['view', 'create', 'update', 'delete', 'show'],
            distributors: ['view', 'create', 'update', 'delete', 'show'],
            ...JSON.parse(permissionAccess),
         };
      });
      builder.addCase(getPersonnel.rejected, (state) => {
         state.loading = false;
      });
   },
});

export const personnelReducer = personnelSlice.reducer;
