import { useAuth } from '@App/redux/slices/auth.slice';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRouter(props: { children?: React.ReactNode }) {
   const {
      auth: { isAuhthentication, isInitialized },
   } = useAuth();

   if (isAuhthentication && isInitialized) {
      return <Navigate to="/" />;
   }

   return props.children || <Outlet />;
}
export default PublicRouter;
