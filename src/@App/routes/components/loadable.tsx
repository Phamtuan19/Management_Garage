/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { lazy, Suspense } from 'react';
import LazyLoadingScreen from '@App/component/customs/LazyLoading/LazyLoadingScreen';

type LoadableProps = JSX.IntrinsicAttributes;

/**
 * Returns a lazy-loaded component.
 *
 * @param path - The path to the component to be loaded.
 *
 */

function Loadable<P extends LoadableProps>(path: string) {
   const newPath = path.split('.').includes('tsx') ? path + '.tsx' : path;
   const ComponentLazy = lazy(() => import(`../../pages/${newPath}`));

   const LoadableComponent: React.FC<P> = (props) => (
      <Suspense fallback={<LazyLoadingScreen />}>
         <ComponentLazy {...props} />
      </Suspense>
   );

   return LoadableComponent;
}

export default Loadable;
