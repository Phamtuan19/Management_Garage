import { useAuth } from '@App/redux/slices/auth.slice';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRouter(props: { children?: React.ReactNode }) {
   const { auth } = useAuth();

   if (auth.isAuhthentication && auth.isInitialized) {
      return <Navigate to="/" />;
   }

   return props.children || <Outlet />;
}
export default PublicRouter;
