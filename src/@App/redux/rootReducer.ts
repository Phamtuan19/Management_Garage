import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth.slice';
import settingSlice from './slices/setting.slice';

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   [settingSlice.name]: settingSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
