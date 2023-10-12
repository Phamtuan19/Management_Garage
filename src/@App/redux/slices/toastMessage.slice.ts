import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';

interface ToastMessage {
   message: string | null;
   status: 'info' | 'success' | 'error' | 'warning';
}

interface InitialState {
   toastMessage: ToastMessage;
}

const initialState: InitialState = {
   toastMessage: {
      message: null,
      status: 'info',
   },
};

export const toastMessage = createSlice({
   name: 'toastMessage',
   initialState,
   reducers: {
      actionSetToastMessage: (state, action: PayloadAction<ToastMessage>) => {
         state.toastMessage = action.payload;
      },
   },
});

const { actionSetToastMessage } = toastMessage.actions;

const useToastMessage = () => {
   const dispatch = useDispatch();

   const toastMessage = useSelector((state: RootState) => state.toastMessage);

   const setToastMessage = ({
      message,
      status = 'info',
   }: {
      message: string | null;
      status?: 'info' | 'success' | 'error' | 'warning';
   }) => {
      dispatch(actionSetToastMessage({ message, status }));
   };

   return { ...toastMessage, setToastMessage };
};

export default useToastMessage;
