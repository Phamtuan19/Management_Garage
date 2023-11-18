import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider, QueryClient, focusManager } from '@tanstack/react-query';

import App from './@App/App';
import theme from '@Core/Theme';
import store from '@App/redux/store';
import { Provider } from 'react-redux';
import InitApp from '@App/component/InitApp';
import GlobalBaseline from '@App/component/GlobalBaseline';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import OriginalInitialization from '@App/component/customs/LazyLoading/OriginalInitialization';

import './style.css';

const queryClient = new QueryClient();
focusManager.setFocused(false);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.Fragment>
      <GlobalBaseline />
      <ScrollbarBase />
      <Provider store={store}>
         <QueryClientProvider client={queryClient}>
            <OriginalInitialization>
               <ThemeProvider theme={theme}>
                  <InitApp>
                     <App />
                  </InitApp>
               </ThemeProvider>
               <ToastContainer />
            </OriginalInitialization>
         </QueryClientProvider>
      </Provider>
   </React.Fragment>,
);
