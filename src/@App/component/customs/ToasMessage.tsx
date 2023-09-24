import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Snackbar } from '@mui/material';
import useToastMessage from '@App/redux/slices/toastMessage.slice';

function ToasMessage() {
   const { setToastMessage, toastMessage } = useToastMessage();

   const handleCloseToast = (_: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }
      return setToastMessage({ message: null });
   };

   return (
      <React.Fragment>
         {toastMessage.message && Object.keys(toastMessage).length > 0 ? (
            <Snackbar
               open={Object.keys(toastMessage).length > 0}
               anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
               autoHideDuration={3500}
               onClick={handleCloseToast}
            >
               <Alert onClose={handleCloseToast} severity={toastMessage.status} sx={{ width: '100%' }}>
                  {toastMessage.message}
               </Alert>
            </Snackbar>
         ) : (
            <></>
         )}
      </React.Fragment>
   );
}

export default ToasMessage;
