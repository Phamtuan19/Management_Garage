import { BrowserRouter } from 'react-router-dom';
import Routers from './routes';

import CoreComfirmProvider from '@Core/Component/Comfirm/CoreComfirm';
import { useAuth } from './redux/slices/auth.slice';
import LazyLoadingFullScreen from './component/customs/LazyLoading/LazyLoadingFullScreen';
import { useEffect } from 'react';

function App() {
   const { isInitialized } = useAuth();
   if (!isInitialized) return <LazyLoadingFullScreen />;

   if (!('Notification' in window)) {
      // Check if the browser supports notifications
      alert('This browser does not support desktop notification');
   } else if (Notification.permission === 'granted') {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification('Hi there!');

      console.log(2);
      // …
   } else if (Notification.permission !== 'denied') {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
         // If the user accepts, let's create a notification
         if (permission === 'granted') {
            const notification = new Notification('Hi there!');
            // …

            console.log(1.1);
         }

         console.log(1);
      });
   }

   return (
      <CoreComfirmProvider>
         <BrowserRouter>
            <Routers />
         </BrowserRouter>
      </CoreComfirmProvider>
   );
}

export default App;
