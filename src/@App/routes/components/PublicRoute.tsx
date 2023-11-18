import { useAuth } from '@App/redux/slices/auth.slice';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRouter({ children }: { children?: React.ReactNode }) {
   const { isAuhthentication, isInitialized } = useAuth();

   if (isAuhthentication && isInitialized) {
      return <Navigate to="/" />;
   }

   return children || <Outlet />;
}
export default PublicRouter;
