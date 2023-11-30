import { BrowserRouter } from 'react-router-dom';
import Routers from './routes';

import CoreComfirmProvider from '@Core/Component/Comfirm/CoreComfirm';
import { useAuth } from './redux/slices/auth.slice';
import LazyLoadingFullScreen from './component/customs/LazyLoading/LazyLoadingFullScreen';

function App() {
   const { isInitialized } = useAuth();
   if (!isInitialized) return <LazyLoadingFullScreen />;

   return (
      <CoreComfirmProvider>
         <BrowserRouter>
            <Routers />
         </BrowserRouter>
      </CoreComfirmProvider>
   );
}

export default App;
