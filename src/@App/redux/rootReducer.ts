import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth.slice';
import { personnelReducer } from './slices/Personnels';

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   personnel: personnelReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
