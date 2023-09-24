import { BrowserRouter } from 'react-router-dom';
import Routers from './routes';
import CoreComfirmProvider from '@Core/Component/Comfirm/CoreComfirm';

function App() {
   return (
      <CoreComfirmProvider>
         <BrowserRouter>
            <Routers />
         </BrowserRouter>
      </CoreComfirmProvider>
   );
}

export default App;
