import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth.slice';
import { distributorReducer } from './slices/distributor.slice';

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   distributor: distributorReducer,
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
