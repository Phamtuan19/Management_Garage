import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth.slice';
import { toastMessage } from './slices/toastMessage.slice';

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   [toastMessage.name]: toastMessage.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
