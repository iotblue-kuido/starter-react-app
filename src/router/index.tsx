import { Suspense, lazy } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import { Paths } from "./paths";
import Loader from '../components/loader';
import PrivateComponent from '../components/auth/PrivateComponent';

const LandingPage = lazy(() => import('../views/LandingPage'));

const routes: RouteObject[] = [
  {
    path: Paths.HOME,
    element: (
      // < PrivateComponent >
      <LandingPage />
      // </PrivateComponent >
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loader />}>
        <PrivateComponent>
          <LandingPage />
        </PrivateComponent>
      </Suspense>
    ),
  },
]


export function Routes() {
  const element = useRoutes(routes);

  return <Suspense fallback={<Loader />}>{element}</Suspense>;
}
