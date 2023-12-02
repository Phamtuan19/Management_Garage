import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth.slice';

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
