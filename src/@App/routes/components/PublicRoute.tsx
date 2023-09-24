import { Navigate, Outlet } from 'react-router-dom';

function PublicRouter(props: { children?: React.ReactNode }) {
   return props.children || <Outlet />;
}
export default PublicRouter;
