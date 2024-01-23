import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './constants/routes';

const router = createBrowserRouter([
  {
    path: routes.login,
    element: <div>Hello world!</div>,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
