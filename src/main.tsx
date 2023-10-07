import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';

import App from './@App/App';
import theme from '@Core/Theme';
import OriginalInitialization from '@App/component/customs/LazyLoading/OriginalInitialization';
import { Provider } from 'react-redux';
import store from '@App/redux/store';
import ToasMessage from '@App/component/customs/ToasMessage';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import GlobalBaseline from '@App/component/GlobalBaseline';
import InitApp from '@App/component/InitApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.Fragment>
      <GlobalBaseline />
      <ScrollbarBase />
      <Provider store={store}>
         <OriginalInitialization>
            <ThemeProvider theme={theme}>
               <InitApp>
                  <App />
               </InitApp>
            </ThemeProvider>
            <ToasMessage />
         </OriginalInitialization>
      </Provider>
   </React.Fragment>,
);
