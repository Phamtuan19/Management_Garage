import { Suspense, ComponentType } from 'react';
import LazyLoadingScreen from '@App/component/customs/LazyLoading/LazyLoadingScreen';

function LoadSuspenseScreen<P extends JSX.IntrinsicAttributes>(Component: ComponentType<P>) {
   return (props: P) => (
      <Suspense fallback={<LazyLoadingScreen />}>
         <Component {...props} />
      </Suspense>
   );
}

export default LoadSuspenseScreen;
