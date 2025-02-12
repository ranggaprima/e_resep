import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
