import settingService from '@App/services/setting.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';

const initSetting = createAsyncThunk('setting/getSetting', async () => {
   try {
      const res = await settingService.get();
      return res.data;
   } catch (error: any) {
      throw new Error(error);
   }
});

interface InitialState {
   module_permission: { [key: string]: string };
}

const initialState: InitialState = {
   module_permission: {},
};

const settingSlice = createSlice({
   name: 'setting',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(initSetting.fulfilled, (state, action) => {
            const { module_permission } = action.payload;

            const modulePermission = module_permission
               ? module_permission.reduce((obj: { [key: string]: string }, item: string) => {
                    obj[item.toLocaleUpperCase()] = item;
                    return obj;
                 }, {})
               : {};

            state.module_permission = modulePermission;
         })
         .addCase(initSetting.rejected, (state, _) => {
            state.module_permission = {};
         });
   },
});

export const useSetting = () => {
   const dispatch: any = useDispatch();
   const setting = useSelector((state: RootState) => state.setting);

   const getSettingInitApp = () => {
      dispatch(initSetting());
   };

   return { ...setting, getSettingInitApp };
};

export default settingSlice;
